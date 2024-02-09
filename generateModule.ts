import * as fs from "fs/promises";
import * as path from "path";

const createModule = async (moduleName: string) => {
  // altere o path onde esta seu module.
  const modulePath = path.join(__dirname, "src", "modules", moduleName);

  // Verifique se o módulo já existe
  try {
    await fs.access(modulePath);
    console.error(`O módulo "${moduleName}" já existe.`);
    return;
  } catch (error) {
    // O módulo não existe, continue com a criação
  }

  // Crie a estrutura de pastas
  await fs.mkdir(modulePath, { recursive: true });

  // Crie a pasta "dto"
  const dtoPath = path.join(modulePath, "dtos");
  await fs.mkdir(dtoPath);

  // Crie os arquivos básicos
  await fs.writeFile(
    path.join(modulePath, `${moduleName}.controller.ts`),
    generateControllerContent(moduleName)
  );
  // Crie os arquivos DTO
  await fs.writeFile(
    path.join(dtoPath, "create.dto.ts"),
    generateCreateDtoContent()
  );
  await fs.writeFile(
    path.join(dtoPath, "read.dto.ts"),
    generateReadDtoContent()
  );
  await fs.writeFile(
    path.join(dtoPath, "update.dto.ts"),
    generateUpdateDtoContent()
  );
  await fs.writeFile(
    path.join(dtoPath, "delete.dto.ts"),
    generateDeleteDtoContent()
  );

  await fs.writeFile(
    path.join(modulePath, `${moduleName}.repository.ts`),
    generateRepositoryContent()
  );

  await fs.writeFile(
    path.join(modulePath, `${moduleName}.validator.ts`),
    generateValidatorContent()
  );

  await fs.writeFile(
    path.join(modulePath, `${moduleName}.routes.ts`),
    generateRoutesContent(moduleName)
  );
  await fs.writeFile(
    path.join(modulePath, `${moduleName}.service.ts`),
    generateServiceContent(moduleName)
  );

  console.log(`Módulo "${moduleName}" criado com sucesso.`);
};

function generateControllerContent(moduleName: string) {
  return `

import { Request, Response } from 'express';
import Service from './${moduleName}.service';
import { TryCatch } from '@decorators/try-catch.decorator';

class Controller {

  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(req.body);
    res.status(200).json(result);
  }
  @TryCatch()
  public async read(req: Request, res: Response) {
    const result = await Service.read();
    res.status(200).json(result);
  }

  @TryCatch()
  public async readById(req: Request, res: Response) {
    const result = await Service.readById(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async update(req: Request, res: Response) {
    const result = await Service.update(req.params.id,req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async delete(req: Request, res: Response) {
    const result = await Service.delete(req.body);
    res.status(200).json(result);
  }
}

export default new Controller();

 `;
}

function generateRepositoryContent() {
  return `
  // importe seu dataSourceFile
import DataSource from '@database/data-source';

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource;
  }

  public async create(data: any) {
    // Implemente a lógica criar ler um registro
  }

  public async read() {
    // Implemente a lógica para ler um registro
  }

  public async update(id: number, data: any) {
    // Implemente a lógica para atualizar um registro
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Repository();

  `;
}

function generateRoutesContent(moduleName: string) {
  return `
import { Router } from 'express';
import Controller from './${moduleName}.controller';
import Validator from './${moduleName}.validator';

const router = Router();

router.route('/').post(Validator.create, Controller.create);
router.route('/:id').get(Controller.readById);
router.route('/').get(Controller.read);

router.route('/:id').put(Validator.update, Controller.update);
router.route('/:id').delete(Controller.delete);

export default router;
  `;
}

function generateServiceContent(moduleName: string) {
  return `
import Repository from './${moduleName}.repository';

class Service {
  
  private readonly repository;

  constructor() {
    this.repository = Repository;
  }

  public async create(data: any) {
    // Implemente a lógica para create um registro

  }

  public async readById(id: number) {
    // Implemente a lógica para ler um registro
  }
  public async read() {
    // Implemente a lógica para ler um registro
  }

  public async update(id: number, data: any) {
    // Implemente a lógica para atualizar um registro
  }

  public async delete(id: number) {
    // Implemente a lógica para excluir um registro
  }
}

export default new Service();
  `;
}

function generateCreateDtoContent() {
  return `
  import { z } from 'zod';

  export type createDto = z.output<typeof Create>
  export const Create = z.object({
    //defina as props de criação aqui
  });
  `;
}

function generateReadDtoContent() {
  return `
  // read.dto.ts
  import { z } from 'zod';

  export type ReadDto = z.output<typeof Read>;
  export const Read = z.object({
    // Defina as propriedades do DTO de leitura aqui
  });
  `;
}

function generateUpdateDtoContent() {
  return `
  // update.dto.ts
  import { z } from 'zod';

  export type UpdateDto = z.output<typeof Update>;
  export const Update = z.object({
    // Defina as propriedades do DTO de atualização aqui
  });
  `;
}

function generateDeleteDtoContent() {
  return `
  // delete.dto.ts
  import { z } from 'zod';

  export type DeleteDto = z.output<typeof Delete>;
  export const Delete = z.object({
    // Defina as propriedades do DTO de exclusão aqui
  });
  `;
}

function generateValidatorContent() {
  return `

  import BaseValidator from '@abstracts/validator.abstract';
  import { RequestHandler } from 'express';
  import { Create } from './dtos/create.dto';
  import { Read } from './dtos/read.dto';
  import { Update } from './dtos/update.dto';
  import { DeleteDto } from './dtos/delete.dto';

  class Validator extends BaseValidator {
    public create: RequestHandler = (req, res, next) => {
      this.validateSchema(req, next, 'body', Create);
    };

    public read: RequestHandler = (req, res, next) => {
      this.validateSchema(req, next, 'query', Read);
    };

    public update: RequestHandler = (req, res, next) => {
      this.validateSchema(req, next, 'body', Update);
    };

    public delete: RequestHandler = (req, res, next) => {
      // Por padrão, a exclusão pode não precisar de validação,
      // mas você pode adicionar validações personalizadas aqui se necessário.
      //    this.validateSchema(req, next, 'body', DeleteDto);

      next();
    };
  }

  export default new Validator();


  `;
}

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error("Uso: ts-node generateModule.ts <nome-do-modulo>");
  process.exit(1);
}

const moduleName = args[0];
createModule(moduleName);
