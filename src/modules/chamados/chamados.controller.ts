import { Request, Response } from "express";
import Service from "./chamados.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { createDto } from "./dtos/create.dto";
import { RequestQueryDto } from "@dtos/request-query.dto";
import { MotoristaAceitaChamadoDto, UpdateDto } from "./dtos/update.dto";
class Controller {
  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(+req.auth.id, req.body as createDto);
    res.status(200).json(result);
  }

  @TryCatch()
  public async findAll(req: Request, res: Response) {
    const { status, dataFinal, dataInicio, patio } =
      req.query as RequestQueryDto;
    const result = await Service.findAll(
      status,
      dataFinal,
      dataInicio,
      +patio!
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async readById(req: Request, res: Response) {
    const result = await Service.readById(+req.params.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async motoristaAceitaChamado(req: Request, res: Response) {
    const result = await Service.motoristaAceitaChamado(
      +req.params.id,
      +req.auth.id,
      req.body as MotoristaAceitaChamadoDto
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async motoristaRecusaChamado(req: Request, res: Response) {
    const result = await Service.motoristaRecusaChamado(
      +req.params.id,
      req.auth.id
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async ccoRecusaChamado(req: Request, res: Response) {
    const result = await Service.ccoRecusaChamado(
      +req.params.id,
      +req.body.idMotorista
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async ccoAlocaChamado(req: Request, res: Response) {
    const result = await Service.ccoAlocaChamado(
      +req.params.id,
      +req.body.idMotorista
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async motoristaEntreChecklist(req: Request, res: Response) {
    const result = await Service.motoristaEntreChecklist(
      +req.params.id,
      +req.auth.id
    );

    res.status(200).json(result);
  }

  @TryCatch()
  public async delete(req: Request, res: Response) {
    const result = await Service.delete(req.body);
    res.status(200).json(result);
  }
  @TryCatch()
  public async update(req: Request, res: Response) {
    const result = await Service.update(+req.params.id, req.body as UpdateDto);
    res.status(200).json(result);
  }
}

export default new Controller();
