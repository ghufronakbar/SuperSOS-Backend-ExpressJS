"use strict";

// const verifikasi = require("./middleware/verifikasi");
const ControllerInstance = require("../controllers/intances");
const VerificationiInstance = require('../middleware/verifikasi-instance')

module.exports = function (app) {
  
  


  // API INSTANCES

  //REGISTER
  app.route(`/api/instance/register/`)
    .post(ControllerInstance.account_controller.register);

    app.route(`/api/instance/login/`)
    .post(ControllerInstance.account_controller.login);


  // CALL
  app.route(`/api/instance/calls/:type`)
    .get(VerificationiInstance, ControllerInstance.call_controller.calls);

  app.route(`/api/instance/call/:id_call`)
    .get(VerificationiInstance, ControllerInstance.call_controller.callid);

  app.route(`/api/instance/calls/pending/:type`)
    .get(VerificationiInstance, ControllerInstance.call_controller.callpending);

  app.route(`/api/instance/call/approve/:id_call`)
    .put(VerificationiInstance, ControllerInstance.call_controller.callapprove);

    app.route(`/api/instance/calls/history/:id_instances`)
    .get(VerificationiInstance, ControllerInstance.call_controller.callhistory);



  //PROFILE
  app.route(`/api/instance/profile/:id_instances`)
    .get(VerificationiInstance, ControllerInstance.account_controller.profile);

  app.route(`/api/instance/profile/edit/:id_instances`)
    .put(VerificationiInstance, ControllerInstance.account_controller.profileedit);

  app.route(`/api/instance/profile/edit/password/:id_instances`)
    .put(VerificationiInstance, ControllerInstance.account_controller.profilepass);



};

