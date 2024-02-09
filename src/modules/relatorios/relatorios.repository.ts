// importe seu dataSourceFile
import DataSource from "@database/data-source";
import { Prisma } from "@prisma/client";

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource;
  }

  public fechamentoMotorista(
    dataFinal?: string,
    dataInicio?: string,
    motorista?: string
  ) {
    const where: Prisma.NcvWhereInput = {
      AND: [
        dataInicio && dataFinal
          ? {
              created_at: {
                gte: dataInicio,
                lte: dataFinal,
              },
            }
          : dataInicio
          ? {
              created_at: {
                gte: dataInicio,
              },
            }
          : dataFinal
          ? {
              created_at: {
                lte: dataFinal,
              },
            }
          : {},
        motorista
          ? {
              Motoristas: { name: motorista },
            }
          : {},
      ],
    };

    return this.repository.ncv.findMany({
      where,
      orderBy: { created_at: "desc" },
      include:{
        Chamado:true
      }
    });
  }
}

export default new Repository();
