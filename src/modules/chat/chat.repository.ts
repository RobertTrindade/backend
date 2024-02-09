// importe seu dataSourceFile
import DataSource from "@database/data-source";
import { createDto } from "./dtos/create.dto";

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource;
  }

  public async create(id: number, groupId: number, data: createDto) {
    return await this.repository.message.create({
      data: {
        senderId: id,
        groupId: groupId,
        text: data.text,
      },
      include: {
        sender: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  public async createPrivateMessage(
    id: number,
    groupId: number,
    data: createDto
  ) {
    return await this.repository.message.create({
      data: {
        senderId: id,
        receiverId: groupId,
        text: data.text,
      },
    });
  }

  public async read() {
    // Implemente a lógica para ler um registro
  }

  public async readById(id: number) {
    return await this.repository.message.findMany({
      where: {
        groupId: id,
      },
      include: {
        sender: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  public async getGroups() {
    return await this.repository.groups.findMany();
  }

  public async update(id: number, data: any) {
    // Implemente a lógica para atualizar um registro
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Repository();
