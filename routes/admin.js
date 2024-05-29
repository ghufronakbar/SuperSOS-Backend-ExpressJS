"use strict";

// const verifikasi = require("./middleware/verifikasi");

module.exports = function (app) {
  var api_admin = require("../controllers/admin");
  var api_instance = require("../controllers/intances");



  //API ADMIN

  //ACCOUNT
  app.route(`/api/admin/login/`)
    .post(api_admin.account_controller.login);

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

  app.route(`/api/admin/instance/suspend/:id_instances`)
    .put(api_admin.instances_controller.instancesuspend);

  app.route(`/api/admin/instance/reject/:id_instances`)
    .delete(api_admin.instances_controller.instancedelete);





};

