import { isCloser } from "utils/isCloser";
import { io } from "../../server";
import { distanceCalculateDto } from "./dtos/create.dto";
import { UpdateDto } from "./dtos/update.dto";
import Repository from "./location.repository";

class Service {
  private readonly repository;

  constructor() {
    this.repository = Repository;
  }

  public async create(data: any) {
    // Implemente a lógica para create um registro
  }

  public async readById(id: number) {
    // Implemente a lógica para ler um registro
  }
  public async read() {
    return await this.repository.read();
  }

  public distanceCalculate(data: distanceCalculateDto) {
    const { iscloser } = isCloser(
      +data.latitude1!,
      +data.longitude1!,
      +data.latitude2,
      +data.longitude2,
      new Date()
    );
    return iscloser;
  }

  public async update(id: number, data: UpdateDto) {
    io.emit("updated", {
      id,
      latitude: data.latitude,
      longitude: data.longitude,
    });
    return "atualizado";
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Service();
