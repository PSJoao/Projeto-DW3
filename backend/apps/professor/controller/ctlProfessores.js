const mdlProfessores = require('../model/mdlProfessores');

const getAllProfessores = (req, res) =>
  (async () => {
    let registro = await mdlProfessores.getAllProfessores();
    res.json({ status: 'ok', registro: registro });
})();

const getProfessorByID = (req, res) =>
  (async () => {
    const professorID = parseInt(req.body.professorid);
    let registro = await mdlProfessores.getProfessorByID(professorID);

    res.json({ status: 'ok', registro: registro });
})();

const insertProfessores = (request, res) =>
  (async () => {
    const professorREG = request.body;
    let { msg, linhasAfetadas } = await mdlProfessores.insertProfessores(professorREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

const updateProfessores = (request, res) =>
  (async () => {
    const professorREG = request.body;
    let { msg, linhasAfetadas } = await mdlProfessores.updateProfessores(professorREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

const deleteProfessores = (request, res) =>
  (async () => {
    const professorREG = request.body;
    let { msg, linhasAfetadas } = await mdlProfessores.deleteProfessores(professorREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

module.exports = {
  getAllProfessores,
  getProfessorByID,
  insertProfessores,
  updateProfessores,
  deleteProfessores,
};
