"use strict";

const verifikasi = require("./middleware/verifikasi");
const express = require("express");

module.exports = function (app) {
  var apiAdmin = require("./controllers/admin");
  var apiUser = require("./controllers/user");


    //API ADMIN

    //CALL
    //MELIHAT DATA CALL SESUAI INSTANCES
    app.route('/api/admin/calls/:id') //ID INSTANCES
    .get(apiAdmin.call_controller.call); 

    //MELIHAT DATA CALL SESUAI ID
    app.route('/api/admin/call/:id')
    .get(apiAdmin.call_controller.callid); 

    //MELIHAT DATA CALL PENDING (STATUS=0) SESUAI INSTANCES
    app.route('/api/admin/calls/pending/:id') //ID INSTANCES
    .get(apiAdmin.call_controller.callpending); 

    //MELIHAT DATA CALL REJECTED (STATUS=1) SESUAI INSTANCES
    app.route('/api/admin/calls/rejected/:id') //ID INSTANCES
    .get(apiAdmin.call_controller.callrejected); 

    //MELIHAT DATA CALL APPROVED (STATUS=2) SESUAI INSTANCES
    app.route('/api/admin/calls/approved/:id') //ID INSTANCES
    .get(apiAdmin.call_controller.callapproved); 

    //MENGUBAH CALL STATUS 1/2 SESUAI ID
    app.route('/api/admin/call/approve/:id')
    .put(apiAdmin.call_controller.callapprove); 

    //MENGHAPUS CALL SESUAI ID
    app.route('/api/admin/call/delete/:id')
    .delete(apiAdmin.call_controller.calldelete); 


    //USER
    //MELIHAT DATA USER BESERTA HISTORY CALL
    app.route('/api/admin/user')
    .get(apiAdmin.user_controller.user); 

    //MELIHAT DATA USER BESERTA HISTORY CALL SESUAI ID
    app.route('/api/admin/user/:id')
    .get(apiAdmin.user_controller.userid); 

};
