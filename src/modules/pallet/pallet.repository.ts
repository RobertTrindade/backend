
  // importe seu dataSourceFile
import DataSource from '@database/data-source';

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.pallet;
  }


  public async read() {
    return await this.repository.findFirst()
  }

}

export default new Repository();

  