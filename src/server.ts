import http from "http";
import { Server } from "socket.io";

import app from "./app";
import DataSource from "@database/data-source";

const server = http.createServer(app);

export const io = new Server(server, { cors: { origin: "*" } });

async function start() {
  try {
    // checks database's connection before running the server.
    await DataSource.$connect();

    server.listen(process.env.PORT, () => {
      console.log("Projeto iniciado com sucesso!");
      console.log(
        `Documentação da API disponível em ${process.env.APP_URL}/api-docs`
      );
    });
  } catch (err: any) {
    console.log("Erro ao iniciar o projeto!");
    console.log(err);
  }
}

start();
