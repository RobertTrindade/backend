import {
  createDto,
  createDtoDocument,
  createDtoExtras,
} from "./dtos/create.dto";
import Repository from "./ncv.repository";
class Service {
  public async findAll(
    ncv?: string,
    placa?: string,
    status?: string,
    dataFinal?: string,
    dataInicio?: string
  ) {
    return await Repository.findAll(ncv, placa, status, dataFinal, dataInicio);
  }
  public async create(id: number, data: createDto) {
    return await Repository.create(id, data);
  }

  public async createExtra(id: number, data: createDtoExtras) {
    return await Repository.createExtra(id, data);
  }

  public async findById(id: number) {
    return await Repository.findById(id);
  }
  public async createDocument(id: number, body: createDtoDocument) {
    return await Repository.createDocument(id, body);
  }

  public async findAllDocument(id: number) {
    return await Repository.findAllDocument(id);
  }

  public async update(id: number, body: any) {
    return await Repository.update(id, body);
  }
}

export default new Service();
