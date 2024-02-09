import { Request, Response } from "express";
import Service from "./location.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { UpdateDto } from "./dtos/update.dto";
import { distanceCalculateDto } from "./dtos/create.dto";

class Controller {
  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async distanceCalculate(req: Request, res: Response) {
    const result = Service.distanceCalculate(req.query as distanceCalculateDto);
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
    const result = await Service.update(+req.auth.id, req.body as UpdateDto);
    res.status(200).json(result);
  }

  @TryCatch()
  public async delete(req: Request, res: Response) {
    const result = await Service.delete(req.body);
    res.status(200).json(result);
  }
}

export default new Controller();
