import { z } from "zod";

export type RequestQueryDto = z.output<typeof RequestQuery>;
export const RequestQuery = z.object({
  limit: z.coerce.string().optional(),
  page: z.coerce.string().optional(),
  search: z.string().optional(),
  status: z.string().optional(),
  dataInicio: z.string().optional(),
  dataFinal: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  id_motorista: z.string().optional(),
  ncv: z.string().optional(),
  placa: z.string().optional(),
  motorista: z.string().optional(),
  patio: z.string().optional(),
  ativo: z.string().optional(),
});
