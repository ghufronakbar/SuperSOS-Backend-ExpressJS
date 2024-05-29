"use strict";

const response = require("../../res");
const connection = require("../../connection");
const md5 = require("md5");
const jwt = require('jsonwebtoken');
const config = require('../../config/secret');
const ip = require('ip');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');

// Konfigurasi multer untuk menyimpan file di folder 'images/profile'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'images/profile/');
  },
  filename: function (req, file, cb) {
      // Mendapatkan ekstensi file
      const ext = file.originalname.split('.').pop();
      // Membuat string acak sepanjang 6 karakter
      const randomString = crypto.randomBytes(3).toString('hex');
      // Menggabungkan nama file asli dengan string acak dan ekstensi
      const newFilename = file.originalname.replace(`.${ext}`, `_${randomString}.${ext}`);
      cb(null, newFilename);
  }
});

const upload = multer({ storage: storage }).single('picture');

// Middleware untuk mengunggah gambar
function uploadMiddleware(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Jika terjadi kesalahan dari multer
      console.log(err);
      return res.status(500).json({ success: false, message: 'Failed to upload image.' });
    } else if (err) {
      // Jika terjadi kesalahan lain
      console.log(err);
      return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
    }
    next();
  });
}

// EDIT PICTURE
exports.editpicture = [uploadMiddleware, function (req, res) {
  const picture = req.file ? req.file.filename : null;
  const id_user = req.decoded.id_user;

  // Jika ada gambar baru diunggah, hapus gambar sebelumnya (jika ada)
  connection.query(`SELECT picture FROM user WHERE id_user=?`, [id_user], function (error, rows, fields) {
    if (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'An error occurred while fetching previous picture.' });
    } else {
      const previousPicture = rows[0].picture;
      if (previousPicture) {
        try {
          // Hapus gambar sebelumnya dari direktori
          fs.unlinkSync(`images/profile/${previousPicture}`);
        } catch (err) {
          // Tangani kesalahan jika file tidak ditemukan atau gagal dihapus
          console.log('Failed to delete previous picture:', err);
        }
      }
      // Update data profile dengan gambar baru
      connection.query(`UPDATE user SET picture=? WHERE id_user=?`,
        [picture, id_user],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'An error occurred while editing profile.' });
          } else {            
            return res.status(200).json({ success: true, message: 'Profile edited successfully.' });
          }
        }
      );
    }
  });
}];


// LOGIN
exports.login = function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ status: 400, message: "Email and password are required" });
  }

  const query = "SELECT email, id_user FROM user WHERE password=? AND email=?";
  const values = [md5(password), email];

  connection.query(query, values, function (error, rows) {
    if (error) {
      console.error(error);

      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    if (rows.length === 1) {
      const id_user = rows[0].id_user;
      const token = jwt.sign({ id_user }, config.secret, { expiresIn: 1440 * 4 });
      const data = { id_user, token, ip_address: ip.address() };

      const insertQuery = "INSERT INTO akses_token SET ?";

      connection.query(insertQuery, data, function (insertError) {
        if (insertError) {
          console.error(insertError);
          return res.status(500).json({ success: false, message: "Internal server error" });
        }

        res.json({
          success: true,
          message: "Token JWT Generated!",
          token: token,
          currUser: id_user
        });
      });
    } else {
      return res.status(403).json({ status: 403, message: "Invalid Email or password" });
    }
  });
};


//REGISTER USER
exports.register = function (req, res) {
  const fullname = req.body.fullname
  const address = req.body.address
  const phone = req.body.phone
  const email = req.body.email
  const password = md5(req.body.password)
  const confirmation_password = md5(req.body.confirmation_password)
  const picture = ""
  const status = 0

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
  const id_user = req.decoded.id_user;
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
      WHERE id_user = ?
  `, [id_user],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      } else {
        if (rows.length > 0) {
          const user = rows[0];
          res.status(200).json({
            status: 200,
            values: [{
              id_user: user.id_user,
              fullname: user.fullname,
              address: user.address,
              email: user.email,
              phone: user.phone,
              status: user.status,
              picture: process.env.BASE_URL + "/images/profile/" +  user.picture,
              call_applied: user.call_applied
            }]
          });
        } else {
          res.status(404).json({ status: 404, message: "User not found" });
        }
      }
    }
  );
};

//PROFILE
exports.name = function (req, res) {
  const id_user = req.decoded.id_user
  connection.query(`
      SELECT 
          u.id_user,
          u.fullname,          
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
  const fullname = req.body.fullname;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  const id_user = req.decoded.id_user;

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
exports.editpassword = function (req, res) {
  const old_password = md5(req.body.old_password);
  const new_password = md5(req.body.new_password);
  const id_user = req.decoded.id_user

  connection.query(
    `SELECT password FROM user WHERE id_user=?`,
    [id_user],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        if (rows.length > 0) {
          const verification_password = rows[0].password;
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