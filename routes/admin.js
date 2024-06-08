"use strict";

const ControllerAdmin = require("../controllers/admin");
const VerficationAdmin = require("../middleware/verifikasi-admin");

module.exports = function (app) {
  //API ADMIN
  //ACCOUNT
  app.route(`/api/admin/login/`)
    .post(ControllerAdmin.account_controller.login);

  //CALL
  app.route(`/api/admin/calls/`)
    .get(VerficationAdmin, ControllerAdmin.call_controller.calls);

  app.route(`/api/admin/call/:id_call`)
    .get(VerficationAdmin, ControllerAdmin.call_controller.callid);

  app.route(`/api/admin/call/instances/:id_instances`)
    .get(VerficationAdmin, ControllerAdmin.call_controller.callinstances);

  app.route(`/api/admin/call/type/:type`)
    .get(VerficationAdmin, ControllerAdmin.call_controller.calltype);


  //USER
  app.route(`/api/admin/users/`)
    .get(VerficationAdmin, ControllerAdmin.user_controller.user);

  app.route(`/api/admin/user/:id_user`)
    .get(VerficationAdmin, ControllerAdmin.user_controller.userid);

  app.route(`/api/admin/user/suspend/:id_user`)
    .put(VerficationAdmin, ControllerAdmin.user_controller.usersuspend);


  //INSTANCES
  app.route(`/api/admin/instances/`)
    .get(VerficationAdmin, ControllerAdmin.instances_controller.instances);

  app.route(`/api/admin/instance/:id_instances`)
    .get(VerficationAdmin, ControllerAdmin.instances_controller.instanceid);

  app.route(`/api/admin/instances/pending`)
    .get(VerficationAdmin, ControllerAdmin.instances_controller.instancepending);

  app.route(`/api/admin/instance/approve/:id_instances`)
    .put(VerficationAdmin, ControllerAdmin.instances_controller.instanceapprove);

  app.route(`/api/admin/instance/suspend/:id_instances`)
    .put(VerficationAdmin, ControllerAdmin.instances_controller.instancesuspend);

  app.route(`/api/admin/instance/reject/:id_instances`)
    .delete(VerficationAdmin, ControllerAdmin.instances_controller.instancedelete);





};

