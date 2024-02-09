
import { Router } from 'express';
import Controller from './newsLetters.controller';
import Validator from './newsLetters.validator';

const router = Router();

router.route('/').post(Validator.create, Controller.create);
router.route('/:id').get(Controller.readById);
router.route('/').get(Controller.read);

router.route('/:id').put(Validator.update, Controller.update);
router.route('/:id').delete(Controller.delete);

export default router;
  