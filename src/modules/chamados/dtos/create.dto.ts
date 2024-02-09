import { ChamadoUrgencia } from "@prisma/client";
import { z } from "zod";

export const Create = z.object({
  patio: z.number(), // Substitua pelo tipo correto, ex: z.string()
  equipamentoSolicitado: z.string(),
  motoristaId: z.number(),
  tipoVeiculo: z.string(),
  tipoApreensao: z.string(),
  urgencia: z.nativeEnum(ChamadoUrgencia),
  origem: z.string(),
  detalhes: z.string().optional(),

  localizacao: z.object({
    estado: z.string(),
    uf: z.string(),
    municipio: z.string(),
    distrito: z.string(),
    cep: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    enderecoCompleto: z.string(),
  }),
  multiple: z.boolean(),
  vehiclesQuantity: z.number().optional(),
  driversQuantity: z.number().optional(),
});

export type createDto = z.output<typeof Create>;
