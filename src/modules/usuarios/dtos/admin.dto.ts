import { Prisma } from "@prisma/client";

export const UserDto = Prisma.validator<Prisma.UsuariosSelect>()({
  name: true,
  email: true,
  imageUrl: true,
  role: true,
  pdfContrato: true,
});

export const AdminWithPermissionsDto =
  Prisma.validator<Prisma.UsuariosSelect>()({
    ...UserDto,
    Permissions: true,
  });
