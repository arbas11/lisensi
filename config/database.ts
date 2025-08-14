import { DatabaseConfig } from "@ioc:Adonis/Lucid/Database";

const databaseConfig: DatabaseConfig = {
  connection: "mysql",
  connections: {
    mysql: {
      client: "mysql2",
      connection: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "root1234",
        database: process.env.DB_NAME || "licence_db",
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: process.env.NODE_ENV === "development",
    },
  },
};

export default databaseConfig;
