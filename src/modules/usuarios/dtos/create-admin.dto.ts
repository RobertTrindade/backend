import { AccountRole } from "@prisma/client";
import { z } from "zod";

export type CreateAdminDto = z.output<typeof CreateAdmin>;
export const CreateAdmin = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  imageUrl: z.string(),
  cargosId: z.number(),
  role: z.nativeEnum(AccountRole),

  permissions: z
    .array(z.number().positive().int())
    .min(1)
    .transform((ids) =>
      ids.map((id) => {
        return { id };
      })
    ),
  patios: z.array(z.number().positive().int()).min(1),
  celular: z.string().optional(),
  emailPessoal: z.string().optional(),
  birthdate: z.string().optional(),
  cpf: z.string().optional(),
  pdfContrato: z.string().optional(),
  Endereco: z.object({
    endereco: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    cep: z.string(),
    uf: z.string(),
  }),
});
