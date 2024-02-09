import { AccountRole, AccountStatus } from "@prisma/client";
import { z } from "zod";

export type UpdateAdminDto = z.output<typeof UpdateAdmin>;
export const UpdateAdmin = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  imageUrl: z.string(),
  cargosId: z.number(),
  password: z.string().optional(),

  celular: z.string().optional(),
  emailPessoal: z.string().optional(),
  birthdate: z.string().optional(),
  cpf: z.string().optional(),
  status: z.nativeEnum(AccountStatus),
  pdfContrato: z.string().optional(),
  role: z.nativeEnum(AccountRole).optional(),

  Endereco: z
    .object({
      endereco: z.string(),
      bairro: z.string(),
      cidade: z.string(),
      cep: z.string(),
      uf: z.string(),
    })
    .optional(),
});

export type UpdateMyselfDto = z.output<typeof UpdateMyselfAdmin>;
export const UpdateMyselfAdmin = z.object({
  name: z.string().trim().min(1),
  imageUrl: z.string().optional(),
  password: z.string().optional(),
  celular: z.string().optional(),
  birthdate: z.string().optional(),

});
