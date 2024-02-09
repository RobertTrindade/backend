import Repository from "./chat.repository";
import { createDto } from "./dtos/create.dto";
import { io } from "server";

class Service {
  private readonly repository;

  constructor() {
    this.repository = Repository;
  }

  public async create(id: number, groupId: number, data: createDto) {
    const result =  await this.repository.create(id,groupId, data);

    if (result) {
       io.emit("new-message", {
        ...result,
        isMine:id === result.senderId,
      });
    }
    return result
  }

  public async readById(id: number) {
    return await this.repository.readById(id);
  }
  public async read() {
    // Implemente a lógica para ler um registro
  }
  public async getGroups() {
    return await this.repository.getGroups();
  }

  public async update(id: number, data: any) {
    // Implemente a lógica para atualizar um registro
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Service();
