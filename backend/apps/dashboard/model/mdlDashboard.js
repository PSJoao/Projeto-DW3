const db = require('../../../database/databaseconfig'); 
// importa o arquivo databaseconfig que faz a conexão com o banco de dados 

//Função para realizar a contagem de professores, alunos e disciplinas. 
const getDashboardDados = async () => {
  return (
    await db.query(
      'SELECT ' +
        '(SELECT COUNT(*) FROM professores WHERE deleted = false) AS total_professores, ' + // Ele está fazendo a contagem da quantidade de Professores que não foram deletados e o resultado destá operação ele denominou de total_professores
        '(SELECT COUNT(*) FROM alunos WHERE deleted = false) AS total_alunos, ' + // Ele está fazendo a contagem da quantidade de Alunos que não foram deletados e o resultado destá operação ele denominou de total_alunos
        '(SELECT COUNT(*) FROM disciplinas WHERE deleted = false) AS total_disciplinas' // Ele está fazendo a contagem da quantidade de Disciplinas que não foram deletados e o resultado destá opreção ele denominou de total_disciplinas
    )
  ).rows;
};

//Exportação da função getDashboardDados.
module.exports = {
  getDashboardDados,
};