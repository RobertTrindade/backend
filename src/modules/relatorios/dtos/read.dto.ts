
  // read.dto.ts
  import { z } from 'zod';

  export type ReadDto = z.output<typeof Read>;
  export const Read = z.object({
    // Defina as propriedades do DTO de leitura aqui
  });
  