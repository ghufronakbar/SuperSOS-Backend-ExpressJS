'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');


// GET ALL CALLS
exports.calls = function (req, res) {
    let type = req.params.type
    connection.query(`SELECT c.id_call, c.message, c.latitude, c.longitude, c.applied_at,
                        c.answered_at, c.status, c.type , c.id_user, u.fullname, u.address, u.phone,
                        u.email, u.picture, c.id_instances, i.instances_name, 
                        i.address AS instances_address, i.email AS instances_email, i.phone AS instances_phone
                        FROM calls AS c 
                        JOIN user AS u ON c.id_user = u.id_user 
                        LEFT JOIN instances AS i ON c.id_instances = i.id_instances WHERE c.type=?`,[type],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                // Group rows by id_call
                let groupedData = {};
                rows.forEach(row => {
                    if (!groupedData[row.id_call]) {
                        groupedData[row.id_call] = {
                            id_call: row.id_call,
                            message: row.message,
                            latitude: row.latitude,
                            longitude: row.longitude,
                            applied_at: row.applied_at,
                            answered_at: row.answered_at,
                            status: row.status,
                            type: row.type,
                            user: [],
                            instances: []
                        };
                    }
                    groupedData[row.id_call].user.push({
                        id_user: row.id_user,
                        fullname: row.fullname,
                        address: row.address,
                        phone: row.phone,
                        email: row.email,
                        picture: row.picture
                    });
                    if (row.id_instances) {
                        groupedData[row.id_call].instances.push({
                            id_instances: row.id_instances,
                            instances_name: row.instances_name,
                            address: row.instances_address,
                            phone: row.instances_phone,
                            email: row.instances_email
                        });
                    }
                });

                // Convert grouped data object to array
                let result = [];
                for (let key in groupedData) {
                    result.push(groupedData[key]);
                }

                // Sort the array based on id_call in descending order
                result.sort((a, b) => b.id_call - a.id_call);

                response.ok(result, res);
            };
        }
    )
};



// GET ID CALL
exports.callid = function (req, res) {
    let id_call = req.params.id_call
    connection.query(`SELECT c.id_call, c.message, c.latitude, c.longitude, c.applied_at,
                        c.answered_at, c.status, c.type, c.id_user, u.fullname, u.address, u.phone,
                        u.email, u.picture, c.id_instances, i.instances_name, 
                        i.address AS instances_address, i.email AS instances_email, i.phone AS instances_phone
                        FROM calls AS c 
                        JOIN user AS u ON c.id_user = u.id_user 
                        LEFT JOIN instances AS i ON c.id_instances = i.id_instances WHERE c.id_call=?`, [id_call],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                // Group rows by id_call
                let groupedData = {};
                rows.forEach(row => {
                    if (!groupedData[row.id_call]) {
                        groupedData[row.id_call] = {
                            id_call: row.id_call,
                            message: row.message,
                            latitude: row.latitude,
                            longitude: row.longitude,
                            applied_at: row.applied_at,
                            answered_at: row.answered_at,
                            status: row.status,
                            type: row.type,
                            user: [],
                            instances: []
                        };
                    }
                    groupedData[row.id_call].user.push({
                        id_user: row.id_user,
                        fullname: row.fullname,
                        address: row.address,
                        phone: row.phone,
                        email: row.email,
                        picture: row.picture
                    });
                    if (row.id_instances) {
                        groupedData[row.id_call].instances.push({
                            id_instances: row.id_instances,
                            instances_name: row.instances_name,
                            address: row.instances_address,
                            phone: row.instances_phone,
                            email: row.instances_email
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

 

// GET ID CALL
exports.callpending = function (req, res) {
    let type = req.params.type
    connection.query(`SELECT c.id_call, c.message, c.latitude, c.longitude, c.applied_at,
                        c.answered_at, c.status, c.type , c.id_user, u.fullname, u.address, u.phone,
                        u.email, u.picture, c.id_instances, i.instances_name, 
                        i.address AS instances_address, i.email AS instances_email, i.phone AS instances_phone
                        FROM calls AS c 
                        JOIN user AS u ON c.id_user = u.id_user 
                        LEFT JOIN instances AS i ON c.id_instances = i.id_instances WHERE c.status=0 AND c.type=?`,[type],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                // Group rows by id_call
                let groupedData = {};
                rows.forEach(row => {
                    if (!groupedData[row.id_call]) {
                        groupedData[row.id_call] = {
                            id_call: row.id_call,
                            message: row.message,
                            latitude: row.latitude,
                            longitude: row.longitude,
                            applied_at: row.applied_at,
                            answered_at: row.answered_at,
                            status: row.status,
                            type: row.type,
                            user: [],
                            instances: []
                        };
                    }
                    groupedData[row.id_call].user.push({
                        id_user: row.id_user,
                        fullname: row.fullname,
                        address: row.address,
                        phone: row.phone,
                        email: row.email,
                        picture: row.picture
                    });
                    if (row.id_instances) {
                        groupedData[row.id_call].instances.push({
                            id_instances: row.id_instances,
                            instances_name: row.instances_name,
                            address: row.instances_address,
                            phone: row.instances_phone,
                            email: row.instances_email
                        });
                    }
                });

                // Convert grouped data object to array
                let result = [];
                for (let key in groupedData) {
                    result.push(groupedData[key]);
                }

                // Sort the array based on id_call in descending order
                result.sort((a, b) => b.id_call - a.id_call);

                response.ok(result, res);
            };
        }
    )
};



//SET APPROVE PENDING CALL
exports.callapprove = function (req, res) {      
    let id_call = req.params.id_call
    let id_instances = req.body.id_instances
    let now = new Date();
    let datetimenow = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) + ' ' +
        ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);

    connection.query(`UPDATE calls SET status=1, id_instances=?, answered_at=? WHERE id_call=?`,[id_instances, datetimenow,id_call],
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

