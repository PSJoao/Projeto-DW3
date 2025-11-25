const db = require('../../../database/databaseconfig');

const getAllAlunos = async () => {
  return (
    await db.query(
      'SELECT * ' +
        'FROM alunos where deleted = false ORDER BY nome ASC',
    )
  ).rows;
};

const getAlunoByID = async (alunoIDPar) => {
  return (
    await db.query(
      'SELECT * ' +
        'FROM alunos WHERE aluno_id = $1 and deleted = false ORDER BY nome ASC',
      [alunoIDPar],
    )
  ).rows;
};

const insertAlunos = async (alunoREGPar) => {
 
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'INSERT INTO alunos (nome, matricula, datanascimento) ' + 'values($1, $2, $3)',
        [
          alunoREGPar.nome,
          alunoREGPar.matricula,  
          alunoREGPar.datanascimento        
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const updateAlunos = async (alunoREGPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE alunos SET ' +
          'nome = $2, ' +
          'matricula = $3, ' +
          'datanascimento = $4 ' +
          'WHERE aluno_id = $1',
        [
          alunoREGPar.aluno_id,
          alunoREGPar.nome,
          alunoREGPar.matricula,
          alunoREGPar.datanascimento
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deleteAlunos = async (alunoREGPar) => {
  let linhasAfetadas;
  let msg = 'ok';

  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE alunos SET ' + 'deleted = true ' + 'WHERE aluno_id = $1',
        [alunoREGPar.aluno_id],
      )
    ).rowCount;
  } catch (error) {
    msg = error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllAlunos,
  getAlunoByID,
  insertAlunos,
  updateAlunos,
  deleteAlunos,
};
