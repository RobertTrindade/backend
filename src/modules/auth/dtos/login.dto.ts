import { z } from 'zod';

export type LoginDto = z.output<typeof Login>
export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
});
