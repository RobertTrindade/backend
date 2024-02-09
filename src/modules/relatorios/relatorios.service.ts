import Repository from "./relatorios.repository";

class Service {
  private readonly repository;

  constructor() {
    this.repository = Repository;
  }

  public async fechamentoMotorista(
    dataFinal?: string,
    dataInicio?: string,
    motorista?: string
  ) {
    return await this.repository.fechamentoMotorista(
      dataFinal,
      dataInicio,
      motorista
    );
  }
}

export default new Service();
