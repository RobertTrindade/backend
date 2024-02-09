import { PrismaClient, Permissions } from "@prisma/client";

export async function seedAdmin(prisma: PrismaClient) {


  
  for (const permission of Object.values(Permissions)) {
    await prisma.permission.create({
      data: {
        title: permission,
      },
    });
  }

  console.log("Admin user seed OK.");
}
