// importe seu dataSourceFile
import DataSource from "@database/data-source";
import { createDto } from "./dtos/create.dto";
import { UpdateDto } from "./dtos/update.dto";

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.tipoVeiculo;
  }

  public async create(data: createDto) {
    return await this.repository.create({
      data: {
        descricao: data.descricao,
        ativo: true,
      },
    });
  }

  public async readById(id: number) {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  }

  public async read(ativo: boolean) {
    return await this.repository.findMany({
      where: {
        AND: [
          ativo
            ? {
                ativo: ativo,
              }
            : {},
        ],
      },
    });
  }

  public async update(id: number, data: UpdateDto) {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        descricao: data.descricao,
        ativo: data.ativo,
      },
    });
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Repository();
