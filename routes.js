"use strict";

// const verifikasi = require("./middleware/verifikasi");

module.exports = function (app) {
  var api_admin = require("./controllers/admin");
  var api_instance = require("./controllers/intances");
  var api_user = require("./controllers/user");


  //API ADMIN

  //CALL
  app.route(`/api/admin/calls/`)
    .get(api_admin.call_controller.calls);

  app.route(`/api/admin/call/:id_call`)
    .get(api_admin.call_controller.callid);

  app.route(`/api/admin/call/instances/:id_instances`)
    .get(api_admin.call_controller.callinstances);

  app.route(`/api/admin/call/type/:type`)
    .get(api_admin.call_controller.calltype);


  //USER
  app.route(`/api/admin/users/`)
    .get(api_admin.user_controller.user);

  app.route(`/api/admin/user/:id_user`)
    .get(api_admin.user_controller.userid);

  app.route(`/api/admin/user/suspend/:id_user`)
    .put(api_admin.user_controller.usersuspend);


  //INSTANCES
  app.route(`/api/admin/instances/`)
    .get(api_admin.instances_controller.instances);

  app.route(`/api/admin/instance/:id_instances`)
    .get(api_admin.instances_controller.instanceid);

  app.route(`/api/admin/instances/pending`)
    .get(api_admin.instances_controller.instancepending);

  app.route(`/api/admin/instance/approve/:id_instances`)
    .put(api_admin.instances_controller.instanceapprove);

  app.route(`/api/admin/instance/reject/:id_instances`)
    .delete(api_admin.instances_controller.instancedelete);



  // API INSTANCES

  //REGISTER
  app.route(`/api/instance/register/`)
    .post(api_instance.account_controller.register);


  // CALL
  app.route(`/api/instance/calls/:type`)
    .get(api_instance.call_controller.calls);

  app.route(`/api/instance/call/:id_call`)
    .get(api_instance.call_controller.callid);

  app.route(`/api/instance/calls/pending/:type`)
    .get(api_instance.call_controller.callpending);

  app.route(`/api/instance/call/approve/:id_call`)
    .put(api_instance.call_controller.callapprove);



  //PROFILE
  app.route(`/api/instance/profile/:id_instances`)
    .get(api_instance.account_controller.profile);

  app.route(`/api/instance/profile/edit/:id_instances`)
    .put(api_instance.account_controller.profileedit);

  app.route(`/api/instance/profile/edit/password/:id_instances`)
    .put(api_instance.account_controller.profilepass);



  // API USER

  //REGISTER
  app.route(`/api/user/register`)
    .post(api_user.account_controller.register);


  //CALL

  app.route(`/api/user/call/make/:id_user`)
    .post(api_user.call_controller.makecall);

  app.route(`/api/user/call/cancel/:id_call`)
    .put(api_user.call_controller.cancelcall);

    //HISTORY

  app.route(`/api/user/call/history/:id_user`)
    .get(api_user.history_controller.callhistory);

    app.route(`/api/user/call/history/detail/:id_call`)
    .get(api_user.history_controller.callhistorydetail);


    //ACCOUNT
    app.route(`/api/user/profile/:id_user`)
    .get(api_user.account_controller.profile);

    app.route(`/api/user/profile/edit/:id_user`)
    .put(api_user.account_controller.editaccount);

    app.route(`/api/user/profile/edit/picture/:id_user`)
    .put(api_user.account_controller.editpicture);

    app.route(`/api/user/profile/edit/password/:id_user`)
    .put(api_user.account_controller.editpassword);

};

