import { Router } from "express";
import Controller from "./motoristas.controller";
import Validator from "./motoristas.validator";
import auth from "@middlewares/auth";

const router = Router();

router.route("/").post(Validator.create, Controller.create);
router.route("/:id").get(Validator.pathParams, Controller.readById);
router
  .route("/getMyself/profile")
  .get(auth.authentication, Controller.getMyself);

router.route("/").get(Validator.queryParams, Controller.read);


router.route("/:id").patch(Validator.updateStatus, Controller.changeStatus);

router
  .route("/chamados/owner/redirected")
  .get(auth.authentication, Controller.buscaChamadosDirecionado);

router
  .route("/chamados/owner")
  .get(auth.authentication, Controller.buscaMeusChamados);

  router
  .route("/chamados/buscaAtribuicao")
  .get(Validator.queryParams, Controller.readFromChamados);

router
  .route("/working-status/change")
  .patch(
    auth.authentication,
    Validator.UpdateStatusWorking,
    Controller.changeWorkingStatus
  );

router.route("/:id").put(Validator.update, Controller.update);
router.route("/:id").delete(Controller.delete);

export default router;
