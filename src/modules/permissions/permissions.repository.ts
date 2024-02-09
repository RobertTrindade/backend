// importe seu dataSourceFile
import DataSource from "@database/data-source";
import { createDto } from "./dtos/create.dto";

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.permission;
  }

  public async create(data: createDto) {
    return await this.repository.create({
      data: {
        title: data.title,
      },
    });
  }

  public async read() {
    return await this.repository.findMany();
  }
  public async readById(id: number) {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new Repository();
