
  // update.dto.ts
  import { z } from 'zod';

  export type UpdateDto = z.output<typeof Update>;
  export const Update = z.object({
    descricao: z.string(),
    ativo: z.boolean(),

  });
  