import { Request, Response } from "express";
import Service from "./chat.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { createDto } from "./dtos/create.dto";

class Controller {
  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(
      +req.auth.id,
      +req.params.id,
      req.body as createDto
    );
  
    res.status(200).json(result);
  }

  @TryCatch()
  public async read(req: Request, res: Response) {
    const result = await Service.read();
    res.status(200).json(result);
  }

  @TryCatch()
  public async getGroups(req: Request, res: Response) {
    const result = await Service.getGroups();
    res.status(200).json(result);
  }

  @TryCatch()
  public async readById(req: Request, res: Response) {
    const result = await Service.readById(+req.params.id);
      const mapped = result.map((item)=>({
        ...item,
        isMine:+req.auth.id === item.senderId,

      }))

    res.status(200).json(mapped);
  }

  @TryCatch()
  public async update(req: Request, res: Response) {
    const result = await Service.update(+req.params.id, req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async delete(req: Request, res: Response) {
    const result = await Service.delete(req.body);
    res.status(200).json(result);
  }
}

export default new Controller();
