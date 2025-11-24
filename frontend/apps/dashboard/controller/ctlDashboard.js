const apiService = require('../../../services/apiService');

// Exibe a página do dashboard
// Busca os dados do dashboard (total de alunos, professores, disciplinas) e renderiza
const getDashboard = async (req, res) => {
  try {
    // Faz requisição ao backend para obter os dados do dashboard
    // A rota '/' do backend retorna os dados do dashboard
    const response = await apiService.fazerRequisicaoAutenticada(req, 'get', '/');
    
    if (response.status === 'ok' && response.registro && response.registro.length > 0) {
      const dados = response.registro[0];
      
      // Renderiza a página do dashboard com os dados
      res.render('dashboard/dashboard', {
        title: 'Dashboard - Mini Sistema Acadêmico',
        dados: {
          totalAlunos: dados.total_alunos || 0,
          totalProfessores: dados.total_professores || 0,
          totalDisciplinas: dados.total_disciplinas || 0
        },
        // Define a página ativa no menu (para destacar no menu lateral)
        paginaAtiva: 'dashboard'
      });
    } else {
      // Se não houver dados, mostra valores zerados
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
    // Em caso de erro, mostra a página com valores zerados
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

