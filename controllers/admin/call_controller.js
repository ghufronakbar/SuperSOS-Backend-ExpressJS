'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');

exports.index = function (req, res) {
    response.ok("REST API Worked!", res)
}

//GET CALLS 
exports.call = function (req, res) {
    let id = req.params.id
    connection.query(`SELECT calls.id_call, calls.message, calls.latitude, calls.longitude,
                        calls.applied_at, calls.answered_at, calls.status, 
                        user.fullname AS user_name, user.address AS user_address,
                        user.phone AS user_phone, user.email AS user_email, user.picture AS user_picture,
                        admin.fullname AS admin_name,
                        admin.phone AS admin_phone, admin.email AS admin_email, 
                        instances.id_instances, instances.instances_name, instances.address
                        FROM user JOIN admin JOIN calls JOIN instances
                        WHERE user.id_user = calls.id_user AND admin.id_admin = calls.id_admin 
                        AND instances.id_instances = admin.id_instances AND instances.id_instances = ? `,
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            };
        }
    )
};

//GET CALLS ID 
exports.callid = function (req, res) {
    let id = req.params.id
    
    connection.query(`SELECT calls.id_call, calls.message, calls.latitude, calls.longitude,
                        calls.applied_at, calls.answered_at, calls.status, 
                        user.fullname AS user_name, user.address AS user_address,
                        user.phone AS user_phone, user.email AS user_email, user.picture AS user_picture,
                        admin.fullname AS admin_name,
                        admin.phone AS admin_phone, admin.email AS admin_email, 
                        instances.id_instances, instances.instances_name, instances.address
                        FROM user JOIN admin JOIN calls JOIN instances
                        WHERE user.id_user = calls.id_user AND admin.id_admin = calls.id_admin 
                        AND instances.id_instances = admin.id_instances AND calls.id_call=? `,
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            };
        }
    )
};

//GET CALLS PENDING
exports.callpending = function (req, res) {
    let id = req.params.id
    connection.query(`SELECT calls.id_call, calls.message, calls.latitude, calls.longitude,
                        calls.applied_at, calls.answered_at, calls.status, 
                        user.fullname AS user_name, user.address AS user_address,
                        user.phone AS user_phone, user.email AS user_email, user.picture AS user_picture,
                        admin.fullname AS admin_name,
                        admin.phone AS admin_phone, admin.email AS admin_email, 
                        instances.id_instances, instances.instances_name, instances.address
                        FROM user JOIN admin JOIN calls JOIN instances
                        WHERE user.id_user = calls.id_user AND admin.id_admin = calls.id_admin 
                        AND instances.id_instances = admin.id_instances AND calls.status=0 AND instances.id_instances = ? `,
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            };
        }
    )
};


//GET CALLS CANCELED    
exports.callcanceled = function (req, res) {
    let id = req.params.id
    connection.query(`SELECT calls.id_call, calls.message, calls.latitude, calls.longitude,
                        calls.applied_at, calls.answered_at, calls.status, 
                        user.fullname AS user_name, user.address AS user_address,
                        user.phone AS user_phone, user.email AS user_email, user.picture AS user_picture,
                        admin.fullname AS admin_name,
                        admin.phone AS admin_phone, admin.email AS admin_email, 
                        instances.id_instances, instances.instances_name, instances.address
                        FROM user JOIN admin JOIN calls JOIN instances
                        WHERE user.id_user = calls.id_user AND admin.id_admin = calls.id_admin 
                        AND instances.id_instances = admin.id_instances AND calls.status=1 AND instances.id_instances = ? `,
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            };
        }
    )
};

//GET CALLS NOT APPROVED
exports.callrejected = function (req, res) {
    let id = req.params.id
    connection.query(`SELECT calls.id_call, calls.message, calls.latitude, calls.longitude,
                        calls.applied_at, calls.answered_at, calls.status, 
                        user.fullname AS user_name, user.address AS user_address,
                        user.phone AS user_phone, user.email AS user_email, user.picture AS user_picture,
                        admin.fullname AS admin_name,
                        admin.phone AS admin_phone, admin.email AS admin_email, 
                        instances.id_instances, instances.instances_name, instances.address
                        FROM user JOIN admin JOIN calls JOIN instances
                        WHERE user.id_user = calls.id_user AND admin.id_admin = calls.id_admin 
                        AND instances.id_instances = admin.id_instances AND calls.status=2 AND instances.id_instances = ? `,
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            };
        }
    )
};

//GET CALLS APPROVED
exports.callapproved = function (req, res) {
    let id = req.params.id
    connection.query(`SELECT calls.id_call, calls.message, calls.latitude, calls.longitude,
                        calls.applied_at, calls.answered_at, calls.status, 
                        user.fullname AS user_name, user.address AS user_address,
                        user.phone AS user_phone, user.email AS user_email, user.picture AS user_picture,
                        admin.fullname AS admin_name,
                        admin.phone AS admin_phone, admin.email AS admin_email, 
                        instances.id_instances, instances.instances_name, instances.address
                        FROM user JOIN admin JOIN calls JOIN instances
                        WHERE user.id_user = calls.id_user AND admin.id_admin = calls.id_admin 
                        AND instances.id_instances = admin.id_instances AND calls.status=3 AND instances.id_instances = ? `,
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            };
        }
    )
};

//PUT CALL APPROVE 
exports.callapprove = function (req, res) {
    let id = req.params.id
    let now = new Date();
    let status = req.body.status
    let datetimenow = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) + ' ' +
        ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);


    if (status == 2) {
        connection.query(`UPDATE calls SET status=2, answered_at=?  WHERE id_call=? `,
            [datetimenow, id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    response.ok(rows, res)
                };
            }
        )
    }else if(status==3){
        connection.query(`UPDATE calls SET status=3, answered_at=?  WHERE id_call=? `,
            [datetimenow, id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    response.ok(rows, res)
                };
            }
        )
    }

};

//DELETE CALLS
exports.calldelete = function (req, res) {

    let id = req.params.id
    connection.query(`DELETE FROM calls WHERE id_call=?`,
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            };
        }
    )
};

