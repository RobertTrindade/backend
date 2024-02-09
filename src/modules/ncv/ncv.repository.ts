// importe seu dataSourceFile
import DataSource from "@database/data-source";
import { Prisma } from "@prisma/client";
import chamadosRepository from "modules/chamados/chamados.repository";
import {
  createDto,
  createDtoDocument,
  createDtoExtras,
} from "./dtos/create.dto";
import { io } from "server";
import AppException from "@errors/app-exception";
import ErrorMessages from "@errors/error-messages";

class Repository {
  private readonly repository;
  private readonly repositoryAceite;
  private readonly repositoryNcvDocuments;

  constructor() {
    this.repository = DataSource.ncv;
    this.repositoryAceite = DataSource.chamadoAceite;
    this.repositoryNcvDocuments = DataSource.ncvDocumentos;
  }

  public async create(
    id: number,
    { data, avarias, apreensoes, acessorios, complemento }: createDto
  ) {
    const {
      cor,
      marca,
      modelo,
      placa,
      ano,
      municipio,
      uf,
      km,
      chassi,
      motor,
      kmFotos,
      combustivelFotos,
      chamadoId,
      shouldFinishChamado = true,
    } = data;

    const {
      documentos_foto,
      lateral_direita_foto,
      lateral_esquerda_foto,
      traseira,
      dianteira,
      teto,
      outros,
      avarias_detailes,
    } = avarias;

    const {
      chaves,
      blitz,
      guinchoColetivo,
      kmPercorrido,
      adulterado,
      crimesTransito,
      emTela,
      foraCirculacao,
      judicial,
      leasing,
      motoQueixa,
      pedirBaixa,
      policiaCivil,
      traficoDrogas,
      rouboFurto,
      semDocumentosCrv,
      infracaoTransito,
      motivoApreensao,
    } = apreensoes;

    const {
      arCondicionado,
      vidroEletrico,
      cambioManual,
      cambioAutomatico,
      radioCd,
      pneuStep,
      rodaComum,
      rodaEspecial,
      calotas,
      antena,
      documento,
      carroFuncionando,
    } = acessorios;
    const { pintura, tapecaria, pneus } = complemento;

    const info = await this.repository.create({
      data: {
        cor,
        marca,
        modelo,
        placa,
        ano,
        municipio,
        uf,
        km,
        chassi,
        motor,
        kmFotos,
        combustivelFotos,

        Chamado: {
          connect: {
            id: +chamadoId, // Substitua pelo ID real do Chamado
          },
        },
        Motoristas: {
          connect: {
            id: +id, // Substitua pelo ID real do Chamado
          },
        },

        Avarias: {
          createMany: {
            data: [
              {
                type: "Documentos",
                fotos: documentos_foto,
              },
              {
                type: "Lateral Direita",
                fotos: lateral_direita_foto,
              },
              {
                type: "Lateral Esquerda",
                fotos: lateral_esquerda_foto,
              },
              {
                type: "Traseira",
                fotos: traseira,
              },
              {
                type: "Dianteira",
                fotos: dianteira,
              },

              {
                type: "Teto",
                fotos: teto,
              },
              {
                type: "Outros",
                fotos: outros,
              },
            ],
          },
        },

        avariasDescription: avarias_detailes,

        Apreensao: {
          create: {
            chaves,
            blitz,
            guinchoColetivo,
            kmPercorrido,
            adulterado,
            crimesTransito,
            emTela,
            foraCirculacao,
            judicial,
            leasing,
            motoQueixa,
            pedirBaixa,
            policiaCivil,
            traficoDrogas,
            rouboFurto,
            semDocumentosCrv,
            infracaoTransito,
            motivoApreensao,
          },
        },
        Acessorios: {
          create: {
            arCondicionado,
            vidroEletrico,
            cambioManual,
            cambioAutomatico,
            radioCd,
            pneuStep,
            rodaComum,
            rodaEspecial,
            calotas,
            antena,
            documento,
            carroFuncionando,
          },
        },
        Complemento: {
          create: {
            pintura,
            tapecaria,
            pneus,
          },
        },
      },
    });

    if (shouldFinishChamado) {
      const chamado = await chamadosRepository.changeStatus(
        +chamadoId,
        "Concluido"
      );

      await this.repositoryAceite.updateMany({
        where: {
          chamadosId: +chamadoId,
        },
        data: {
          finalizacaoHora: new Date(),
        },
      });

      io.emit("update-chamado", chamado);
    }

    return info;
  }

  public async findById(id: number) {
    return await this.repository.findFirst({
      where: {
        id,
      },

      include: {
        Chamado: {
          include: {
            patio: true,
            localizacao: true,
            chamador: {
              select: {
                name: true,
              },
            },
            Aceite: {
              select: {
                aceiteHora: true,
                finalizacaoHora: true,
                Motoristas: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        Documentos: true,
        Apreensao: true,
        Extras: true,
        Complemento: true,
        Acessorios: true,
        Avarias: true,
        Motoristas: {
          include: {
            Reboques: true,
          },
        },
      },
    });
  }

  public findAll(
    ncv?: string,
    placa?: string,
    status?: any,
    dataFinal?: string,
    dataInicio?: string
  ) {
    const where: Prisma.NcvWhereInput = {
      AND: [
        dataInicio && dataFinal
          ? {
              created_at: {
                gte: new Date(dataInicio),
                lte: new Date(dataFinal),
              },
            }
          : dataInicio
          ? {
              created_at: {
                gte: new Date(dataInicio),
              },
            }
          : dataFinal
          ? {
              created_at: {
                lte: new Date(dataFinal),
              },
            }
          : {},
        ncv
          ? {
              id: { equals: Number(ncv) },
            }
          : {},
        placa
          ? {
              placa: { equals: placa },
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
      orderBy: { created_at: "desc" },
      include: {
        Chamado: {
          include: {
            patio: true,
          },
        },
      },
    });
  }

  public async createExtra(id: number, data: createDtoExtras) {
    return await DataSource.ncvExtras.create({
      data: {
        ncvId: id,
        ...data,
      },
    });
  }

  /// NCV DOCUMENTOS
  public async createDocument(id: number, body: createDtoDocument) {
    const ncv = await this.findById(id);
    if (!ncv) {
      throw new AppException(404, ErrorMessages.NCV_NOT_EXISTS);
    }

    return await this.repositoryNcvDocuments.create({
      data: {
        ...body,
        ncvId: id,
      },
    });
  }
  public async findAllDocument(id: number) {
    return await this.repositoryNcvDocuments.findMany({
      where: {
        ncvId: id,
      },
    });
  }

  public async update(id: number, body: any) {
    return this.repository.update({
      where: {
        id,
      },
      data: {
        Apreensao: {
          update: {
            motivoApreensao: body?.Apreensao?.motivoApreensao,
          },
        },
      },
    });
  }
}

export default new Repository();
