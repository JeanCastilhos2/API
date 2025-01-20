import express, { Application } from "express";
import cors from "cors";
import { defineRoutes } from "./routes/routes";
import { connectDatabase } from "./config/db/database";

const app: Application = express();

// Função para configurar a aplicação
const configureApp = (): Application => {
  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: "*" }));

  // Conexão com o banco de dados
  connectDatabase();

  // Definição de rotas
  app.use("/", defineRoutes());

  return app;
};

export default configureApp;
