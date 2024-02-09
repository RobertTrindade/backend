// update.dto.ts
import { z } from "zod";

export type UpdateDto = z.output<typeof Update>;
export const Update = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
