'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');

exports.index = function (req, res) {
    response.ok("REST API Worked!", res)
}

//GET INSTANCES 
exports.instances = function (req, res) {
    connection.query(`SELECT * FROM instances`,
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res);
            };
        }
    )
};

//GET ID INSTANCES 
exports.instancesid = function (req, res) {
    let id = req.params.id
    connection.query(`SELECT * FROM instances WHERE id_instances=?`,[id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res);
            };
        }
    )
};


//EDIT INSTANCES 
exports.instancesedit = function (req, res) {
    let instances_name = req.body.instances_name
    let address = req.body.address
    let id = req.params.id
    connection.query(`UPDATE instances SET instances_name=?, address=? WHERE id_instances=?`,[instances_name, address,id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res);
            };
        }
    )
};