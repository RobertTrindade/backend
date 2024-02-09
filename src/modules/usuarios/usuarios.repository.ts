import DataSource from "@database/data-source";

import { Prisma, AccountStatus } from "@prisma/client";
import { AdminWithPermissionsDto } from "./dtos/admin.dto";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { UpdateAdminDto, UpdateMyselfDto } from "./dtos/update-admin.dto";
import { addPatioDto } from "./dtos/patio.dto";

class Repository {
  constructor(private readonly repository = DataSource.usuarios) {}

  public findAll(
    dataFinal?: string,
    dataInicio?: string,
    status?: AccountStatus
  ) {
    const where: Prisma.UsuariosWhereInput = {
      AND: [
        dataInicio && dataFinal
          ? {
              createdAt: {
                gte: new Date(dataInicio),
                lte: new Date(dataFinal),
              },
            }
          : dataInicio
          ? {
              createdAt: {
                gte: new Date(dataInicio),
              },
            }
          : dataFinal
          ? {
              createdAt: {
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
      include: {
        Cargo: true,
      },
    });
  }

  public findAllNoPagination(status?: AccountStatus, search?: string) {
    const where: Prisma.UsuariosWhereInput = {
      AND: [
        { status },
        {
          OR: [{ name: { contains: search } }, { email: { contains: search } }],
        },
      ],
    };

    return this.repository.findMany({
      where,
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      include: {
        Permissions: true,
        Endereco: true,
        patios: {
          select: {
            nome: true,
            id: true,
          },
        },
        Cargo: true,
      },
    });
  }

  public findByUniqueFields(email: string) {
    return this.repository.findFirst({
      where: {
        OR: [{ email }],
      },
    });
  }

  public createOne(
    {
      name,
      email,
      emailPessoal,
      imageUrl,
      pdfContrato,
      cargosId,
      patios,
      celular,
      role,
      birthdate,
      Endereco,
      cpf,
    }: CreateAdminDto,
    password: string,
    permissions: Prisma.PermissionWhereUniqueInput[]
  ) {
    return this.repository.create({
      data: {
        Permissions: {
          connect: permissions,
        },

        Cargo: {
          connect: {
            id: cargosId,
          },
        },
        patios: {
          connect: patios!.map((item) => ({ id: item })),
        },
        name,
        password,
        email,
        emailPessoal,
        imageUrl,
        pdfContrato,
        role,
        celular,
        birthdate,
        Endereco: {
          create: {
            ...Endereco!,
          },
        },
        cpf,
      },
      select: AdminWithPermissionsDto,
    });
  }

  public async updateOne(
    id: number,
    {
      name,
      email,
      emailPessoal,
      imageUrl,
      cargosId,
      celular,
      birthdate,
      Endereco,
      cpf,
      role,
      status,
      pdfContrato,
    }: UpdateAdminDto
  ) {
    return await this.repository.update({
      where: { id },
      data: {
        Cargo: {
          connect: {
            id: cargosId,
          },
        },
        status,
        pdfContrato,
        name,
        email,
        role,
        emailPessoal,
        imageUrl,
        celular,
        birthdate,
        Endereco: {
          create: {
            ...Endereco!,
          },
        },
        cpf,
      },
      select: AdminWithPermissionsDto,
    });
  }

  public async updateMyself(
    id: number,
    { name, imageUrl, celular, birthdate, password }: UpdateMyselfDto
  ) {
    return await this.repository.update({
      where: { id },
      data: {
        name,
        imageUrl,
        celular,
        birthdate,
        password
      },
      select: AdminWithPermissionsDto,
    });
  }

  public updateStatus(id: number, status: AccountStatus) {
    return this.repository.update({
      where: { id },
      data: { status },
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
    });
  }

  public async addPatio(id: number, body: addPatioDto) {
    return await this.repository.update({
      where: {
        id: id,
      },
      data: {
        patios: {
          connect: {
            id: +body.id,
          },
        },
      },
      select: {
        patios: {
          select: {
            nome: true,
            id: true,
          },
        },
      },
    });
  }

  public async removePatio(id: number, body: addPatioDto) {
    return await this.repository.update({
      where: {
        id: id,
      },
      data: {
        patios: {
          disconnect: {
            id: +body.id,
          },
        },
      },
      select: {
        patios: {
          select: {
            nome: true,
            id: true,
          },
        },
      },
    });
  }

  public async removePermission(id: number, body: addPatioDto) {
    return await this.repository.update({
      where: {
        id: id,
      },
      data: {
        Permissions: {
          disconnect: {
            id: +body.id,
          },
        },
      },
      select: {
        Permissions: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });
  }
  public async addPermission(id: number, body: addPatioDto) {
    return await this.repository.update({
      where: {
        id: id,
      },
      data: {
        Permissions: {
          connect: {
            id: +body.id,
          },
        },
      },
      select: {
        Permissions: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });
  }
}

export default new Repository();
