

  import BaseValidator from '@abstracts/validator.abstract';
  import { RequestHandler } from 'express';
  import { Create ,Calculate} from './dtos/create.dto';
  import { Read } from './dtos/read.dto';
  import { Update } from './dtos/update.dto';

  class Validator extends BaseValidator {
    public create: RequestHandler = (req, res, next) => {
      this.validateSchema(req, next, 'body', Create);
    };
    public distanceCalculate: RequestHandler = (req, res, next) => {
      this.validateSchema(req, next, 'query',Calculate );
    };


    public read: RequestHandler = (req, res, next) => {
      this.validateSchema(req, next, 'query', Read);
    };

    public update: RequestHandler = (req, res, next) => {
      this.validateSchema(req, next, 'body', Update);
    };

    public delete: RequestHandler = (req, res, next) => {
      // Por padrão, a exclusão pode não precisar de validação,
      // mas você pode adicionar validações personalizadas aqui se necessário.
      //    this.validateSchema(req, next, 'body', DeleteDto);

      next();
    };
  }

  export default new Validator();


  