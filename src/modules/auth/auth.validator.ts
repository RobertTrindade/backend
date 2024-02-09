import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { Login } from './dtos/login.dto';
import { ForgotPassword, ResetPassword } from './dtos/password.dto';
import { RegisterDriver } from './dtos/registerDriver.dto';

class Validator extends BaseValidator {
  public login: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', Login);
  };

  public forgotPassword: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', ForgotPassword);
  };

  public resetPassword: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', ResetPassword);
  };

  public registerDriver: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', RegisterDriver);
  };
}

export default new Validator();
