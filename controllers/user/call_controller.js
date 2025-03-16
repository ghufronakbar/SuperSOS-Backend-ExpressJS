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
  let type = req.body.type
  console.log({ message, latitude, longitude, datetimenow, status, type })
  let now = new Date()
  let datetimenow = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) + ' ' +
    ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);
  let id_user = req.decoded.id_user
  console.log(id_user)

  connection.query(`INSERT INTO calls(message,latitude,longitude,applied_at,status,id_user,type) 
                    VALUES(?,?,?,?,?,?,?)`,
    [message, latitude, longitude, datetimenow, status, id_user, type],
    function (error, rows, fields) {
      if (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: "Internal Server Error", error: error });
      } else {
        return res.status(200).send(rows, res);
      };
    }
  )
};


//CANCEL CALL
exports.cancelcall = function (req, res) {
  let id_call = req.body.id_call
  connection.query(`UPDATE calls SET status=1 WHERE id_call=?`,
    [id_call],
    function (error, rows, fields) {
      if (error) {
        console.log(error)
      } else {
        response.ok(rows, res);
      };
    }
  )
};

