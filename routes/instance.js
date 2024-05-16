"use strict";

// const verifikasi = require("./middleware/verifikasi");

module.exports = function (app) {
  
  var api_instance = require("../controllers/intances");
  


  // API INSTANCES

  //REGISTER
  app.route(`/api/instance/register/`)
    .post(api_instance.account_controller.register);

    app.route(`/api/instance/login/`)
    .post(api_instance.account_controller.login);


  // CALL
  app.route(`/api/instance/calls/:type`)
    .get(api_instance.call_controller.calls);

  app.route(`/api/instance/call/:id_call`)
    .get(api_instance.call_controller.callid);

  app.route(`/api/instance/calls/pending/:type`)
    .get(api_instance.call_controller.callpending);

  app.route(`/api/instance/call/approve/:id_call`)
    .put(api_instance.call_controller.callapprove);

    app.route(`/api/instance/calls/history/:id_instances`)
    .get(api_instance.call_controller.callhistory);



  //PROFILE
  app.route(`/api/instance/profile/:id_instances`)
    .get(api_instance.account_controller.profile);

  app.route(`/api/instance/profile/edit/:id_instances`)
    .put(api_instance.account_controller.profileedit);

  app.route(`/api/instance/profile/edit/password/:id_instances`)
    .put(api_instance.account_controller.profilepass);



};

