"use strict";

var response = require("../../res");
var connection = require("../../connection");
const verifikasi = require("../../middleware/verifikasi");
var md5 = require("md5");

exports.index = function (req, res) {
  response.ok("REST API Worked!", res);
};

//HISTORY CALL
exports.callhistory = function (req, res) {
  let id_user = req.decoded.id_user;

  let interval = process.env.INTERVAL_CALL_MINUTE
    ? `${process.env.INTERVAL_CALL_MINUTE} MINUTE`
    : `${process.env.INTERVAL_CALL_SECOND || 600} SECOND`;

  const updateQuery = `
    UPDATE calls 
    SET status = 1 
    WHERE applied_at <= (NOW() - INTERVAL ${interval}) 
      AND status = 0
  `;

  connection.query(updateQuery, function (updateError, updateResults) {
    if (updateError) {
      console.log(updateError);
      return res.status(500).send({ message: "Error updating call status" });
    }

    // Fetch the call history after updating the status
    const selectQuery = `
      SELECT c.id_call, c.message, c.latitude, c.longitude, c.applied_at, c.answered_at, 
             c.status, c.type AS call_type, c.id_user, u.fullname, c.id_instances, i.instances_name,
             i.address AS instances_address, i.email AS instances_email, i.phone AS instances_phone
      FROM calls AS c 
      JOIN user AS u ON c.id_user = u.id_user 
      LEFT JOIN instances AS i ON c.id_instances = i.id_instances
      WHERE c.id_user = ? 
      ORDER BY c.applied_at DESC
    `;

    connection.query(selectQuery, [id_user], function (error, rows, fields) {
      if (error) {
        console.log(error);
        return res.status(500).send({ message: "Error fetching call history" });
      }
      response.ok(rows, res);
    });
  });
};

//HISTORY CALL
exports.callhistorydetail = function (req, res) {
  let id_call = req.params.id_call;
  connection.query(
    `SELECT c.id_call, c.message, c.latitude, c.longitude, c.applied_at, c.answered_at, 
                      c.status,c.type AS call_type, c.id_user, u.fullname, c.id_instances, i.instances_name,
                      i.address AS instances_address, i.email AS instances_email, i.phone AS instances_phone
                      FROM calls AS c 
                      JOIN user AS u ON c.id_user = u.id_user 
                      LEFT JOIN instances AS i ON c.id_instances = i.id_instances
                      WHERE c.id_call=?`,
    [id_call],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
