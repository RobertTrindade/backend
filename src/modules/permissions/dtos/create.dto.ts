import { z } from "zod";
import { Permissions } from "@prisma/client";

export type createDto = z.output<typeof Create>;
export const Create = z.object({
  title: z.nativeEnum(Permissions),
});
