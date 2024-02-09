import { createDto } from "./dtos/create.dto";
import { UpdateDto } from "./dtos/update.dto";
import Repository from "./tipoVeiculos.repository";

class Service {
  private readonly repository;

  constructor() {
    this.repository = Repository;
  }

  public async create(data: createDto) {
    return await this.repository.create(data);
  }

  public async readById(id: number) {
    return await this.repository.readById(id);
  }
  public async read(ativo:boolean) {
    return await this.repository.read(ativo);
  }

  public async update(id: number, data: UpdateDto) {
    return await this.repository.update(id, data);
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Service();
