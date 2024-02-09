import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './usuarios-permission.controller';

const router = Router();

router
.route('/')
.get(
  Auth.authentication, Auth.roles('admin'), Auth.authorization(Permissions.configuracoes),
  Controller.findAll,
);

export default router;
