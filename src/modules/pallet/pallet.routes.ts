import { Router } from "express";
import Controller from "./pallet.controller";

const router = Router();

router.route("/").get(Controller.read);

export default router;
