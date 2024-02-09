import Repository from "./chamados.repository";
import { createDto } from "./dtos/create.dto";
import { io } from "server";
import { MotoristaAceitaChamadoDto, UpdateDto } from "./dtos/update.dto";
import motoristasRepository from "modules/motoristas/motoristas.repository";
import AppException from "@errors/app-exception";
import errorMessages from "@errors/error-messages";
class Service {
  private readonly repository;

  constructor() {
    this.repository = Repository;
  }
  public async findAll(
    status?: string,
    dataFinal?: string,
    dataInicio?: string,
    patio?: number
  ) {
    return await Repository.findAll(status, dataFinal, dataInicio, patio);
  }

  public async create(id: number, data: createDto) {
    const driver = await motoristasRepository.readById(data.motoristaId);
    if (!driver) {
      throw new AppException(400, errorMessages.DRIVER_NOT_FOUND);
    }

    const chamado = await this.repository.create(id, data);
    io.emit("new-chamado", chamado);
    return chamado;
  }

  public async readById(id: number) {
    return await this.repository.readById(id);
  }
  public async read() {
    // Implemente a lógica para ler um registro
  }

  public async update(id: number, data: UpdateDto) {
    return await this.repository.update(id, data);
  }

  public async motoristaEntreChecklist(id: number, idMotorista: number) {
    const chamado = await this.repository.motoristaEntreChecklist(
      id,
      idMotorista
    );
    io.emit("new-chamado", chamado);
    return chamado;
  }

  public async motoristaAceitaChamado(
    id: number,
    idMotorista: number,
    data: MotoristaAceitaChamadoDto
  ) {
    const chamado = await this.repository.motoristaAceitaChamado(
      id,
      idMotorista,
      data
    );

    io.emit("update-chamado", chamado);
    return chamado;
  }

  public async motoristaRecusaChamado(id: number,idMotorista: number) {
    const chamado = await this.repository.motoristaRecusaChamado(id,idMotorista);

    io.emit("update-chamado", chamado);
    return chamado;
  }

  public async ccoRecusaChamado(id: number,idMotorista: number) {
    const chamado = await this.repository.ccoRecusaChamado(id,idMotorista);

    io.emit("update-chamado", chamado);
    return chamado;
  }
  public async ccoAlocaChamado(id: number,idMotorista: number) {
    const chamado = await this.repository.ccoAlocaChamado(id,idMotorista);

    io.emit("new-chamado", chamado);
    return chamado;
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Service();
