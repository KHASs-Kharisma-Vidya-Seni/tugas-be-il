import mysql from "mysql2";
import { config } from "./config.js";

// Buat koneksi ke database MySQL
const connection = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
});

// Hubungkan ke database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as id " + connection.threadId);
});

export default connection;
