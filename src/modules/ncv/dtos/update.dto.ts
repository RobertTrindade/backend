// update.dto.ts
import { z } from "zod";

export type UpdateDto = z.output<typeof Update>;
export const Update = z.object({
  // Defina as propriedades do DTO de atualização aqui
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


export type MotoristaEntraChecklistDto = z.output<typeof MotoristaEntraChecklist>;
export const MotoristaEntraChecklist = z.object({
 
});
