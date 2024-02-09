import { Router } from "express";
import Controller from "./ncv.controller";
import Validator from "./ncv.validator";
import auth from "@middlewares/auth";

const router = Router();

router
  .route("/")
  .post(Validator.create, auth.authentication, Controller.create);

router
  .route("/extras/:id")
  .post(Validator.createExtras, auth.authentication, Controller.createExtra);

router.route("/").get(Controller.findAll);
router.route("/:id").get(Controller.findById);
router
  .route("/documentos/:id")
  .post(
    auth.authentication,
    Validator.createDocument,
    Controller.createDocument
  )
  .get(Validator.pathParams, Controller.findAllDocument);

router.route("/extras/:id").post(auth.authentication, Controller.createExtra);
router.route("/:id").put(auth.authentication, Controller.update);

export default router;
