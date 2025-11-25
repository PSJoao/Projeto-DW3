const apiService = require('../../../services/apiService');

// Lista todos os alunos
const listar = async (req, res) => {
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllAlunos');
    
    if (response.status === 'ok') {
      res.render('aluno/listar', {
        title: 'Alunos - Mini Sistema Acadêmico',
        alunos: response.registro || [],
        paginaAtiva: 'alunos'
      });
    } else {
      res.render('aluno/listar', {
        title: 'Alunos - Mini Sistema Acadêmico',
        alunos: [],
        paginaAtiva: 'alunos',
        error: 'Erro ao carregar alunos'
      });
    }
  } catch (error) {
    console.error('Erro ao listar alunos:', error);
    res.render('aluno/listar', {
      title: 'Alunos - Mini Sistema Acadêmico',
      alunos: [],
      paginaAtiva: 'alunos',
      error: 'Erro ao carregar alunos'
    });
  }
};

// Exibe a página para inserir um novo aluno
const inserir = (req, res) => {
  res.render('aluno/inserir', {
    title: 'Inserir Aluno - Mini Sistema Acadêmico',
    paginaAtiva: 'alunos',
    aluno: null
  });
};

// Processa a inserção de um novo aluno
const postInserir = async (req, res) => {
  const { nome, matricula, datanascimento } = req.body;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/insertAlunos', {
      nome,
      matricula,
      datanascimento
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      res.redirect('/alunos');
    } else {
      res.render('aluno/inserir', {
        title: 'Inserir Aluno - Mini Sistema Acadêmico',
        paginaAtiva: 'alunos',
        aluno: { nome, matricula, datanascimento },
        error: response.status || 'Erro ao inserir aluno'
      });
    }
  } catch (error) {
    console.error('Erro ao inserir aluno:', error);
    res.render('aluno/inserir', {
      title: 'Inserir Aluno - Mini Sistema Acadêmico',
      paginaAtiva: 'alunos',
      aluno: { nome, matricula, datanascimento },
      error: error.message || 'Erro ao inserir aluno'
    });
  }
};

// Exibe a página para editar um aluno
const editar = async (req, res) => {
  const alunoId = req.params.id;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/getAlunoByID', {
      alunoid: alunoId
    });
    
    if (response.status === 'ok' && response.registro && response.registro.length > 0) {
      const aluno = response.registro[0];
      res.render('aluno/editar', {
        title: 'Editar Aluno - Mini Sistema Acadêmico',
        paginaAtiva: 'alunos',
        aluno: aluno
      });
    } else {
      res.redirect('/alunos');
    }
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    res.redirect('/alunos');
  }
};

// Processa a edição de um aluno
const postEditar = async (req, res) => {
  const { aluno_id, nome, matricula, datanascimento } = req.body;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/updateAlunos', {
      aluno_id: parseInt(aluno_id),
      nome,
      matricula,
      datanascimento
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      res.redirect('/alunos');
    } else {
      res.render('aluno/editar', {
        title: 'Editar Aluno - Mini Sistema Acadêmico',
        paginaAtiva: 'alunos',
        aluno: { aluno_id, nome, matricula, datanascimento },
        error: response.status || 'Erro ao editar aluno'
      });
    }
  } catch (error) {
    console.error('Erro ao editar aluno:', error);
    res.render('aluno/editar', {
      title: 'Editar Aluno - Mini Sistema Acadêmico',
      paginaAtiva: 'alunos',
      aluno: { aluno_id, nome, matricula, datanascimento },
      error: error.message || 'Erro ao editar aluno'
    });
  }
};

// Processa a exclusão de um aluno
const excluir = async (req, res) => {
  const { aluno_id } = req.body;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/deleteAlunos', {
      aluno_id: parseInt(aluno_id)
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      res.redirect('/alunos');
    } else {
      res.redirect('/alunos');
    }
  } catch (error) {
    console.error('Erro ao excluir aluno:', error);
    res.redirect('/alunos');
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

