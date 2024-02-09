import { Router } from "express";
import Controller from "./location.controller";
import Validator from "./location.validator";
import auth from "@middlewares/auth";

const router = Router();

router.route("/").post(Validator.create, Controller.create);
router.route("/:id").get(Controller.readById);
router.route("/").get(Controller.read);

router
  .route("/")
  .patch(auth.authentication, Validator.update, Controller.update);
router.route("/:id").delete(Controller.delete);

router
  .route("/calculate/distance")
  .get( Controller.distanceCalculate);

export default router;
