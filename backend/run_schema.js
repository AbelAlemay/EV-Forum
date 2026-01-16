import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const schemaPath = path.join(process.cwd(), "001_db_schema.sql");
const schemaSql = fs.readFileSync(schemaPath, "utf8");

async function runSchema() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    multipleStatements: true,
  });

  try {
    console.log("Running schema...");
    await connection.query(schemaSql);
    console.log("Schema executed successfully.");
  } catch (err) {
    console.error("Error executing schema:", err);
  } finally {
    await connection.end();
  }
}

runSchema();
