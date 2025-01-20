import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,  // Nome do banco
  process.env.DB_USER!,  // Usuário do banco
  process.env.DB_PASSWORD!,  // Senha do banco
  {
    host: process.env.DB_HOST,  // Endereço do servidor
    port: parseInt(process.env.DB_PORT!),  // Porta do banco de dados
    dialect: "postgres",  // Especifica o PostgreSQL
    logging: false,  // Desativa logs de consulta SQL
  }
);

// Testar conexão com o banco de dados
const connectDatabase = () => {
  try {
    sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    sequelize.sync({ alter: true });  // Sincroniza modelos automaticamente
    console.log("Modelos sincronizados com o banco de dados.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);  // Encerra o processo caso haja erro
  }
};

export { sequelize, connectDatabase };
