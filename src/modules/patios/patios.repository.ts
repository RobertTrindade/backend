// importe seu dataSourceFile
import DataSource from "@database/data-source";
import { createDto } from "./dtos/create.dto";
import AppException from "@errors/app-exception";
import errorMessages from "@errors/error-messages";

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.patios;
  }

  public async create({
    nome,
    responsavel,
    telefone,
    observacao,
    email,
    bairro,
    cep,
    cidade,
    estado,
    latitude,
    longitude,
    documentos,
    endereco,
  }: createDto) {
    const existsEqual = await this.findByName(nome);

    if(existsEqual){
      throw new AppException(403, errorMessages.PATIO_ALREADY_EXISTS);

    }

    return await this.repository.create({
      data: {
        nome,
        responsavel,
        telefone,
        observacao,
        email,
        bairro,
        cep,
        cidade,
        estado,
        latitude,
        longitude,
        endereco,
        documentos: {
          createMany: {
            data: documentos.map((item) => item),
          },
        },
      },
    });
  }

  public async read() {
    return await this.repository.findMany({
      where: {
        ativo: true,
      },
      include: {
        documentos: true,
      },
    });
  }

  public async readId(id: number) {
    return await this.repository.findUnique({
      where: {
        id: id,
      },
      include: {
        documentos: true,
      },
    });
  }

  public async update(id: number, data: any) {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }

  public async findByName(name: string) {
    return this.repository.findFirst({
      where: {
        nome: name,
      },
    });
  }
}

export default new Repository();
