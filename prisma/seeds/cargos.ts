import { PrismaClient } from "@prisma/client";

export async function seedACargos(prisma: PrismaClient) {
  await prisma.cargos.create({
    data: {
      description: "CCO",
      salario: 1500.0,
    },
  });
  console.log("Cargos user seed OK.");
}
