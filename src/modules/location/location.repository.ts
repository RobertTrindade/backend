// importe seu dataSourceFile
import DataSource from "@database/data-source";
import { UpdateDto } from "./dtos/update.dto";

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.motoristas;
  }

  public async create(data: any) {
    // Implemente a lógica criar ler um registro
  }

  public async read() {
    return await this.repository.findMany({
      where: {
        status: "ativo",
      },
      select: {
        latitude: true,
        longitude: true,
        name: true,
        statusTrabalho: true,
        xp: true,
        imageUrl: true,
        id:true
      },
    });
  }

  public async update(id: number, data: UpdateDto) {
    return await this.repository.update({
      where: { id },
      data: {
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
      },
    });
    
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Repository();
