const mdlDashboard = require('../model/mdlDashboard');
// importa o arquivo mdlDashboard para ser utilizado dentro da função getDashboardDados.

// Coleta os dados retornados pela função getDashboardDados que está dentro do arquivo mdlDashboard e retorna uma mensagem. 
const getDashboardDados = (req, res) =>
  (async () => {

    let registro = await mdlDashboard.getDashboardDados();
    
    res.json({ status: 'ok', registro: registro });
  })();

  //Exportação da função getDashboardDados.
module.exports = {
  getDashboardDados,
};