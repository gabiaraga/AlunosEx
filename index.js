
const express = require("express");
const alunos = require("./alunos"); 

// Desafio04
const morgan = require('morgan'); 

const app = express();
app.use(express.json());

app.use(morgan('dev')); // morgan

// Rota GET alunos ------------------------------------
app.get("/alunos", (req, res) => {
  let alunosFiltrados = alunos.alunos;
  
  
  if (req.query.nome) {
    alunosFiltrados = alunosFiltrados.filter(aluno => aluno.nome.includes(req.query.nome));
  }
  
  
  if (req.query.media) {
    alunosFiltrados = alunosFiltrados.filter(aluno => aluno.media >= req.query.media);
  }
  
  res.json(alunosFiltrados);
});

// Rota POST novo aluno -----------------------------
app.post("/alunos/novo", (req, res) => {
  const novoAluno = req.body;
    
  if (!novoAluno.nome || !novoAluno.matricula || !novoAluno.media) {
    res.status(400).send("Os campos nome, matrícula e média são obrigatórios.");
  } else {
    alunos.alunos.push(novoAluno); // adicionando o novo aluno no array
    salvarDados(); 
    res.send("Aluno adicionado com sucesso.");
  }
});

// Rota POST remover aluno
app.post("/alunos/deletar/:index", (req, res) => {
  const index = req.params.index;
  
  // Inválido ERRO 404
  if (index < 0 || index >= alunos.alunos.length) {
    res.status(404).send("Aluno não encontrado.");
  } else {
    alunos.alunos.splice(index, 1); // removendo o aluno do array
    res.send("Aluno removido com sucesso.");
  }
});


app.post("/alunos/atualizar/:index", (req, res) => {
  const index = req.params.index;
  const novoAluno = req.body;
  
  // Tratando o caso de índice inválido
  if (index < 0 || index >= alunos.alunos.length) {
    res.status(404).send("Aluno não encontrado.");
  } else {
    alunos.alunos[index].nome = novoAluno.nome || alunos.alunos[index].nome;
    alunos.alunos[index].media = novoAluno.media || alunos.alunos[index].media;
    
    res.send("Aluno atualizado com sucesso.");
  }
});

// Iniciando o servidor----------------------------------
app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000.");
});