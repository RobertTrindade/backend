// importe seu dataSourceFile
import DataSource from "@database/data-source";
import { createDto } from "./dtos/create.dto";
import { Prisma } from "@prisma/client";
import { MotoristaAceitaChamadoDto, UpdateDto } from "./dtos/update.dto";
import AppException from "@errors/app-exception";
import errorMessages from "@errors/error-messages";

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.chamados;
  }

  public findAll(
    status?: string,
    dataFinal?: string,
    dataInicio?: string,
    patio?: number
  ) {
    const where: Prisma.ChamadosWhereInput = {
      AND: [
        dataInicio && dataFinal
          ? {
              createAt: {
                gte: dataInicio,
                lte: dataFinal,
              },
            }
          : dataInicio
          ? {
              createAt: {
                gte: dataInicio,
              },
            }
          : dataFinal
          ? {
              createAt: {
                lte: dataFinal,
              },
            }
          : {},
        status
          ? {
              status: { equals: status },
            }
          : {},

        patio
          ? {
              patioId: { equals: patio },
            }
          : {},
      ],
    };

    return this.repository.findMany({
      where,
      orderBy: { createAt: "desc" },

      select: {
        id: true,
        status: true,
        urgencia: true,
        driversQuantity: true,
        vehiclesQuantity: true,
        detalhes: true,
        Motoristas: {
          select: {
            name: true,
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

  public async motoristaAceitaChamado(
    id: number,
    idMotorista: number,
    data: MotoristaAceitaChamadoDto
  ) {
    const hasAceite = await this.repository.findUnique({
      where: { id: id },
      select: {
        Aceite: true,
      },
    });

    if (hasAceite?.Aceite.length) {
      throw new AppException(400, errorMessages.ACEITE_ALREADY_EXISTS);
    }

    return await this.repository.update({
      where: { id: id },
      data: {
        status: "Aceito",
        Aceite: {
          create: {
            tempoEstimado: data.tempo_estimado,
            kmsEstimado: data.kms_estimado,
            motoristasId: idMotorista,
            lugarAceiteLatitude: data.lugarAceiteLatitude,
            lugarAceiteLongitude: data.lugarAceiteLongitude,
          },
        },
      },

      include: {
        chamador: true,
        patio: true,
        localizacao: true,
        Aceite: true,
      },
    });
  }

  public async motoristaRecusaChamado(id: number, idMotorista: number) {
    return await this.repository.update({
      where: { id: id },
      data: {
        status: "Recusado Motorista",
        Motoristas: {
          disconnect: {
            id: idMotorista,
          },
        },
      },

      include: {
        chamador: true,
        patio: true,
        localizacao: true,
        Aceite: true,
      },
    });
  }

  public async ccoRecusaChamado(id: number, idMotorista: number) {
    return await this.repository.update({
      where: { id: id },
      data: {
        status: "Recusado CCO",
        Motoristas: {
          disconnect: {
            id: idMotorista,
          },
        },
      },

      include: {
        chamador: true,
        patio: true,
        localizacao: true,
        Aceite: true,
      },
    });
  }
  public async ccoAlocaChamado(id: number, idMotorista: number) {
    return await this.repository.update({
      where: { id: id },
      data: {
        status: "Aguardando",
        Motoristas: {
          connect: {
            id: idMotorista,
          },
        },
      },

      include: {
        chamador: true,
        patio: true,
        localizacao: true,
        Aceite: true,
        Motoristas: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  public async motoristaEntreChecklist(id: number, idMotorista: number) {
    return await this.repository.update({
      where: { id: id },
      data: {
        status: "Em checklist",
      },

      include: {
        chamador: true,
        patio: true,
        localizacao: true,
        Aceite: true,
      },
    });
  }

  public async create(id: number, data: createDto) {
    return await this.repository.create({
      data: {
        equipamentoSolicitado: data.equipamentoSolicitado,
        tipoApreensao: data.tipoApreensao,
        Motoristas: {
          connect: {
            id: data.motoristaId,
          },
        },
        tipoVeiculo: data.tipoVeiculo,
        urgencia: data.urgencia,
        origem: data.origem,
        vehiclesQuantity: data.vehiclesQuantity ? +data.vehiclesQuantity : 1,
        driversQuantity: data.driversQuantity ? +data.driversQuantity : 1,
        multiple: data.multiple,
        detalhes: data.detalhes,
        localizacao: {
          create: {
            estado: data.localizacao.estado,
            uf: data.localizacao.uf,
            municipio: data.localizacao.municipio,
            distrito: data.localizacao.distrito,
            cep: data.localizacao.cep,
            latitude: data.localizacao.latitude,
            longitude: data.localizacao.longitude,
            enderecoCompleto: data.localizacao.enderecoCompleto,
          },
        },
        chamador: {
          connect: { id: id }, // Corrigindo a conexão com o chamador
        },
        patio: {
          connect: { id: data.patio },
        },
      },
      select: {
        id: true,
        status: true,
        urgencia: true,
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
            Motoristas: {
              select: {
                name: true,
              },
            },
          },
        },
        Motoristas: {
          select: {
            id: true,
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
            longitude: true,
          },
        },
        createAt: true,
      },
    });
  }

  public async readById(id: number) {
    return await this.repository.findUnique({
      where: { id: id },

      include: {
        localizacao: true,
        patio: true,

        Ncv: {
          include: {
            Acessorios: true,
            Apreensao: true,
            Avarias: true,
            Chamado: true,
            Complemento: true,
          },
        },
        Motoristas: {
          select: {
            name: true,
            id: true,
          },
        },
        fotos: true,
        Aceite: {
          include: {
            Motoristas: {
              select: {
                name: true,
                latitude: true,
                longitude: true,
                statusTrabalho: true,
              },
            },
          },
        },
      },
    });
  }

  public async read() {
    // Implemente a lógica para ler um registro
  }

  public async update(id: number, data: UpdateDto) {
    return await this.repository.update({
      where: {
        id: id,
      },

      data: {
        patio: {
          connect: {
            id: data.patio,
          },
        },
        equipamentoSolicitado: data.equipamentoSolicitado,
        tipoApreensao: data.tipoApreensao,
        origem: data.origem,
        urgencia: data.urgencia,
        tipoVeiculo: data.tipoVeiculo,

        localizacao: {
          update: {
            latitude: data.latitude,
            estado: data.estado,
            cep: data.cep,
            distrito: data.distrito,
            enderecoCompleto: data.enderecoCompleto,
            longitude: data.longitude,
            municipio: data.municipio,
            uf: data.uf,
          },
        },
      },
      include: {
        localizacao: true,
      },
    });
  }

  public async changeStatus(id: number, status: string) {
    return await this.repository.update({
      where: {
        id: id,
      },

      data: {
        status: status,
      },
      include: {
        localizacao: true,
      },
    });
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Repository();
