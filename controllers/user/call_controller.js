"use strict";

var response = require("../../res");
var connection = require("../../connection");
const verifikasi = require("../../middleware/verifikasi");
var md5 = require("md5");

exports.index = function (req, res) {
  response.ok("REST API Worked!", res);
};


//MAKE CALL
exports.makecall = function (req, res) {
  let message = req.body.message
  let latitude = req.body.latitude
  let longitude = req.body.longitude
  let status = 0
  let id_user = req.body.id_user
  let id_admin = req.body.id_admin
  let now = new Date()
  let datetimenow = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) + ' ' +
        ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);


  connection.query(`INSERT INTO calls(message,latitude,longitude,applied_at,status,id_user,id_admin) VALUES(?,?,?,?,?,?,?)`,
    [message, latitude, longitude, datetimenow, status, id_user, id_admin],
    function (error, rows, fields) {
      if (error) {
        console.log(error)
      } else {
        response.ok(rows, res);
      };
    }
  )
};


//MAKE CALL
exports.cancelcall = function (req, res) {
   let id = req.params.id
  
    connection.query(`UPDATE calls SET status=1 WHERE id_call=?`,
      [id],
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
exports.editaccount = function (req, res) {
  let fullname = req.body.fullname
  let address = req.body.address
  let phone = req.body.phone
  let email = req.body.email
  let id = req.params.id

  connection.query(`UPDATE user SET fullname=?, address=?, phone=?, email=? WHERE id_user=?`,
    [fullname, address, phone, email, id],
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
exports.editpicture = function (req, res) {
  let picture = req.body.picture
  let id = req.params.id

  connection.query(`UPDATE user SET picture=? WHERE id_user=?`,
    [picture, id],
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
  let id = req.params.id

  connection.query(
    `SELECT password FROM user WHERE id_user=?`,
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        if (rows.length > 0) {
          let verification_password = rows[0].password;
          if (old_password == verification_password) {
            connection.query(
              `UPDATE user SET password=?  WHERE id_user=?`,
              [new_password, id],
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