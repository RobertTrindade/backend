import { Router } from "express";
import Controller from "./relatorios.controller";
import Validator from "./relatorios.validator";

const router = Router();

router
  .route("/fechamento-motorista")
  .get(
    Validator.queryParams,
    Controller.fechamentoMotorista
  );

export default router;
