const db = require('../../../database/databaseconfig');

const getAllDisciplinas = async () => {
  return (
    await db.query(
      'SELECT * ' +
        'FROM disciplinas where deleted = false ORDER BY nome_disciplina ASC',
    )
  ).rows;
};

const getDisciplinaByID = async (disciplinaIDPar) => {
  return (
    await db.query(
      'SELECT * ' +
        'FROM disciplinas WHERE disciplina_id = $1 and deleted = false ORDER BY nome_disciplina ASC',
      [disciplinaIDPar],
    )
  ).rows;
};

const insertDisciplinas = async (disciplinaREGPar) => {
 
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'INSERT INTO disciplinas (nome_disciplina, codigo_disciplina, professor_id) ' + 'values($1, $2, $3)',
        [
          disciplinaREGPar.nome_disciplina,
          disciplinaREGPar.codigo_disciplina,
          disciplinaREGPar.professor_id, // Chave estrangeira
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const updateDisciplinas = async (disciplinaREGPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE disciplinas SET ' +
          'nome_disciplina = $2, ' +
          'codigo_disciplina = $3, ' +
          'professor_id = $4 ' + // Chave estrangeira
          'WHERE disciplina_id = $1',
        [
          disciplinaREGPar.disciplina_id,
          disciplinaREGPar.nome_disciplina,
          disciplinaREGPar.codigo_disciplina,
          disciplinaREGPar.professor_id,
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deleteDisciplinas = async (disciplinaREGPar) => {
  let linhasAfetadas;
  let msg = 'ok';

  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE disciplinas SET ' + 'deleted = true ' + 'WHERE disciplina_id = $1',
        [disciplinaREGPar.disciplina_id],
      )
    ).rowCount;
  } catch (error) {
    msg = error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllDisciplinas,
  getDisciplinaByID,
  insertDisciplinas,
  updateDisciplinas,
  deleteDisciplinas,
};