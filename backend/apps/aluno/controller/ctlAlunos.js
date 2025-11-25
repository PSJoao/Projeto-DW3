const mdlAlunos = require('../model/mdlAlunos');

const getAllAlunos = (req, res) =>
  (async () => {
    let registro = await mdlAlunos.getAllAlunos();
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i]; 
      const formattedDate = row.datanascimento.toISOString().split('T')[0];
      row.datanascimento = formattedDate;
    }
    res.json({ status: 'ok', registro: registro });
  })();

const getAlunoByID = (req, res) =>
  (async () => {
    const alunoID = parseInt(req.body.alunoid);
    let registro = await mdlAlunos.getAlunoByID(alunoID);
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i]; 
      const formattedDate = row.datanascimento.toISOString().split('T')[0];
      row.datanascimento = formattedDate;
    }
    res.json({ status: 'ok', registro: registro });
  })();

const insertAlunos = (request, res) =>
  (async () => {
    const alunoREG = request.body;
    let { msg, linhasAfetadas } = await mdlAlunos.insertAlunos(alunoREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const updateAlunos = (request, res) =>
  (async () => {
    const alunoREG = request.body;
    let { msg, linhasAfetadas } = await mdlAlunos.updateAlunos(alunoREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const deleteAlunos = (request, res) =>
  (async () => {
    const alunoREG = request.body;
    let { msg, linhasAfetadas } = await mdlAlunos.deleteAlunos(alunoREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

module.exports = {
  getAllAlunos,
  getAlunoByID,
  insertAlunos,
  updateAlunos,
  deleteAlunos,
};
