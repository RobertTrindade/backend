import Service from "./usuarios.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { Request, Response } from "express";
import { RequestQueryDto } from "@dtos/request-query.dto";
import { AccountStatus } from "@prisma/client";
import { addPatioDto } from "./dtos/patio.dto";

class Controller {
  @TryCatch()
  public async findAll(req: Request, res: Response) {
    const { dataInicio, dataFinal, status } = req.query as RequestQueryDto;
    const response = await Service.findAll(
      dataFinal,
      dataInicio,
      status as AccountStatus
    );
    res.status(200).json(response);
  }

  @TryCatch()
  public async findOne(req: Request, res: Response) {
    const result = await Service.findOne(+req.params.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async findMyself(req: Request, res: Response) {
    const result = await Service.findOne(+req.auth.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async createOne(req: Request, res: Response) {
    const result = await Service.createOne(req.body);
    res.status(201).json(result);
  }

  @TryCatch()
  public async updateOne(req: Request, res: Response) {
    const result = await Service.updateOne(+req.params.id, req.body);
    res.status(200).json(result);
  }


  @TryCatch()
  public async updateMyself(req: Request, res: Response) {
    const result = await Service.updateMyself(+req.auth.id, req.body);
    res.status(200).json(result);
  }
  @TryCatch()
  public async deleteOne(req: Request, res: Response) {
    const result = await Service.deleteOne(+req.params.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async updateStatus(req: Request, res: Response) {
    const result = await Service.updateStatus(+req.params.id, req.body.status);
    res.status(200).json(result);
  }

  @TryCatch()
  public async addPatio(req: Request, res: Response) {
    const result = await Service.addPatio(
      +req.params.id,
      req.body as addPatioDto
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async removePatio(req: Request, res: Response) {
    const result = await Service.removePatio(
      +req.params.id,
      req.body as addPatioDto
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async addPermission(req: Request, res: Response) {
    const result = await Service.addPermission(
      +req.params.id,
      req.body as addPatioDto
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async removePermission(req: Request, res: Response) {
    const result = await Service.removePermission(
      +req.params.id,
      req.body as addPatioDto
    );
    res.status(200).json(result);
  }
}

export default new Controller();
