import { Router } from "express";
import Controller from "./patios.controller";
import Validator from "./patios.validator";
import auth from "@middlewares/auth";

const router = Router();

router
  .route("/")
  .post(
    auth.authentication,
    auth.roles("cco"),
    Validator.create,
    Controller.create
  );
router.route("/:id").get(Controller.readById);
router.route("/").get(Controller.read);

router.route("/:id").patch(Controller.update);

export default router;
