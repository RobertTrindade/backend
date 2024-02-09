

import { Request, Response } from 'express';
import Service from './newsLetters.service';
import { TryCatch } from '@decorators/try-catch.decorator';

class Controller {

  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(req.body);
    res.status(200).json(result);
  }
  @TryCatch()
  public async read(req: Request, res: Response) {
    const result = await Service.read();
    res.status(200).json(result);
  }

  @TryCatch()
  public async readById(req: Request, res: Response) {
    const result = await Service.readById(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async update(req: Request, res: Response) {
    const result = await Service.update(+req.params.id,req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async delete(req: Request, res: Response) {
    const result = await Service.delete(req.body);
    res.status(200).json(result);
  }
}

export default new Controller();

 