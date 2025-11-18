const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const arquivoUsuarios = path.join(__dirname, "usuarios.json");

// Função para ler JSON
function lerUsuarios() {
  if (!fs.existsSync(arquivoUsuarios)) {
    fs.writeFileSync(arquivoUsuarios, "[]");
  }
  return JSON.parse(fs.readFileSync(arquivoUsuarios));
}

// Função para salvar no JSON
function salvarUsuarios(dados) {
  fs.writeFileSync(arquivoUsuarios, JSON.stringify(dados, null, 2));
}

// Rota de cadastro
app.post("/cadastro", (req, res) => {
  const { usuario, senha } = req.body;
  const usuarios = lerUsuarios();

  if (usuarios.some(u => u.usuario === usuario)) {
    return res.status(400).json({ erro: "Usuário já existe!" });
  }

  usuarios.push({ usuario, senha });
  salvarUsuarios(usuarios);

  res.json({ msg: "Cadastrado com sucesso!" });
});

// Rota de login
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  const usuarios = lerUsuarios();

  const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

  if (!encontrado) {
    return res.status(401).json({ erro: "Usuário ou senha inválidos!" });
  }

  res.json({ msg: "Login realizado!" });
});

app.listen(3000, () => console.log("Servidor rodando http://localhost:3000"));
