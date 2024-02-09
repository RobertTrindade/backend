import Repository from "./usuarios.repository";

import AppException from "@errors/app-exception";
import ErrorMessages from "@errors/error-messages";
import PasswordHelper from "@helpers/password.helper";

import AdminPermissionService from "../usuarios-permission/usuarios-permission.service";
import MailService from "../mail/mail.service";

import { AccountStatus } from "@prisma/client";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { UpdateAdminDto, UpdateMyselfDto } from "./dtos/update-admin.dto";
import { addPatioDto } from "./dtos/patio.dto";

class Service {
  public async findAll(
    dataFinal?: string,
    dataInicio?: string,
    status?: AccountStatus
  ) {
    return await Repository.findAll(
      dataFinal,
      dataInicio,
      status as AccountStatus
    );
  }

  public async findOne(id: number) {
    const admin = await Repository.findOne(id);

    if (!admin) {
      throw new AppException(404, ErrorMessages.ADMIN_NOT_FOUND);
    }
    return admin;
  }

  public async createOne(data: CreateAdminDto) {
    // check if there's an admin account with data provided.
    await this.checkUniqueFields(data.email);

    // check if permissions exists.
    await AdminPermissionService.checkIfPermissionsExists(data.permissions!);

    // generate random password.
    const password = PasswordHelper.generate();

    // register new admin user and send an email containing the random password.
    const newAdmin = await Repository.createOne(
      data,
      PasswordHelper.hash(password),
      data.permissions!
    );
    await MailService.sendNewAdminAccountEmail(newAdmin.email, newAdmin.name, {
      password,
    });
    return newAdmin;
  }

  public async updateOne(id: number, data: UpdateAdminDto) {
    // check if admin exists.
    const admin = await this.findOne(id);

    // check if there's an admin account with data provided (excluding the data from the admin that will be updated).
    await this.checkUniqueFieldsExcludingMyself(id, data.email);

    // update admin user.
    return await Repository.updateOne(admin.id, data);
  }

  public async updateMyself(id: number, data: UpdateMyselfDto) {
    // check if admin exists.
    const admin = await this.findOne(id);

    data.password = PasswordHelper.hash(data.password!);
    // update admin user.
    return await Repository.updateMyself(admin.id, data);
  }

  public async updateStatus(id: number, status: AccountStatus) {
    const admin = await this.findOne(id);

    return await Repository.updateStatus(admin.id, status);
  }

  public async deleteOne(id: number) {
    const admin = await this.findOne(id);

    return await Repository.deleteOne(admin.id);
  }

  private async checkUniqueFields(email: string) {
    const account = await Repository.findByUniqueFields(email);
    if (account) {
      throw new AppException(409, ErrorMessages.ACCOUNT_ALREADY_EXISTS);
    }
  }

  private async checkUniqueFieldsExcludingMyself(id: number, email: string) {
    const account = await Repository.findByUniqueFields(email);
    if (account && account.id !== id) {
      throw new AppException(409, ErrorMessages.ACCOUNT_ALREADY_EXISTS);
    }
  }

  public async addPatio(id: number, body: addPatioDto) {
    return await Repository.addPatio(id, body);
  }
  public async removePatio(id: number, body: addPatioDto) {
    return await Repository.removePatio(id, body);
  }

  public async removePermission(id: number, body: addPatioDto) {
    return await Repository.removePermission(id, body);
  }
  public async addPermission(id: number, body: addPatioDto) {
    return await Repository.addPermission(id, body);
  }
}

export default new Service();
