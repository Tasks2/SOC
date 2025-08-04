// import { Sequelize } from "sequelize";

// // You can use environment variables or hardcode for testing
// const sequelize = new Sequelize(
//   process.env.DB_NAME || "soc_duty",
//   process.env.DB_USER || "root",
//   process.env.DB_PASSWORD || "",
//   {
//     host: process.env.DB_HOST || "localhost",
//     port: Number(process.env.DB_PORT) || 3307, // Use 3307 for XAMPP
//     dialect: "mysql",
//     logging: false,
//   }
// );

// export default sequelize;

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "mysql",
  logging: false,
});

export default sequelize;