import { Request, Response } from "express";
import Service from "./motoristas.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import {
  UpdateDto,
  UpdateDtoStatus,
  UpdateDtoWorkingStatus,
} from "./dtos/update.dto";
import { RequestQueryDto } from "@dtos/request-query.dto";
import { AccountStatus } from "@prisma/client";

class Controller {
  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async read(req: Request, res: Response) {
    const { dataInicio, dataFinal, status } = req.query as RequestQueryDto;
    const result = await Service.findAll(
      dataFinal,
      dataInicio,
      status as AccountStatus
    );
    res.status(200).json(result);
  }
  @TryCatch()
  public async readFromChamados(req: Request, res: Response) {
    const { status } = req.query as RequestQueryDto;
    const result = await Service.readFromChamados(status as AccountStatus);
    res.status(200).json(result);
  }

  @TryCatch()
  public async buscaMeusChamados(req: Request, res: Response) {
    const result = await Service.buscaMeusChamados(+req.auth.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async buscaChamadosDirecionado(req: Request, res: Response) {
    const result = await Service.buscaChamadosDirecionado(+req.auth.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async readById(req: Request, res: Response) {
    const result = await Service.readById(+req.params.id as number);
    res.status(200).json(result);
  }

  @TryCatch()
  public async getMyself(req: Request, res: Response) {
    const result = await Service.readById(+req.auth.id as number);
    res.status(200).json(result);
  }

  @TryCatch()
  public async changeStatus(req: Request, res: Response) {
    const result = await Service.changeStatus(
      +req.params.id,
      req.body as UpdateDtoStatus
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async changeWorkingStatus(req: Request, res: Response) {
    const result = await Service.changeWorkingStatus(
      req.auth.id,
      req.body as UpdateDtoWorkingStatus
    );
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
