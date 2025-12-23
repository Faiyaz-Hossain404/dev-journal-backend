// import dotenv from "dotenv";
import { Sequelize } from "sequelize";

const isProduction = process.env.NODE_ENV === "production";

// dotenv.config();

const sequelize =
  isProduction && process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      })
    : new Sequelize({
        dialect: "postgres",
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });

export default sequelize;
