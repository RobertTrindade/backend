import { Router } from "express";

import Controller from "./auth.controller";
import Validator from "./auth.validator";

const router = Router();

// admin routes.
router.route("/login").post(Validator.login, Controller.loginAdm);

router
  .route("/forgot-password")
  .post(Validator.forgotPassword, Controller.forgotPasswordAdm);

router
  .route("/reset-password")
  .post(Validator.resetPassword, Controller.resetPasswordAdm);

// Driver routes.
router.route("/driver/login").post(Validator.login, Controller.loginUser);

router
  .route("/driver/register")
  .post(Validator.registerDriver, Controller.registerDriver);

router
  .route("/driver/register")
  .get(Validator.registerDriver, Controller.registerDriver);

router
  .route("/driver/forgot-password")
  .post(Validator.forgotPassword, Controller.forgotPasswordDriver);

router
  .route("/driver/reset-password")
  .post(Validator.resetPassword, Controller.resetPasswordUser);

export default router;
