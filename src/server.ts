import configureApp from "./app";
import { createAdminUser } from "./utils/user/createAdmin";

// Inicialização do servidor
const startServer = () => {
  const app = configureApp();
  const PORT = process.env.PORT || 3000;
  createAdminUser()

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
};

// Iniciar a aplicação
startServer();
