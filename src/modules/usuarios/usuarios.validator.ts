import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateAdmin } from './dtos/create-admin.dto';
import { UpdateAdmin,UpdateMyselfAdmin } from './dtos/update-admin.dto';
import { AddPatio } from './dtos/patio.dto';

class Validator extends BaseValidator {
  public addPatio: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', AddPatio);
  };

  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateAdmin);
  };

  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateAdmin);
  };

  public updateMyself: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateMyselfAdmin);
  };
  public findMySelf: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateAdmin);
  };
}

export default new Validator();
