import { z } from "zod";

export type addPatioDto = z.output<typeof AddPatio>;
export const AddPatio = z.object({
  id: z.string(),
});
