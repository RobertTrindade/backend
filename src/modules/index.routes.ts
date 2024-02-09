import { Router } from "express";

import AdminPermissionRoutes from "./usuarios-permission/usuarios-permission.route";
import UserRoutes from "./usuarios/usuarios.route";
import AuthRoutes from "./auth/auth.route";
import ContactRoutes from "./contact/contact.route";
import FaqRoutes from "./faq/faq.route";
import TextRoutes from "./text/text.route";
import UploadFileRoutes from "./upload-file/upload-file.route";
import PatiosRoutes from "./patios/patios.routes";
import MotoristasRoutes from "./motoristas/motoristas.routes";
import MotoristasLocationRoutes from "./location/location.routes";
import ChamadosRoutes from "./chamados/chamados.routes";
import NcvRoutes from "./ncv/ncv.routes";
import PalletRoutes from "./pallet/pallet.routes";
import ChatRoutes from "./chat/chat.routes";
import PermissionsRoutes from "./permissions/permissions.routes";
import RelatoriosRoutes from "./relatorios/relatorios.routes";
import CargosRoutes from "./cargos/cargos.routes";
import TiposVeiculoRoutes from "./tipoVeiculos/tipoVeiculos.routes";

const router = Router();

router.use("/usuarios/permissions", AdminPermissionRoutes);
router.use("/usuarios", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/contact", ContactRoutes);
router.use("/faqs", FaqRoutes);
router.use("/texts", TextRoutes);
router.use("/upload-file", UploadFileRoutes);
router.use("/patios", PatiosRoutes);
router.use("/motoristas", MotoristasRoutes);
router.use("/motorista-location", MotoristasLocationRoutes);
router.use("/chamados", ChamadosRoutes);
router.use("/ncv", NcvRoutes);
router.use("/pallet", PalletRoutes);
router.use("/chat", ChatRoutes);
router.use("/permissions", PermissionsRoutes);
router.use("/relatorios", RelatoriosRoutes);
router.use("/cargos", CargosRoutes);
router.use("/tipo-veiculos", TiposVeiculoRoutes);

export default router;
