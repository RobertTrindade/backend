

import { Request, Response } from 'express';
import Service from './relatorios.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { RequestQueryDto } from '@dtos/request-query.dto';

class Controller {

  @TryCatch()
  public async fechamentoMotorista(req: Request, res: Response) {
    const { dataInicio, dataFinal, motorista } = req.query as RequestQueryDto;

    const result = await Service.fechamentoMotorista(dataInicio, dataFinal, motorista );
    res.status(200).json(result);
  }
}

export default new Controller();

 