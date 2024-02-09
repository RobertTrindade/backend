import Repository from "./cargos.repository";

class Service {
  private readonly repository;

  constructor() {
    this.repository = Repository;
  }

  public async read() {
    return this.repository.read();
  }
}

export default new Service();
