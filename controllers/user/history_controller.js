"use strict";

var response = require("../../res");
var connection = require("../../connection");
const verifikasi = require("../../middleware/verifikasi");
var md5 = require("md5");

exports.index = function (req, res) {
    response.ok("REST API Worked!", res);
};


//HISTORY USER
exports.historyuser = function (req, res) {
    let id = req.params.id
   
    connection.query(`SELECT calls.id_call, calls.message, calls.latitude, calls.longitude,
                        calls.applied_at, calls.answered_at, calls.status,instances.id_instances, 
                        instances.instances_name FROM calls JOIN user JOIN admin JOIN instances
                        WHERE user.id_user = calls.id_user AND admin.id_instances = instances.id_instances
                        AND admin.id_admin = calls.id_admin AND user.id_user=?`,
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


//HISTORY USER ID
exports.historyuserid = function (req, res) {
    let id = req.params.id
   
    connection.query(`SELECT calls.id_call, calls.message, calls.latitude, calls.longitude,
                        calls.applied_at, calls.answered_at, calls.status,instances.id_instances, 
                        instances.instances_name FROM calls JOIN user JOIN admin JOIN instances
                        WHERE user.id_user = calls.id_user AND admin.id_instances = instances.id_instances
                        AND admin.id_admin = calls.id_admin AND calls.id_call=?`,
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

