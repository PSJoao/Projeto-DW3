const mdlDisciplinas = require('../model/mdlDisciplinas');

const getAllDisciplinas = (req, res) =>
  (async () => {
    let registro = await mdlDisciplinas.getAllDisciplinas();
    res.json({ status: 'ok', registro: registro });
})();

const getDisciplinaByID = (req, res) =>
  (async () => {
    const disciplinaID = parseInt(req.body.disciplinaid); 
    let registro = await mdlDisciplinas.getDisciplinaByID(disciplinaID);

    res.json({ status: 'ok', registro: registro });
})();

const insertDisciplinas = (request, res) =>
  (async () => {
    const disciplinaREG = request.body;
    let { msg, linhasAfetadas } = await mdlDisciplinas.insertDisciplinas(disciplinaREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

const updateDisciplinas = (request, res) =>
  (async () => {
    const disciplinaREG = request.body;
    let { msg, linhasAfetadas } = await mdlDisciplinas.updateDisciplinas(disciplinaREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

const deleteDisciplinas = (request, res) =>
  (async () => {
    const disciplinaREG = request.body;
    let { msg, linhasAfetadas } = await mdlDisciplinas.deleteDisciplinas(disciplinaREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

module.exports = {
  getAllDisciplinas,
  getDisciplinaByID,
  insertDisciplinas,
  updateDisciplinas,
  deleteDisciplinas,
};