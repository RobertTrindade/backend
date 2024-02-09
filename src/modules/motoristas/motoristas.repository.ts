// importe seu dataSourceFile
import DataSource from "@database/data-source";
import {
  UpdateDto,
  UpdateDtoStatus,
  UpdateDtoWorkingStatus,
} from "./dtos/update.dto";
import { AccountStatus, Prisma } from "@prisma/client";

class Repository {
  private readonly repository;
  private readonly repositoryChamado;

  constructor() {
    this.repository = DataSource.motoristas;
    this.repositoryChamado = DataSource.chamados;
  }

  public findAll(
    dataFinal?: string,
    dataInicio?: string,
    status?: AccountStatus
  ) {
    const where: Prisma.MotoristasWhereInput = {
      AND: [
        dataInicio && dataFinal
          ? {
              createdAt: {
                gte: new Date(dataInicio),
                lte: new Date(dataFinal),
              },
            }
          : {},
        status
          ? {
              status: { equals: status },
            }
          : {},
      ],
    };

    return this.repository.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        name: true,
        id: true,
        celular: true,
        email: true,
        status: true,
        createdAt: true,
        xp: true,
        statusTrabalho: true,

        Cnh: {
          select: {
            cnh: true,
          },
        },
      },
    });
  }

  public readFromChamados(status?: AccountStatus) {
    const where: Prisma.MotoristasWhereInput = {
      AND: [
        status
          ? {
              status: { equals: status },
            }
          : {},
      ],
    };

    return this.repository.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        name: true,
        id: true,
        status: true,
        xp: true,
        statusTrabalho: true,
        imageUrl: true,
      },
    });
  }

  public async buscaChamadosDirecionado(id: number) {
    return await this.repositoryChamado.findMany({
      where: {
        motoristasId: id,
        status:"Aguardando"
      },
      orderBy: { createAt: "desc" },

      select: {
        id: true,
        status: true,
        urgencia: true,
        driversQuantity: true,
        vehiclesQuantity: true,
        detalhes: true,
        Ncv: {
          select: {
            id: true,
          },
        },
        chamador: {
          select: {
            name: true,
          },
        },
        Aceite: {
          select: {
            tempoEstimado: true,
            kmsEstimado: true,
            aceiteHora: true,
            finalizacaoHora: true,
            Motoristas: {
              select: {
                name: true,
              },
            },
          },
        },
        patio: {
          select: {
            nome: true,
          },
        },
        localizacao: {
          select: {
            enderecoCompleto: true,
            municipio: true,
            latitude: true,
            distrito: true,
            estado: true,
            longitude: true,
            uf: true,
            cep: true,
          },
        },
        createAt: true,
      },
    });
  }

  public async buscaMeusChamados(id: number) {
    return await this.repositoryChamado.findMany({
      where: {
        Aceite: {
          some: {
            motoristasId: id,
          },
        },
      },
      select: {
        id: true,
        status: true,
        urgencia: true,
        driversQuantity: true,
        vehiclesQuantity: true,
        detalhes: true,
        Ncv: {
          select: {
            id: true,
          },
        },
        chamador: {
          select: {
            name: true,
          },
        },
        Aceite: {
          select: {
            tempoEstimado: true,
            kmsEstimado: true,
            aceiteHora: true,
            finalizacaoHora: true,
            Motoristas: {
              select: {
                name: true,
              },
            },
          },
        },
        patio: {
          select: {
            nome: true,
          },
        },
        localizacao: {
          select: {
            enderecoCompleto: true,
            municipio: true,
            latitude: true,
            distrito: true,
            estado: true,
            longitude: true,
            uf: true,
            cep: true,
          },
        },
        createAt: true,
      },
    });
  }

  public async readById(id: number) {
    return await this.repository.findUnique({
      where: {
        id,
      },
      include: {
        Cnh: true,
        MotoristasEndereco: true,
        Reboques: true,
        EmpresaReboque: true,
      },
    });
  }

  public async update(id: number, data: UpdateDto) {
    return await this.repository.update({
      where: { id },
      data: {
        ...data,
        ...(data.birthdate && {
          birthdate: new Date(data?.birthdate as string),
        }),
      },
    });
  }

  public async changeWorkingStatus(id: number, data: UpdateDtoWorkingStatus) {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        statusTrabalho: data.status,
      },
    });
  }

  public async changeStatus(id: number, data: UpdateDtoStatus) {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        status: data.status,
      },
    });
  }
}

export default new Repository();
