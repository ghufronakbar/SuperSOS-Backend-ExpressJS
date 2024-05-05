'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');

exports.instances = function (req, res) {    
    connection.query(`
        SELECT i.id_instances, 
               i.instances_name, 
               i.address, 
               i.phone,
               i.email, 
               i.status AS instances_status,
               i.type AS instances_type,
               IF(COUNT(c.id_call) > 0, 
                  GROUP_CONCAT(JSON_OBJECT(
                      'id_call', c.id_call, 
                      'message', c.message, 
                      'latitude', c.latitude,
                      'longitude', c.longitude,
                      'applied_at', c.applied_at,
                      'answered_at', c.answered_at,
                      'call_status', c.status,
                      'user_fullname', u.fullname,
                      'id_user', u.id_user 
                  )), NULL) AS calls
        FROM instances AS i
        LEFT JOIN calls AS c ON i.id_instances = c.id_instances 
        LEFT JOIN user AS u ON u.id_user = c.id_user 
        WHERE i.status=1
        GROUP BY i.id_instances
        ORDER BY i.id_instances DESC
    `, 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                // Parse calls from JSON string to object or set to empty array if null
                rows.forEach(row => {
                    if (row.calls) {
                        // Convert JSON string to array of objects
                        row.calls = JSON.parse(`[${row.calls}]`);
                        // Sort the array of objects based on id_call in descending order
                        row.calls.sort((a, b) => b.id_call - a.id_call);
                    } else {
                        row.calls = [];
                    }
                });
                response.ok(rows, res);
            }
        }
    );
};


// GET INSTANCE BY ID
exports.instanceid = function (req, res) {
    let id_instances = req.params.id_instances;
    connection.query(`
        SELECT i.id_instances, 
               i.instances_name, 
               i.address, 
               i.phone,
               i.email, 
               i.status AS instances_status,
               i.type AS instances_type,
               IF(COUNT(c.id_call) > 0, 
                  GROUP_CONCAT(JSON_OBJECT(
                      'id_call', c.id_call, 
                      'message', c.message, 
                      'latitude', c.latitude,
                      'longitude', c.longitude,
                      'applied_at', c.applied_at,
                      'answered_at', c.answered_at,
                      'call_status', c.status,
                      'user_fullname', u.fullname,
                      'id_user', u.id_user 
                  )), NULL) AS calls
        FROM instances AS i
        LEFT JOIN calls AS c ON i.id_instances = c.id_instances 
        LEFT JOIN user AS u ON u.id_user = c.id_user 
        WHERE i.id_instances = ?
        GROUP BY i.id_instances
        ORDER BY i.id_instances DESC
    `, [id_instances],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                // Parse calls from JSON string to object or set to empty array if null
                rows.forEach(row => {
                    if (row.calls) {
                        // Convert JSON string to array of objects
                        row.calls = JSON.parse(`[${row.calls}]`);
                        // Sort the array of objects based on id_call in descending order
                        row.calls.sort((a, b) => b.id_call - a.id_call);
                    } else {
                        row.calls = [];
                    }
                });
                response.ok(rows, res);
            }
        }
    );
};

//GET PENDING INSTANCES
exports.instancepending = function (req, res) {      
    connection.query(`SELECT * FROM instances WHERE status = 0`,
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                console.log(rows)
                response.ok(rows, res);
            };
        }
    )
};

//SET APPROVE PENDING INSTANCES
exports.instanceapprove = function (req, res) {      
    let id_instances = req.params.id_instances
    connection.query(`UPDATE instances SET status=1 WHERE id_instances=?`,[id_instances],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                console.log(rows)
                response.ok(rows, res);
            };
        }
    )
};


//DELETE APPROVE PENDING INSTANCES
exports.instancedelete = function (req, res) {      
    let id_instances = req.params.id_instances

    //TAMBAH KIRIM EMAIL
    connection.query(`DELETE FROM instances WHERE id_instances=?`,[id_instances],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                console.log(rows)
                response.ok(rows, res);
            };
        }
    )
};