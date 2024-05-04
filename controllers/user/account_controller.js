"use strict";

var response = require("../../res");
var connection = require("../../connection");
const verifikasi = require("../../middleware/verifikasi");
var md5 = require("md5");


//REGISTER USER
exports.register = function (req, res) {
  let fullname = req.body.fullname
  let address = req.body.address
  let phone = req.body.phone
  let email = req.body.email
  let password = md5(req.body.password)
  let confirmation_password = md5(req.body.confirmation_password)
  let picture = "default.png"
  let status = 0

  // Query untuk memeriksa apakah email sudah terdaftar
  connection.query(`SELECT COUNT(*) AS email_count FROM user WHERE email = ?`, [email], function (error, results, fields) {
    if (error) {
      console.log(error)
      response.error("An error occurred", res);
    } else {
      const emailCount = results[0].email_count;
      
      // Jika email sudah terdaftar, beri respons yang sesuai
      if (emailCount > 0) {
        response.error("Email is already registered", res);
      } else {
        // Query untuk memeriksa apakah phone sudah terdaftar
        connection.query(`SELECT COUNT(*) AS phone_count FROM user WHERE phone = ?`, [phone], function (error, results, fields) {
          if (error) {
            console.log(error)
            response.error("An error occurred", res);
          } else {
            const phoneCount = results[0].phone_count;

            // Jika phone sudah terdaftar, beri respons yang sesuai
            if (phoneCount > 0) {
              response.error("Phone number is already registered", res);
            } else {
              // Jika password sama dengan confirmation_password, lakukan proses registrasi
              if (password === confirmation_password) {
                connection.query(`INSERT INTO user(fullname,address,phone,email,password,picture,status) VALUES(?,?,?,?,?,?,?)`,
                  [fullname, address, phone, email, password, picture, status],
                  function (error, rows, fields) {
                    if (error) {
                      console.log(error)
                      response.error("An error occurred", res);
                    } else {
                      response.ok("Registration successful", res);
                    }
                  }
                );
              } else {
                // Jika password tidak sesuai dengan confirmation_password, beri respons yang sesuai
                response.error("Password does not match confirmation password", res);
              }
            }
          }
        });
      }
    }
  });
};

//PROFILE
exports.profile = function (req, res) {
  let id_user = req.params.id_user
  connection.query(`
      SELECT 
          u.id_user,
          u.fullname, 
          u.address, 
          u.email, 
          u.phone,
          u.status, 
          u.picture,
          (SELECT COUNT(*) FROM calls WHERE id_user = u.id_user) AS call_applied
      FROM user AS u
      WHERE id_user=?
  `, [id_user],
      function (error, rows, fields) {
          if (error) {
              console.log(error)
          } else {
              response.ok(rows, res);
          };
      }
  );
};


// EDIT USER
exports.editaccount = function (req, res) {
  let fullname = req.body.fullname;
  let address = req.body.address;
  let phone = req.body.phone;
  let email = req.body.email;
  let id_user = req.params.id_user;

  // Query untuk memeriksa apakah email sudah terdaftar, kecuali untuk id_user saat ini
  connection.query(`SELECT COUNT(*) AS email_count FROM user WHERE email = ? AND id_user != ?`, [email, id_user], function (error, results, fields) {
    if (error) {
      console.log(error);
      response.error("An error occurred", res);
    } else {
      const emailCount = results[0].email_count;

      // Jika email sudah terdaftar, beri respons yang sesuai
      if (emailCount > 0) {
        response.error("Email is already registered", res);
      } else {
        // Query untuk memeriksa apakah phone sudah terdaftar, kecuali untuk id_user saat ini
        connection.query(`SELECT COUNT(*) AS phone_count FROM user WHERE phone = ? AND id_user != ?`, [phone, id_user], function (error, results, fields) {
          if (error) {
            console.log(error);
            response.error("An error occurred", res);
          } else {
            const phoneCount = results[0].phone_count;

            // Jika phone sudah terdaftar, beri respons yang sesuai
            if (phoneCount > 0) {
              response.error("Phone number is already registered", res);
            } else {
              // Jika semua validasi berhasil, lakukan update
              connection.query(`UPDATE user SET fullname=?, address=?, phone=?, email=? WHERE id_user=?`,
                [fullname, address, phone, email, id_user],
                function (error, rows, fields) {
                  if (error) {
                    console.log(error);
                    response.error("An error occurred", res);
                  } else {
                    response.ok(rows, res);
                  }
                }
              );
            }
          }
        });
      }
    }
  });
};



//EDIT USER
exports.editpicture = function (req, res) {
  let picture = req.body.picture
  let id_user = req.params.id_user

  //TAMBAHKAN UPLOAD FILE

  connection.query(`UPDATE user SET picture=? WHERE id_user=?`,
    [picture, id_user],
    function (error, rows, fields) {
      if (error) {
        console.log(error)
      } else {
        response.ok(rows, res);
      };
    }
  )
};

//EDIT USER
exports.editpassword = function (req, res) {
  let old_password = md5(req.body.old_password);
  let new_password = md5(req.body.new_password);
  let id_user = req.params.id_user

  connection.query(
    `SELECT password FROM user WHERE id_user=?`,
    [id_user],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        if (rows.length > 0) {
          let verification_password = rows[0].password;
          if (old_password == verification_password) {
            connection.query(
              `UPDATE user SET password=?  WHERE id_user=?`,
              [new_password, id_user],
              function (error, rows, fields) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok(rows, res);
                }
              }
            );
          } else {
            response.error("Password Salah", res);
          }
        }
      }
    }
  );


};