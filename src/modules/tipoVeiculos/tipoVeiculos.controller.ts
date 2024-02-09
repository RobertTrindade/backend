import { Request, Response } from "express";
import Service from "./tipoVeiculos.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { UpdateDto } from "./dtos/update.dto";

class Controller {
  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(req.body);
    res.status(200).json(result);
  }
  @TryCatch()
  public async read(req: Request, res: Response) {
    const { ativo } = req.query;
    
    const result = await Service.read(ativo === "true" ? true : false);
    res.status(200).json(result);
  }

  @TryCatch()
  public async readById(req: Request, res: Response) {
    const result = await Service.readById(+req.params.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async update(req: Request, res: Response) {
    const result = await Service.update(+req.params.id, req.body as UpdateDto);
    res.status(200).json(result);
  }

  @TryCatch()
  public async delete(req: Request, res: Response) {
    const result = await Service.delete(req.body);
    res.status(200).json(result);
  }
}

export default new Controller();
