import { Request, Response } from "express";
import Service from "./cargos.service";
import { TryCatch } from "@decorators/try-catch.decorator";

class Controller {
  @TryCatch()
  public async read(req: Request, res: Response) {
    const result = await Service.read();
    res.status(200).json(result);
  }
}

export default new Controller();
