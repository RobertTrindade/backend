import { RegisterDriverDto } from "./dtos/registerDriver.dto";
import AdminService from "./services/usuarios/usuarios.service";
import DriverService from "./services/drivers/drivers.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { Request, Response } from "express";

class Controller {
  @TryCatch()
  public async loginAdm(req: Request, res: Response) {
    const result = await AdminService.loginAdm(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async forgotPasswordAdm(req: Request, res: Response) {
    const result = await AdminService.forgotPasswordAdm(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async resetPasswordAdm(req: Request, res: Response) {
    const result = await AdminService.resetPasswordAdm(req.body);
    res.status(200).json(result);
  }



  
  /// DriverService

  @TryCatch()
  public async loginUser(req: Request, res: Response) {
    const result = await DriverService.LoginDriver(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async registerDriver(req: Request, res: Response) {
    const result = await DriverService.registerDriver(
      req.body as RegisterDriverDto
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async forgotPasswordDriver(req: Request, res: Response) {
    const result = await DriverService.forgotPasswordDriver(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async resetPasswordUser(req: Request, res: Response) {
    const result = await DriverService.resetPasswordDriver(req.body);
    res.status(200).json(result);
  }
}

export default new Controller();
