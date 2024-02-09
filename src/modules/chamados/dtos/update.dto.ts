// update.dto.ts
import { ChamadoUrgencia } from "@prisma/client";
import { z } from "zod";

export type UpdateDto = z.output<typeof Update>;
export const Update = z.object({
  equipamentoSolicitado: z.string().optional(),
  tipoVeiculo: z.string().optional(),
  tipoApreensao: z.string().optional(),
  origem: z.string().optional(),
  urgencia: z.nativeEnum(ChamadoUrgencia).optional(),
  uf: z.string().optional(),
  municipio: z.string().optional(),
  distrito: z.string().optional(),
  cep: z.string().optional(),
  enderecoCompleto: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  estado: z.string().optional(),
  detalhes: z.string().optional(),
  patio: z.number(),
  status: z.string().optional(),
});

export type UpdateStatusDto = z.output<typeof UpdateStatus>;
export const UpdateStatus = z.object({
  status: z.string(),
});

export type MotoristaAceitaChamadoDto = z.output<typeof MotoristaAceitaChamado>;
export const MotoristaAceitaChamado = z.object({
  tempo_estimado: z.string(),
  kms_estimado: z.string(),
  lugarAceiteLatitude: z.string(),
  lugarAceiteLongitude: z.string(),
});

export type MotoristaEntraChecklistDto = z.output<
  typeof MotoristaEntraChecklist
>;
export const MotoristaEntraChecklist = z.object({});
