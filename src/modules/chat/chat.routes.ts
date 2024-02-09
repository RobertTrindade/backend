import { Router } from "express";
import Controller from "./chat.controller";
import Validator from "./chat.validator";
import auth from "@middlewares/auth";

const router = Router();

router
  .route("/message/:id")
  .post(Validator.create, auth.authentication, Controller.create);

router.route("/groups/messages/:id").get(auth.authentication, Controller.readById);

router.route("/groups").get(auth.authentication, Controller.getGroups);

router.route("/:id").get(Controller.readById);
router.route("/").get(Controller.read);

router.route("/:id").put(Validator.update, Controller.update);
router.route("/:id").delete(Controller.delete);

export default router;
