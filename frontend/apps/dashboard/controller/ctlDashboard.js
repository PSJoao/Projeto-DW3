const apiService = require('../../../services/apiService');

// Exibe a página do dashboard
const getDashboard = async (req, res) => {
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'get', '/');
    
    if (response.status === 'ok' && response.registro && response.registro.length > 0) {
      const dados = response.registro[0];
      
      res.render('dashboard/dashboard', {
        title: 'Dashboard - Mini Sistema Acadêmico',
        dados: {
          totalAlunos: dados.total_alunos || 0,
          totalProfessores: dados.total_professores || 0,
          totalDisciplinas: dados.total_disciplinas || 0
        },
        paginaAtiva: 'dashboard'
      });
    } else {
      res.render('dashboard/dashboard', {
        title: 'Dashboard - Mini Sistema Acadêmico',
        dados: {
          totalAlunos: 0,
          totalProfessores: 0,
          totalDisciplinas: 0
        },
        paginaAtiva: 'dashboard'
      });
    }
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.render('dashboard/dashboard', {
      title: 'Dashboard - Mini Sistema Acadêmico',
      dados: {
        totalAlunos: 0,
        totalProfessores: 0,
        totalDisciplinas: 0
      },
      paginaAtiva: 'dashboard',
      error: 'Erro ao carregar dados do dashboard'
    });
  }
};

module.exports = {
  getDashboard
};

