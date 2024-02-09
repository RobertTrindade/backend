

import { Request, Response } from 'express';
import Service from './permissions.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { createDto } from './dtos/create.dto';

class Controller {

  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(req.body as createDto);
    res.status(200).json(result);
  } 
  @TryCatch()
  public async read(req: Request, res: Response) {
    const result = await Service.read();
    res.status(200).json(result);
  }

  @TryCatch()
  public async readById(req: Request, res: Response) {
    const result = await Service.readById(+req.params.id);
    res.status(200).json(result);
  }

}

export default new Controller();

 