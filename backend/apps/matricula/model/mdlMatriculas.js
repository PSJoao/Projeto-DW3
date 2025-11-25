const db = require('../../../database/databaseconfig');

const getDisciplinasByAlunoID = async (alunoIDPar) => {
  return (
    await db.query(
      'SELECT d.disciplina_id, d.nome_disciplina, d.codigo_disciplina ' +
        'FROM alunos_disciplinas ad ' +
        'JOIN disciplinas d ON ad.disciplina_id = d.disciplina_id ' +
        'WHERE ad.aluno_id = $1 AND ad.deleted = false ' +
        'ORDER BY d.nome_disciplina',
      [alunoIDPar],
    )
  ).rows;
};

const getAlunosByDisciplinaID = async (disciplinaIDPar) => {
  return (
    await db.query(
      'SELECT a.aluno_id, a.nome, a.matricula ' +
        'FROM alunos_disciplinas ad ' +
        'JOIN alunos a ON ad.aluno_id = a.aluno_id ' +
        'WHERE ad.disciplina_id = $1 AND ad.deleted = false ' +
        'ORDER BY a.nome',
      [disciplinaIDPar],
    )
  ).rows;
};

const insertAlunoDisciplina = async (regPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        // Insere a matrícula. Se já existir (mesmo deleted=true),
        // atualiza para deleted=false (re-matrícula).
        'INSERT INTO alunos_disciplinas (aluno_id, disciplina_id, deleted) ' +
          'VALUES ($1, $2, false) ' +
          'ON CONFLICT (aluno_id, disciplina_id) ' +
          'DO UPDATE SET deleted = false',
        [regPar.aluno_id, regPar.disciplina_id],
      )
    ).rowCount;
  } catch (error) {
    msg = error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deleteAlunoDisciplina = async (regPar) => {
  let linhasAfetadas;
  let msg = 'ok';

  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE alunos_disciplinas SET deleted = true ' +
          'WHERE aluno_id = $1 AND disciplina_id = $2',
        [regPar.aluno_id, regPar.disciplina_id],
      )
    ).rowCount;
  } catch (error) {
    msg = error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getDisciplinasByAlunoID,
  getAlunosByDisciplinaID,
  insertAlunoDisciplina,
  deleteAlunoDisciplina,
};