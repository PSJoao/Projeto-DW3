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
        'INSERT INTO alunos ' + 'values(default, $1, $2, $3)',
        [
          alunoREGPar.nome,
          alunoREGPar.matricula,
          
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = '[mdlAlunos|insertAlunos] ' + error.detail;
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
          'nome = $3, ' +
          'matricula = $7, ' +
          'deleted = $8 ' +
          'WHERE aluno_id = $1',
        [
          alunoREGPar.aluno_id,
          alunoREGPar.nome,
          alunoREGPar.matricula,
          alunoREGPar.deleted,
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = '[mdlAlunos|insertAlunos] ' + error.detail;
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
    msg = '[mdlAlunos|insertAlunos] ' + error.detail;
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
