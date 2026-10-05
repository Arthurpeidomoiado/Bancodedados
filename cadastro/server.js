// server.js
const express = require('express');
const path = require('path');
const pool = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Cadastrar usuário
app.post('/usuarios', async (req, res) => {
  const { nome, email } = req.body;

  // Validação dos campos (verifica se estão presentes e não vazios)
  if (!nome || !email || !nome.trim() || !email.trim()) {
    return res.status(400).json({ erro: 'Informe nome e e-mail válidos.' });
  }

  try {
    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    const [resultado] = await pool.execute(sql, [nome.trim(), email.trim()]);

    res.status(201).json({ 
      id: resultado.insertId, 
      nome: nome.trim(), 
      email: email.trim() 
    });
  } catch (erro) {
    // Imprime o erro real no terminal do VS Code/Node
    console.error('Erro no POST /usuarios:', erro);

    // Trata erro de e-mail duplicado (caso a coluna email seja UNIQUE no MySQL)
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
    }

    res.status(500).json({ erro: 'Não foi possível cadastrar o usuário.' });
  }
});

// Listar usuários
app.get('/usuarios', async (req, res) => {
  try {
    const sql = 'SELECT id, nome, email, criado_em FROM usuarios ORDER BY id DESC';
    const [usuarios] = await pool.execute(sql);

    res.json(usuarios);
  } catch (erro) {
    console.error('Erro no GET /usuarios:', erro);
    res.status(500).json({ erro: 'Não foi possível consultar os usuários.' });
  }
});

// Trata rotas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});