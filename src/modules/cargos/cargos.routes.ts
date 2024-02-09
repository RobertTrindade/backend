import { Router } from "express";
import Controller from "./cargos.controller";
import auth from "@middlewares/auth";

const router = Router();

router.route("/").get(auth.authentication, Controller.read);

export default router;
