
  // delete.dto.ts
  import { z } from 'zod';

  export type DeleteDto = z.output<typeof Delete>;
  export const Delete = z.object({
    // Defina as propriedades do DTO de exclusão aqui
  });
  