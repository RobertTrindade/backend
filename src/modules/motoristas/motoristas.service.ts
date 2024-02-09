import {
  UpdateDto,
  UpdateDtoStatus,
  UpdateDtoWorkingStatus,
} from "./dtos/update.dto";
import Repository from "./motoristas.repository";
import MailService from "../mail/mail.service";
import { AccountStatus } from "@prisma/client";

class Service {
  private readonly repository;

  constructor() {
    this.repository = Repository;
  }

  public async create(data: any) {
    // Implemente a lógica para create um registro
  }

  public async buscaMeusChamados(id: number) {
    return await this.repository.buscaMeusChamados(id);
  }

  public async buscaChamadosDirecionado(id: number) {
    return await this.repository.buscaChamadosDirecionado(id);
  }

  public async readById(id: number) {
    return await this.repository.readById(id);
  }

  public async findAll(
    dataFinal?: string,
    dataInicio?: string,
    status?: AccountStatus
  ) {
    return await Repository.findAll(dataFinal, dataInicio, status);
  }

  public async findAllNoPagination() {}
  public async readFromChamados(
    dataFinal?: string,
    dataInicio?: string,
    status?: AccountStatus
  ) {
    return await Repository.readFromChamados( status);
  }

  public async update(id: number, data: UpdateDto) {
    return await this.repository.update(id, data);
  }

  public async changeWorkingStatus(id: number, data: UpdateDtoWorkingStatus) {
    return await this.repository.changeWorkingStatus(id, data);
  }

  public async changeStatus(id: number, data: UpdateDtoStatus) {
    const motoristas = await this.repository.changeStatus(id, data);
    if (motoristas) {
      if (data.status === "inativo") {
        await MailService.notAprovedDriver(motoristas.email, motoristas.name);
      }

      if (data.status === "ativo") {
        await MailService.aprovedDriver(motoristas.email, motoristas.name);
      }
    }
    return motoristas;
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Service();
