import dotenv from "dotenv";

dotenv.config();

const { APP_PORT, HOST, USER, PASSWORD, DATABASE } = process.env;

export const config = {
  baseUrl: `http://localhost:${APP_PORT}`,
  port: APP_PORT,
  database: {
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
  },
};
