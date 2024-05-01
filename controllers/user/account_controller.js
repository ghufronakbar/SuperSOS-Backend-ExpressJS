"use strict";

var response = require("../../res");
var connection = require("../../connection");
const verifikasi = require("../../middleware/verifikasi");
var md5 = require("md5");

exports.index = function (req, res) {
  response.ok("REST API Worked!", res);
};


//REGISTER USER
exports.register = function (req, res) {
  let fullname = req.body.fullname
  let address = req.body.address
  let phone = req.body.phone
  let email = req.body.email
  let password = md5(req.body.password)
  let picture = req.body.picture

  connection.query(`INSERT INTO user(fullname,address,phone,email,password,picture) VALUES(?,?,?,?,?,?)`,
    [fullname, address, phone, email, password, picture],
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