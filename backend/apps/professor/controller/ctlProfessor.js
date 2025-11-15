const mdlProfessores = require('../model/mdlProfessores');

const getAllProfessores = (req, res) =>
  (async () => {
    let registro = await mdlProfessores.getAllProfessores();
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i];
      const formattedDate = row.datanascimento.toISOString().split('T')[0];
      row.datanascimento = formattedDate;
    }
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
    let { msg, linhasAfetadas } = await mdlProfessores.UpdateProfessores(professorREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

const DeleteProfessores = (request, res) =>
  (async () => {
    const professorREG = request.body;
    let { msg, linhasAfetadas } = await mdlProfessores.DeleteProfessores(professorREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

module.exports = {
  getAllProfessores,
  getProfessorByID,
  insertProfessores,
  updateProfessores,
  DeleteProfessores,
};
