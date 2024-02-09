// importe seu dataSourceFile
import DataSource from "@database/data-source";

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.cargos;
  }

  public async read() {
    return this.repository.findMany({});
  }
}

export default new Repository();
