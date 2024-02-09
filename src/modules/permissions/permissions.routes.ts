import { Router } from "express";
import Controller from "./permissions.controller";
import Validator from "./permissions.validator";
import auth from "@middlewares/auth";

const router = Router();

router
  .route("/")
  .post(
    auth.authentication,
    auth.authorization("configuracoes"),
    Validator.create,
    Controller.create
  );
router.route("/").get(auth.authentication, Controller.read);
router.route("/:id").get(Controller.readById);

export default router;
