const apiService = require('../../../services/apiService');

// Lista todos os professores
const listar = async (req, res) => {
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllProfessores');
    
    if (response.status === 'ok') {
      res.render('professor/listar', {
        title: 'Professores - Mini Sistema Acadêmico',
        professores: response.registro || [],
        paginaAtiva: 'professores'
      });
    } else {
      res.render('professor/listar', {
        title: 'Professores - Mini Sistema Acadêmico',
        professores: [],
        paginaAtiva: 'professores',
        error: 'Erro ao carregar professores'
      });
    }
  } catch (error) {
    console.error('Erro ao listar professores:', error);
    res.render('professor/listar', {
      title: 'Professores - Mini Sistema Acadêmico',
      professores: [],
      paginaAtiva: 'professores',
      error: 'Erro ao carregar professores'
    });
  }
};

// Exibe a página para inserir um novo professor
const inserir = (req, res) => {
  res.render('professor/inserir', {
    title: 'Inserir Professor - Mini Sistema Acadêmico',
    paginaAtiva: 'professores',
    professor: null
  });
};

// Processa a inserção de um novo professor
const postInserir = async (req, res) => {
  const { nome, email } = req.body;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/insertProfessores', {
      nome,
      email
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      res.redirect('/professores');
    } else {
      res.render('professor/inserir', {
        title: 'Inserir Professor - Mini Sistema Acadêmico',
        paginaAtiva: 'professores',
        professor: { nome, email },
        error: response.status || 'Erro ao inserir professor'
      });
    }
  } catch (error) {
    console.error('Erro ao inserir professor:', error);
    res.render('professor/inserir', {
      title: 'Inserir Professor - Mini Sistema Acadêmico',
      paginaAtiva: 'professores',
      professor: { nome, email },
      error: error.message || 'Erro ao inserir professor'
    });
  }
};

// Exibe a página para editar um professor
const editar = async (req, res) => {
  const professorId = req.params.id;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/getProfessorByID', {
      professorid: professorId
    });
    
    if (response.status === 'ok' && response.registro && response.registro.length > 0) {
      const professor = response.registro[0];
      res.render('professor/editar', {
        title: 'Editar Professor - Mini Sistema Acadêmico',
        paginaAtiva: 'professores',
        professor: professor
      });
    } else {
      res.redirect('/professores');
    }
  } catch (error) {
    console.error('Erro ao buscar professor:', error);
    res.redirect('/professores');
  }
};

// Processa a edição de um professor
const postEditar = async (req, res) => {
  const { professor_id, nome, email } = req.body;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/updateProfessores', {
      professor_id: parseInt(professor_id),
      nome,
      email
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      res.redirect('/professores');
    } else {
      res.render('professor/editar', {
        title: 'Editar Professor - Mini Sistema Acadêmico',
        paginaAtiva: 'professores',
        professor: { professor_id, nome, email },
        error: response.status || 'Erro ao editar professor'
      });
    }
  } catch (error) {
    console.error('Erro ao editar professor:', error);
    res.render('professor/editar', {
      title: 'Editar Professor - Mini Sistema Acadêmico',
      paginaAtiva: 'professores',
      professor: { professor_id, nome, email },
      error: error.message || 'Erro ao editar professor'
    });
  }
};

// Processa a exclusão de um professor
const excluir = async (req, res) => {
  const { professor_id } = req.body;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/deleteProfessores', {
      professor_id: parseInt(professor_id)
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      res.redirect('/professores');
    } else {
      res.redirect('/professores');
    }
  } catch (error) {
    console.error('Erro ao excluir professor:', error);
    res.redirect('/professores');
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

