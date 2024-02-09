import { Router } from "express";
import Controller from "./tipoVeiculos.controller";
import Validator from "./tipoVeiculos.validator";
import auth from "@middlewares/auth";

const router = Router();

router
  .route("/")
  .post(
    auth.authentication,
    auth.authorization("tipoVeiculo"),
    Validator.create,
    Controller.create
  );

router
  .route("/")
  .get(
    auth.authentication,
    auth.authorization("tipoVeiculo"),
    Validator.queryParams,
    Controller.read
  );

router.route("/:id").put(Validator.update, Controller.update);

router.route("/:id").get(Controller.readById);

router.route("/:id").delete(Controller.delete);

export default router;
