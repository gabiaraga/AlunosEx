
const fs = require("fs"); 

// Array alunos --------------------------
const alunos = [
    { nome: "José", matricula: "01", media: 8.3 },
    { nome: "Gabriela", matricula: "02", media: 7.0 },
    { nome: "Julia", matricula: "03", media: 6.2 },
    { nome: "Ricardo", matricula: "04", media: 10.0 },
    { nome: "Larissa", matricula: "05", media: 7.2 },
    { nome: "Vitoria", matricula: "06", media: 6.0 }
  ];

  
  // Filtrar por nome --------------------------
  function filtrarPorNome(nome) {
    return alunos.filter((aluno) => aluno.nome.toLowerCase().includes(nome.toLowerCase()));
  }
  
  // Média Filtrada --------------------------
  function filtrarPorMedia(media) {
    return alunos.filter((aluno) => aluno.media >= media);
  }
  
// Desafio00 ---------------------------
  function salvarDados() {
    const dados = JSON.stringify({ alunos: alunos.alunos });
    fs.writeFileSync("db.json", dados);
  }


  // Array de alunos -------------------
  module.exports = {
    alunos,
    filtrarPorNome,
    filtrarPorMedia,
  };