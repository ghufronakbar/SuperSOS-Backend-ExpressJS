"use strict";

const verifikasiUser = require("../middleware/verifikasi-user");

module.exports = function (app) {
  var api_user = require("../controllers/user");

  // API USER

  //REGISTER
  app.route(`/api/user/register`)
    .post(api_user.account_controller.register);

  app.route(`/api/user/login`)
    .post(api_user.account_controller.login);


  //CALL
  app.route(`/api/user/call/make/:id_user`)
    .post(verifikasiUser, api_user.call_controller.makecall);

  app.route(`/api/user/call/cancel/:id_call`)
    .put(verifikasiUser, api_user.call_controller.cancelcall);


  //HISTORY
  app.route(`/api/user/call/histories`)
    .get(verifikasiUser, api_user.history_controller.callhistory);

  app.route(`/api/user/call/history/:id_call`)
    .get(verifikasiUser, api_user.history_controller.callhistorydetail);


  //ACCOUNT
  app.route(`/api/user/name`)
    .get(verifikasiUser, api_user.account_controller.name);

  app.route(`/api/user/profile`)
    .get(verifikasiUser, api_user.account_controller.profile);

  app.route(`/api/user/profile/edit`)
    .put(verifikasiUser, api_user.account_controller.editaccount);

  app.route(`/api/user/profile/edit/picture`)
    .put(verifikasiUser, api_user.account_controller.editpicture);

  app.route(`/api/user/profile/edit/password`)
    .put(verifikasiUser, api_user.account_controller.editpassword);

};

