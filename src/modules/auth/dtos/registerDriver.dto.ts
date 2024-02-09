import { z } from "zod";

export type RegisterDriverDto = z.output<typeof RegisterDriver>;
export const RegisterDriver = z
  .object({
    name: z.string().max(512),
    email: z.string().max(512),
    password: z.string(),
    confirmPassword: z.string().optional(),
    celular: z.string(),
    cpf: z.string(),
    rg: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    imageUrl: z.string(),
    birthdate: z.string(),

    representaEmpresa: z.boolean(),

    reboque: z.object({
      crlvUrl: z.string(),
      placa: z.string(),
    }),

    empresa: z.object({
      nome_empresa: z.string(),
      cnpj: z.string(),
    }),

    cnh: z.object({
      cnh: z.string(),
      cnh_categoria: z.string(),
      cnh_pdf: z.string(),
      cnh_validade: z.string(),
    }),
    endereco: z.object({
      endereco: z.string(),
      bairro: z.string(),
      cidade: z.string(),
      cep: z.string(),
      uf: z.string(),
    }),
  })
  .refine(
    (body) => {
      return body.password === body.confirmPassword;
    },
    {
      message: "Senhas informadas estão diferentes.",
    }
  );
