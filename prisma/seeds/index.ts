import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin';

import { seedACargos } from './cargos';
import { seedPatios } from './patios';

const prisma = new PrismaClient();
async function main() {
  //await seedAdmin(prisma);
  
    await seedPatios(prisma);


 // await seedTexts(prisma);
}

main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async() => {
  await prisma.$disconnect();
});
