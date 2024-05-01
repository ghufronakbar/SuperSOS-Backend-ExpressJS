"use strict";

// const verifikasi = require("./middleware/verifikasi");

module.exports = function (app) {
  var api_admin = require("./controllers/admin");
  var api_user = require("./controllers/user");


    //API ADMIN

    //CALL
    //MELIHAT DATA CALL SESUAI INSTANCES
    app.route('/api/admin/calls/:id') //ID INSTANCES
    .get(api_admin.call_controller.call); 

    //MELIHAT DATA CALL SESUAI ID
    app.route('/api/admin/call/:id')
    .get(api_admin.call_controller.callid); 

    //MELIHAT DATA CALL PENDING (STATUS=0) SESUAI INSTANCES
    app.route('/api/admin/calls/pending/:id') //ID INSTANCES
    .get(api_admin.call_controller.callpending); 

    //MELIHAT DATA CALL REJECTED (STATUS=1) SESUAI INSTANCES
    app.route('/api/admin/calls/canceled/:id') //ID INSTANCES
    .get(api_admin.call_controller.callrejected); 

    //MELIHAT DATA CALL REJECTED (STATUS=2) SESUAI INSTANCES
    app.route('/api/admin/calls/rejected/:id') //ID INSTANCES
    .get(api_admin.call_controller.callrejected); 

    //MELIHAT DATA CALL APPROVED (STATUS=3) SESUAI INSTANCES
    app.route('/api/admin/calls/approved/:id') //ID INSTANCES
    .get(api_admin.call_controller.callapproved); 

    //MENGUBAH CALL STATUS 2/3 SESUAI ID
    app.route('/api/admin/call/approve/:id')
    .put(api_admin.call_controller.callapprove); 

    //MENGHAPUS CALL SESUAI ID
    app.route('/api/admin/call/delete/:id')
    .delete(api_admin.call_controller.calldelete); 


    //USER
    //MELIHAT DATA USER BESERTA HISTORY CALL
    app.route('/api/admin/user')
    .get(api_admin.user_controller.user); 

    //MELIHAT DATA USER BESERTA HISTORY CALL SESUAI ID
    app.route('/api/admin/user/:id')
    .get(api_admin.user_controller.userid); 


    //INSTANCES
    //MELIHAT DATA INSTANCES
    app.route('/api/admin/instances')
    .get(api_admin.instances_controller.instances); 

    //MELIHAT DATA INSTANCES BERDASAR ID
    app.route('/api/admin/instances/:id')
    .get(api_admin.instances_controller.instancesid); 

    //MENGEDIT DATA INSTANCES BERDASAR ID (INSTANCES_NAME, ADDRESS)
    app.route('/api/admin/instances/edit/:id')
    .put(api_admin.instances_controller.instancesedit); 



    //USER

    //ACCOUNT
    //REGISTRASI ACCOUNT
    app.route('/api/user/account/register')
    .post(api_user.account_controller.register); 

    //EDIT ACCOUNT
    app.route('/api/user/account/edit/data/:id')
    .put(api_user.account_controller.editaccount); 

    //EDIT PICTURE
    app.route('/api/user/account/edit/picture/:id')
    .put(api_user.account_controller.editpicture); 

    //EDIT PASSWORD
    app.route('/api/user/account/edit/password/:id')
    .put(api_user.account_controller.editpassword); 


    //CALL
    //MAKE CALL
    app.route('/api/user/call/make')
    .post(api_user.call_controller.makecall); 

    //CANCEL CALL
    app.route('/api/user/call/cancel/:id')
    .put(api_user.call_controller.cancelcall); 


    //HISTORY
    //HISTORY USER
    app.route('/api/user/call/history/:id')
    .get(api_user.history_controller.historyuser); 

     //HISTORY USER
     app.route('/api/user/call/history/detail/:id')
     .get(api_user.history_controller.historyuserid); 
};

