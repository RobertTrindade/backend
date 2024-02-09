import Repository from "./patios.repository";

class Service {
  private readonly repository;

  constructor() {
    this.repository = Repository;
  }

  public async create(data: any) {
    return await this.repository.create(data);
  }

  public async readById(id: number) {
    return await this.repository.readId(id);
  }
  public async read() {
    return await this.repository.read();
  }

  public async update(id: number, data: any) {
    return await this.repository.update(id, data);
  }

  public async findByName(name: string) {
    return await this.repository.findByName(name);
  }
}

export default new Service();
