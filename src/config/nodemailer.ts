export default {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true for 465, false for other ports.
  logger: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  default: {
    from: `Grupo Carvalho Leilões <${process.env.SMTP_FROM}>`,
  },
};
