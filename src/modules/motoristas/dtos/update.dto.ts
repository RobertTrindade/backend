// update.dto.ts
import { AccountStatus, statusTrabalho } from "@prisma/client";
import { z } from "zod";

export type UpdateDtoStatus = z.output<typeof UpdateStatus>;
export const UpdateStatus = z.object({
  status: z.nativeEnum(AccountStatus),
});

export type UpdateDtoWorkingStatus = z.output<typeof UpdateStatusWorking>;
export const UpdateStatusWorking = z.object({
  status: z.nativeEnum(statusTrabalho),
});

export type UpdateDto = z.output<typeof Update>;
export const Update = z.object({
  name: z.string().max(512).optional(),
  email: z.string().max(512).optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  celular: z.string().optional(),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  imageUrl: z.string().optional(),
  pdfContrato: z.string().optional(),
  birthdate: z.string().optional(),

  cnh: z
    .object({
      cnh: z.string().optional(),
      cnh_categoria: z.string().optional(),
      cnh_pdf: z.string().optional(),
      cnh_validade: z.string().optional(),
      categoria: z.string().optional(),
    })
    .optional(),
  endereco: z
    .object({
      endereco: z.string().optional(),
      bairro: z.string().optional(),
      cidade: z.string().optional(),
      cep: z.string().optional(),
      uf: z.string().optional(),
    })
    .optional(),
});
