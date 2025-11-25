const db = require('../../../database/databaseconfig');

const getAllProfessores = async () => {
  return (
    await db.query(
      'SELECT * ' +
        'FROM professores where deleted = false ORDER BY nome ASC',
    )
  ).rows;
};

const getProfessorByID = async (professorIDPar) => {
  return (
    await db.query(
      'SELECT * ' +
        'FROM professores WHERE professor_id = $1 and deleted = false ORDER BY nome ASC',
      [professorIDPar],
    )
  ).rows;
};

const insertProfessores = async (professorREGPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'INSERT INTO professores (nome, email) ' + 'values($1, $2)',
        [
          professorREGPar.nome,
          professorREGPar.email,
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const updateProfessores = async (professorREGPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE professores SET ' +
          'nome = $2, ' +
          'email = $3 ' +
          'WHERE professor_id = $1',
        [
          professorREGPar.professor_id,
          professorREGPar.nome,
          professorREGPar.email,
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deleteProfessores = async (professorREGPar) => {
  let linhasAfetadas;
  let msg = 'ok';

  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE professores SET ' + 'deleted = true ' + 'WHERE professor_id = $1',
        [professorREGPar.professor_id],
      )
    ).rowCount;
  } catch (error) {
    msg = error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllProfessores,
  getProfessorByID,
  insertProfessores,
  updateProfessores,
  deleteProfessores,
};
