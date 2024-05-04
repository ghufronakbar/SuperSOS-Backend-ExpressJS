'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');


//GET USER 
exports.user = function (req, res) {
    connection.query(`SELECT u.id_user, u.fullname, u.address, u.phone,
                        u.email, u.picture,u.status AS user_status, 
                        IF(COUNT(c.id_call) > 0, 
                            GROUP_CONCAT(JSON_OBJECT(
                                'id_call', c.id_call, 
                                'message', c.message, 
                                'latitude', c.latitude,
                                'longitude', c.longitude,
                                'applied_at', c.applied_at,
                                'answered_at', c.answered_at,
                                'call_status', c.status,
                                'instances_name', i.instances_name
                            )), NULL) AS calls
                        FROM user AS u 
                        LEFT JOIN calls AS c ON u.id_user = c.id_user 
                        LEFT JOIN instances as i ON i.id_instances = c.id_instances
                        GROUP BY u.id_user
                        ORDER BY u.id_user DESC`,
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                // Parse calls from JSON string to object or set to empty array if null
                rows.forEach(row => {
                    if (row.calls) {
                        row.calls = JSON.parse(`[${row.calls}]`);
                    } else {
                        row.calls = [];
                    }
                });
                response.ok(rows, res);
            }
        }
    )
};




//GET ID USER
exports.userid = function (req, res) {
    let id_user = req.params.id_user
    connection.query(`SELECT u.id_user, u.fullname, u.address, u.phone,
                        u.email, u.picture,u.status AS user_status, c.id_call, c.message, c.latitude,
                        c.longitude, c.applied_at, c.answered_at, c.status AS call_status,
                        c.id_instances, i.instances_name 
                        FROM user AS u 
                        LEFT JOIN calls AS c ON u.id_user = c.id_user 
                        LEFT JOIN instances as i ON i.id_instances = c.id_instances
                        WHERE u.id_user=?`, [id_user],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                // Group calls by user id
                let groupedData = {};
                rows.forEach(row => {
                    if (!groupedData[row.id_user]) {
                        groupedData[row.id_user] = {
                            id_user: row.id_user,
                            fullname: row.fullname,
                            address: row.address,
                            phone: row.phone,
                            email: row.email,
                            picture: row.picture,
                            user_status: row.user_status,
                            calls: []
                        };
                    }
                    if (row.id_call) { // Check if call exists
                        groupedData[row.id_user].calls.push({
                            id_call: row.id_call,
                            message: row.message,
                            latitude: row.latitude,
                            longitude: row.longitude,
                            applied_at: row.applied_at,
                            answered_at: row.answered_at,
                            call_status: row.call_status,
                            instances_name: row.instances_name
                        });
                    }
                });

                // Convert grouped data object to array
                let result = [];
                for (let key in groupedData) {
                    result.push(groupedData[key]);
                }

                response.ok(result, res);
            };
        }
    )
};


//GET ID USER
exports.usersuspend = function (req, res) {
    let status = req.body.status
    let id_user = req.params.id_user
    if (status == 1) {
        connection.query(`UPDATE user SET status=1 WHERE id_user=?`, [id_user],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    response.ok(rows, res);
                };
            }
        )
    } else if (status == 0) {
        connection.query(`UPDATE user SET status=0 WHERE id_user=?`, [id_user],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    response.ok(rows, res);
                };
            }
        )
    }else{
        response.error("Invalid Status (Choose 0/1)", res);
    }

};
