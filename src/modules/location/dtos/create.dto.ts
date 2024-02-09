
  import { z } from 'zod';

  export type createDto = z.output<typeof Create>
  export const Create = z.object({
    //defina as props de criação aqui
  });
  


  export type distanceCalculateDto = z.output<typeof Calculate>
  export const Calculate = z.object({
    latitude1: z.string(),
    longitude1: z.string(),
    latitude2: z.string(),
    longitude2: z.string(),
  });
  
