import { z } from "zod";

export type createDto = z.output<typeof Create>;
export const Create = z.object({
  nome: z.string(),
  responsavel: z.string(),
  telefone: z.string(),
  observacao: z.string(),
  email: z.string(),

  bairro: z.string(),
  cep: z.string(),
  cidade: z.string(),
  estado: z.string(),
  longitude: z.string(),
  latitude: z.string(),
  endereco: z.string(),

  documentos: z.array(
    z.object({
      tipo: z.string(),
      startAt: z.string(),
      endAt: z.string(),
      observacao: z.string(),
      file: z.string(),
    })
  ),
});
