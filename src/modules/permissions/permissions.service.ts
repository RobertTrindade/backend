import { createDto } from "./dtos/create.dto";
import Repository from "./permissions.repository";

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
  public async read() {
    return await this.repository.read();
  }
}

export default new Service();
