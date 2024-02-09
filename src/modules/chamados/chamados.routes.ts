import { Router } from "express";
import Controller from "./chamados.controller";
import Validator from "./chamados.validator";
import Auth from "@middlewares/auth";
import { Permissions } from "@prisma/client";
import auth from "@middlewares/auth";

const router = Router();

router
  .route("/")
  .post(
    Auth.authentication,
    Auth.roles("cco"),
    Auth.authorization(Permissions.chamados),
    Validator.create,
    Controller.create
  );

router.route("/:id").get(Validator.pathParams, Controller.readById);

router
  .route("/")
  .get(Auth.authentication, Validator.queryParams, Controller.findAll);

router
  .route("/motorista/aceitar-chamado/:id")
  .put(
    auth.authentication,
    Validator.motoristaAceitaChamado,
    Controller.motoristaAceitaChamado
  );
router
  .route("/motorista/recusa-chamado/:id")
  .put(
    auth.authentication,
    Validator.pathParams,
    Controller.motoristaRecusaChamado
  );

router
  .route("/cco/recusa-chamado/:id")
  .put(auth.authentication, Validator.pathParams, Controller.ccoRecusaChamado);

router
  .route("/cco/aloca-chamado/:id")
  .put(auth.authentication, Validator.pathParams, Controller.ccoAlocaChamado);

router
  .route("/motorista/entra-checklist/:id")
  .put(auth.authentication, Controller.motoristaEntreChecklist);

router.route("/:id").delete(Controller.delete);
router
  .route("/:id")
  .patch(
    Auth.authentication,
    Auth.roles("cco"),
    Auth.authorization(Permissions.chamados),
    Validator.update,
    Controller.update
  );

export default router;
