
import Repository from './newsLetters.repository';

class Service {
  
  private readonly repository;

  constructor() {
    this.repository = Repository;
  }

  public async create(data: any) {
    return await this.repository.create(data)

  }

  public async readById(id: number) {
    // Implemente a lógica para ler um registro
  }
  public async read() {
    // Implemente a lógica para ler um registro
  }

  public async update(id: number, data: any) {
    // Implemente a lógica para atualizar um registro
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Service();
  