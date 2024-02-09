import DataSource from "@database/data-source";
import { RegisterDriverDto } from "modules/auth/dtos/registerDriver.dto";
import PasswordHelper from "@helpers/password.helper";

class Repository {
  constructor(private readonly repository = DataSource.motoristas) {}

  public async findByCredential(credential: string) {
    return this.repository.findFirst({
      where: {
        email: credential,
      },
    });
  }

  public async registerDriver(data: RegisterDriverDto) {
 
    return await this.repository.create({
      data: {
        name: data.name,
        email: data.email,
        celular: data.celular,
        rg: data.rg,
        latitude: data.latitude,
        longitude: data.longitude,
        imageUrl: data.imageUrl,
        cpf: data.cpf,
        birthdate: new Date(data.birthdate),
        password: PasswordHelper.hash(data.password),
        representaEmpresa: data.representaEmpresa,
        EmpresaReboque: {
          create: {
            nome: data.empresa.nome_empresa,
            cnpj: data.empresa.cnpj,
          },
        },
        Reboques: {
          create: {
            placa: data.reboque.placa,
            crlvUrl: data.reboque.crlvUrl,
          },
        },
        Cnh: {
          create: {
            cnh: data.cnh.cnh,
            cnhCategoria: data.cnh.cnh_categoria,
            cnhValidade: new Date(data.cnh.cnh_validade),
            cnhPdf: data.cnh.cnh_pdf,
          },
        },
        MotoristasEndereco: {
          create: {
            endereco: data.endereco.endereco,
            bairro: data.endereco.bairro,
            cidade: data.endereco.cidade,
            cep: data.endereco.cep,
            uf: data.endereco.uf,
          },
        },
      },
    });
  }

  public storeCode(id: number, code: string, codeExpiresIn: Date) {
    return this.repository.update({
      where: { id },
      data: {
        code,
        codeExpiresIn,
      },
    });
  }

  public changePassword(id: number, password: string) {
    return this.repository.update({
      where: { id },
      data: {
        code: null,
        codeExpiresIn: null,
        password,
      },
    });
  }
}

export default new Repository();
