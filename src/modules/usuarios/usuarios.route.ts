import { Router } from "express";
import { Permissions } from "@prisma/client";

import Auth from "@middlewares/auth";
import Controller from "./usuarios.controller";
import Validator from "./usuarios.validator";

const router = Router();
router
  .route("/")
  .get(
    Auth.authentication,
    Auth.authorization(Permissions.usuarios),
    Validator.queryParams,
    Controller.findAll
  )
  .post(
    Auth.authentication,
    Auth.authorization(Permissions.usuarios),
    Validator.createOne,
    Controller.createOne
  );

router.route("/findmyself").get(Auth.authentication, Controller.findMyself);

router
  .route("/:id")

  .get(Validator.pathParams, Controller.findOne)
  .put(
    Auth.authentication,
    Auth.authorization(Permissions.usuarios),
    Validator.pathParams,
    Validator.updateOne,
    Controller.updateOne
  )
  .delete(
    Auth.authentication,
    Auth.authorization(Permissions.usuarios),
    Validator.pathParams,
    Controller.deleteOne
  );

router
  .route("/profile/editmyself")
  .put(
    Auth.authentication,
    Validator.updateMyself,
    Controller.updateMyself
  )


router
  .route("/:id/patio")
  .patch(
    Auth.authentication,
    Auth.authorization(Permissions.usuarios),
    Controller.addPatio
  );

router
  .route("/:id/delete/patio")
  .patch(
    Auth.authentication,
    Auth.authorization(Permissions.usuarios),
    Controller.removePatio
  );

router
  .route("/:id/delete/permission")
  .patch(
    Auth.authentication,
    Auth.authorization(Permissions.usuarios),
    Controller.removePermission
  );

router
  .route("/:id/permission")
  .patch(
    Auth.authentication,
    Auth.authorization(Permissions.usuarios),
    Controller.addPermission
  );

export default router;
