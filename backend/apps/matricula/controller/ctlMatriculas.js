const mdlAlunoDisciplina = require('../model/mdlMatriculas');

// Lista as disciplinas de um aluno
const getDisciplinasByAlunoID = (req, res) =>
  (async () => {
    const alunoID = parseInt(req.body.alunoid);
    let registro = await mdlAlunoDisciplina.getDisciplinasByAlunoID(alunoID);
    res.json({ status: 'ok', registro: registro });
  })();

// Lista os alunos de uma disciplina
const getAlunosByDisciplinaID = (req, res) =>
  (async () => {
    const disciplinaID = parseInt(req.body.disciplinaid);
    let registro = await mdlAlunoDisciplina.getAlunosByDisciplinaID(disciplinaID);
    res.json({ status: 'ok', registro: registro });
  })();

// Matricula um aluno
const insertAlunoDisciplina = (request, res) =>
  (async () => {
    // Espera um body com { aluno_id: X, disciplina_id: Y }
    const reg = request.body;
    let { msg, linhasAfetadas } = await mdlAlunoDisciplina.insertAlunoDisciplina(reg);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

// Desmatricula um aluno
const deleteAlunoDisciplina = (request, res) =>
  (async () => {
    // Espera um body com { aluno_id: X, disciplina_id: Y }
    const reg = request.body;
    let { msg, linhasAfetadas } = await mdlAlunoDisciplina.deleteAlunoDisciplina(reg);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

module.exports = {
  getDisciplinasByAlunoID,
  getAlunosByDisciplinaID,
  insertAlunoDisciplina,
  deleteAlunoDisciplina,
};