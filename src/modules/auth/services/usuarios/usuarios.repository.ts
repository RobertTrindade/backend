import DataSource from "@database/data-source";

class Repository {
  constructor(private readonly repository = DataSource.usuarios) {}

  public findAllPermissions(id: number) {
    return this.repository
      .findUnique({
        where: { id },
      })
      .Permissions();
  }

  public findByCredential(credential: string) {
    return this.repository.findFirst({
      where: {
        OR: [{ email: credential }],
      },
      include: {
        Permissions: true,
      },
    });
  }

  public storeCode(id: number, code: string, codeExpiresIn: Date) {
    return this.repository.update({
      where: { id },
      data: {
        code,
        codeExpiresIn,
      },
    });
  }

  public changePassword(id: number, password: string) {
    return this.repository.update({
      where: { id },
      data: {
        code: null,
        codeExpiresIn: null,
        password,
      },
    });
  }
}

export default new Repository();
