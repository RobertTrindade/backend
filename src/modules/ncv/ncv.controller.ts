import { Request, Response } from "express";
import Service from "./ncv.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { RequestQueryDto } from "@dtos/request-query.dto";
import {
  createDto,
  createDtoDocument,
  createDtoExtras,
} from "./dtos/create.dto";

class Controller {
  @TryCatch()
  public async findAll(req: Request, res: Response) {
    const { ncv, placa, dataFinal, dataInicio, status } =
      req.query as RequestQueryDto;
    const result = await Service.findAll(
      ncv,
      placa,
      status,
      dataFinal,
      dataInicio
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(+req.auth.id, req.body as createDto);
    res.status(200).json(result);
  }

  @TryCatch()
  public async createExtra(req: Request, res: Response) {
    const result = await Service.createExtra(
      +req.params.id,
      req.body as createDtoExtras
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Service.findById(+id);

    res.status(200).json(result);
  }
  @TryCatch()
  public async createDocument(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Service.createDocument(
      +id,
      req.body as createDtoDocument
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async findAllDocument(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Service.findAllDocument(+id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Service.update(+id, req.body);
    res.status(200).json(result);
  }
}

export default new Controller();
