const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

async function main() {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
    })
  );

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  app.post("/user", async (req, res) => {
    const { nome, data, cpf, telefone, email, senha } = req.body;

    await connection.query(
      "INSERT INTO usuario (nome, data_nascimento, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, data, cpf, telefone, email, senha]
    );

    return res.status(200).json("Usuário criado.");
  });

  app.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    const [rows] = await connection.query(
      "SELECT email, senha FROM usuario WHERE email = ? and senha = ?",
      [email, senha]
    );

    if (rows.length > 0) {
      return res.status(200).json("Logado.");
    }

    return res.status(422).json("Email ou senha estão incorretos.");
  });

  app.get("/", async (req, res) => {
    const [rows] = await connection.query("SELECT * FROM usuario");

    return res.status(200).json({ usuarios: rows });
  });

  app.listen(8000, () => {
    console.log("Aplicação no ar, porta " + 8000);
  });
}

(async () => {
  await main();
})();
