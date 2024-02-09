
  // update.dto.ts
  import { z } from 'zod';

  export type UpdateDto = z.output<typeof Update>;
  export const Update = z.object({
    // Defina as propriedades do DTO de atualização aqui
  });
  