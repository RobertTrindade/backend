import Repository from "./drivers.repository";

import AppException from "@errors/app-exception";
import ErrorMessages from "@errors/error-messages";

import { AccountStatus, Motoristas } from "@prisma/client";
import { IPayloadDto } from "../../dtos/payload.dto";
import { LoginDto } from "../../dtos/login.dto";
import { ForgotPasswordDto, ResetPasswordDto } from "../../dtos/password.dto";

import CodeHelper from "@helpers/code.helper";
import JwtHelper from "@helpers/token.helper";
import PasswordHelper from "@helpers/password.helper";
import MailService from "../../../mail/mail.service";
import { RegisterDriverDto } from "modules/auth/dtos/registerDriver.dto";
import driversRepository from "../../../motoristas/motoristas.service";
class Service {
  public async LoginDriver(data: LoginDto) {
    // find user.
    const user = await this.findByCredential(data.email);

    // check if user is active.
    this.checkIfUserIsActive(user);
    // compare passwor  d.
    this.comparePasswords(data.password, user.password);

    // generate token and account object.
    const payload: IPayloadDto = {
      id: user.id,
      role: user.role,
    };

    return {
      token: JwtHelper.createToken(payload),
      account: {
        name: user.name,
        email: user.email,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        imageUrl: user.imageUrl,
        statusTrabalho: user.statusTrabalho,
        xp: user.xp,
        id: user.id,

      },
    };
  }

  public async forgotPasswordDriver(data: ForgotPasswordDto) {
    // find user.
    const user = await this.findByCredential(data.credential);

    // generate and store code.
    const { code, minutes } = await this.storeCode(user.id);

    // send an email with code.
    await MailService.sendForgotPasswordEmail(user.email, user.name, {
      code,
      minutes,
    });
    return {
      message: "Código de recuperação de senha enviado no seu email!",
      code,
      minutes,
    };
  }

  public async resetPasswordDriver(data: ResetPasswordDto) {
    // find user.
    const user = await this.findByCredentialAndCode(data.credential, data.code);

    // check code validation.
    this.checkCodeValidation(user.codeExpiresIn as Date);

    // change password.
    await Repository.changePassword(
      user.id,
      PasswordHelper.hash(data.password)
    );
    return { message: "Senha atualizada com sucesso!" };
  }

  private checkCodeValidation(codeExpiresIn: Date) {
    const isExpired = CodeHelper.isExpired(codeExpiresIn);
    if (isExpired) {
      throw new AppException(400, ErrorMessages.CODE_EXPIRED);
    }
  }

  private checkIfUserIsActive(user: Motoristas) {
    if (user.status === AccountStatus.inativo) {
      throw new AppException(403, ErrorMessages.INACTIVE);
    }
    if (user.status === AccountStatus.pendente) {
      throw new AppException(403, ErrorMessages.PENDING);
    }
  }

  private comparePasswords(password: string, hash: string) {
    const isMatch = PasswordHelper.comparePasswordAndHash(password, hash);
    if (!isMatch) {
      throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    }
  }

  private async findByCredential(credential: string) {
    const user = await Repository.findByCredential(credential);

    if (user) {
      await driversRepository.changeWorkingStatus(user.id, {
        status: "disponivel",
      });
    }
    if (!user) {
      throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    }
    return user;
  }

  private async checkIfUserExists(credential: string) {
    return await Repository.findByCredential(credential);
  }
  private async findByCredentialAndCode(credential: string, code: string) {
    const user = await this.findByCredential(credential);

    if (user.code !== code) {
      throw new AppException(404, ErrorMessages.INCORRECT_CODE_PASS);
    }
    return user;
  }

  private async storeCode(id: number) {
    const minutes = 15;
    const { code, codeExpiresIn } = CodeHelper.generate(minutes);

    await Repository.storeCode(id, code, codeExpiresIn);

    return { code, minutes };
  }

  public async registerDriver(data: RegisterDriverDto) {
    const user = await this.checkIfUserExists(data.email);

    if (user) {
      throw new AppException(400, ErrorMessages.ACCOUNT_ALREADY_EXISTS);
    }
    const newDriver = await Repository.registerDriver(data);

    if (newDriver) {
      await MailService.sendWaitingForAprovalDriver(
        newDriver.email,
        newDriver.name
      );
    }

    return newDriver;
  }
}

export default new Service();
