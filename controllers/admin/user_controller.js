'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');

exports.index = function (req, res) {
    response.ok("REST API Worked!", res)
}

//GET USER 
exports.user = function (req, res) {
    connection.query(`SELECT u.id_user, u.fullname, u.address, u.phone,
                        u.email, u.picture, c.id_call, c.message, c.latitude,
                        c.longitude, c.applied_at, c.answered_at, c.status,
                        c.id_admin, i.instances_name  
                        FROM user AS u 
                        JOIN calls AS c ON u.id_user = c.id_user 
                        JOIN instances as i ON i.id_instances = c.id_admin
                        ORDER BY u.id_user DESC`,
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
                            calls: []
                        };
                    }
                    groupedData[row.id_user].calls.push({
                        id_call: row.id_call,
                        message: row.message,
                        latitude: row.latitude,
                        longitude: row.longitude,
                        applied_at: row.applied_at,
                        answered_at: row.answered_at,
                        status: row.status,
                        id_admin: row.id_admin,
                        instances_name: row.instances_name
                    });
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
exports.userid = function (req, res) {
    let id = req.params.id
    connection.query(`SELECT u.id_user, u.fullname, u.address, u.phone,
                        u.email, u.picture, c.id_call, c.message, c.latitude,
                        c.longitude, c.applied_at, c.answered_at, c.status,
                        c.id_admin, i.instances_name  
                        FROM user AS u 
                        JOIN calls AS c ON u.id_user = c.id_user 
                        JOIN instances as i ON i.id_instances = c.id_admin
                        WHERE u.id_user = ? ORDER BY u.id_user DESC`,[id],
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
                            calls: []
                        };
                    }
                    groupedData[row.id_user].calls.push({
                        id_call: row.id_call,
                        message: row.message,
                        latitude: row.latitude,
                        longitude: row.longitude,
                        applied_at: row.applied_at,
                        answered_at: row.answered_at,
                        status: row.status,
                        id_admin: row.id_admin,
                        instances_name: row.instances_name
                    });
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
