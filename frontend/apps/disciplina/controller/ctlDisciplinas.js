const apiService = require('../../../services/apiService');

// Lista todas as disciplinas
const listar = async (req, res) => {
  try {
    // Busca todas as disciplinas
    const responseDisciplinas = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllDisciplinas');
    
    // Busca todos os professores (para exibir o nome do professor na lista)
    const responseProfessores = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllProfessores');
    
    const professores = responseProfessores.status === 'ok' ? responseProfessores.registro || [] : [];
    
    // Cria um mapa de professores para facilitar a busca
    const professoresMap = {};
    professores.forEach(prof => {
      professoresMap[prof.professor_id] = prof.nome;
    });
    
    // Adiciona o nome do professor a cada disciplina
    let disciplinas = [];
    if (responseDisciplinas.status === 'ok') {
      disciplinas = (responseDisciplinas.registro || []).map(disc => ({
        ...disc,
        nome_professor: professoresMap[disc.professor_id] || 'Não atribuído'
      }));
    }
    
    res.render('disciplina/listar', {
      title: 'Disciplinas - Mini Sistema Acadêmico',
      disciplinas: disciplinas,
      paginaAtiva: 'disciplinas'
    });
  } catch (error) {
    console.error('Erro ao listar disciplinas:', error);
    res.render('disciplina/listar', {
      title: 'Disciplinas - Mini Sistema Acadêmico',
      disciplinas: [],
      paginaAtiva: 'disciplinas',
      error: 'Erro ao carregar disciplinas'
    });
  }
};

// Exibe a página para inserir uma nova disciplina
const inserir = async (req, res) => {
  try {
    // Busca todos os professores para o select
    const response = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllProfessores');
    const professores = response.status === 'ok' ? response.registro || [] : [];
    
    res.render('disciplina/inserir', {
      title: 'Inserir Disciplina - Mini Sistema Acadêmico',
      paginaAtiva: 'disciplinas',
      disciplina: null,
      professores: professores
    });
  } catch (error) {
    console.error('Erro ao carregar professores:', error);
    res.render('disciplina/inserir', {
      title: 'Inserir Disciplina - Mini Sistema Acadêmico',
      paginaAtiva: 'disciplinas',
      disciplina: null,
      professores: [],
      error: 'Erro ao carregar professores'
    });
  }
};

// Processa a inserção de uma nova disciplina
const postInserir = async (req, res) => {
  const { nome_disciplina, codigo_disciplina, professor_id } = req.body;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/insertDisciplinas', {
      nome_disciplina,
      codigo_disciplina,
      professor_id: parseInt(professor_id)
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      res.redirect('/disciplinas');
    } else {
      // Busca professores novamente para o select em caso de erro
      const responseProfessores = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllProfessores');
      const professores = responseProfessores.status === 'ok' ? responseProfessores.registro || [] : [];
      
      res.render('disciplina/inserir', {
        title: 'Inserir Disciplina - Mini Sistema Acadêmico',
        paginaAtiva: 'disciplinas',
        disciplina: { nome_disciplina, codigo_disciplina, professor_id },
        professores: professores,
        error: response.status || 'Erro ao inserir disciplina'
      });
    }
  } catch (error) {
    console.error('Erro ao inserir disciplina:', error);
    
    // Busca professores novamente para o select em caso de erro
    try {
      const responseProfessores = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllProfessores');
      const professores = responseProfessores.status === 'ok' ? responseProfessores.registro || [] : [];
      
      res.render('disciplina/inserir', {
        title: 'Inserir Disciplina - Mini Sistema Acadêmico',
        paginaAtiva: 'disciplinas',
        disciplina: { nome_disciplina, codigo_disciplina, professor_id },
        professores: professores,
        error: error.message || 'Erro ao inserir disciplina'
      });
    } catch (err) {
      res.render('disciplina/inserir', {
        title: 'Inserir Disciplina - Mini Sistema Acadêmico',
        paginaAtiva: 'disciplinas',
        disciplina: { nome_disciplina, codigo_disciplina, professor_id },
        professores: [],
        error: error.message || 'Erro ao inserir disciplina'
      });
    }
  }
};

// Exibe a página para editar uma disciplina
const editar = async (req, res) => {
  const disciplinaId = req.params.id;
  
  try {
    // Busca os dados da disciplina
    const responseDisciplina = await apiService.fazerRequisicaoAutenticada(req, 'post', '/getDisciplinaByID', {
      disciplinaid: disciplinaId
    });
    
    // Busca todos os professores para o select
    const responseProfessores = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllProfessores');
    const professores = responseProfessores.status === 'ok' ? responseProfessores.registro || [] : [];
    
    if (responseDisciplina.status === 'ok' && responseDisciplina.registro && responseDisciplina.registro.length > 0) {
      const disciplina = responseDisciplina.registro[0];
      res.render('disciplina/editar', {
        title: 'Editar Disciplina - Mini Sistema Acadêmico',
        paginaAtiva: 'disciplinas',
        disciplina: disciplina,
        professores: professores
      });
    } else {
      res.redirect('/disciplinas');
    }
  } catch (error) {
    console.error('Erro ao buscar disciplina:', error);
    res.redirect('/disciplinas');
  }
};

// Processa a edição de uma disciplina
const postEditar = async (req, res) => {
  const { disciplina_id, nome_disciplina, codigo_disciplina, professor_id } = req.body;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/updateDisciplinas', {
      disciplina_id: parseInt(disciplina_id),
      nome_disciplina,
      codigo_disciplina,
      professor_id: parseInt(professor_id)
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      res.redirect('/disciplinas');
    } else {
      // Busca professores novamente para o select em caso de erro
      const responseProfessores = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllProfessores');
      const professores = responseProfessores.status === 'ok' ? responseProfessores.registro || [] : [];
      
      res.render('disciplina/editar', {
        title: 'Editar Disciplina - Mini Sistema Acadêmico',
        paginaAtiva: 'disciplinas',
        disciplina: { disciplina_id, nome_disciplina, codigo_disciplina, professor_id },
        professores: professores,
        error: response.status || 'Erro ao editar disciplina'
      });
    }
  } catch (error) {
    console.error('Erro ao editar disciplina:', error);
    
    // Busca professores novamente para o select em caso de erro
    try {
      const responseProfessores = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllProfessores');
      const professores = responseProfessores.status === 'ok' ? responseProfessores.registro || [] : [];
      
      res.render('disciplina/editar', {
        title: 'Editar Disciplina - Mini Sistema Acadêmico',
        paginaAtiva: 'disciplinas',
        disciplina: { disciplina_id, nome_disciplina, codigo_disciplina, professor_id },
        professores: professores,
        error: error.message || 'Erro ao editar disciplina'
      });
    } catch (err) {
      res.render('disciplina/editar', {
        title: 'Editar Disciplina - Mini Sistema Acadêmico',
        paginaAtiva: 'disciplinas',
        disciplina: { disciplina_id, nome_disciplina, codigo_disciplina, professor_id },
        professores: [],
        error: error.message || 'Erro ao editar disciplina'
      });
    }
  }
};

// Processa a exclusão de uma disciplina
const excluir = async (req, res) => {
  const { disciplina_id } = req.body;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/deleteDisciplinas', {
      disciplina_id: parseInt(disciplina_id)
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      res.redirect('/disciplinas');
    } else {
      res.redirect('/disciplinas');
    }
  } catch (error) {
    console.error('Erro ao excluir disciplina:', error);
    res.redirect('/disciplinas');
  }
};

module.exports = {
  listar,
  inserir,
  postInserir,
  editar,
  postEditar,
  excluir
};

