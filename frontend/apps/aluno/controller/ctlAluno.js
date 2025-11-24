const apiService = require('../../../services/apiService');

// Lista todos os alunos
// Busca todos os alunos do backend e exibe em uma tabela
const listar = async (req, res) => {
  try {
    // Faz requisição ao backend para obter todos os alunos
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
    aluno: null // null porque é uma inserção
  });
};

// Processa a inserção de um novo aluno
const postInserir = async (req, res) => {
  const { nome, matricula, datanascimento } = req.body;
  
  try {
    // Faz requisição ao backend para inserir o aluno
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/insertAlunos', {
      nome,
      matricula,
      datanascimento
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      // Se a inserção foi bem-sucedida, redireciona para a lista
      res.redirect('/alunos');
    } else {
      // Se houver erro, mostra a página de inserção com erro
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
// Busca os dados do aluno pelo ID e exibe no formulário
const editar = async (req, res) => {
  const alunoId = req.params.id;
  
  try {
    // Faz requisição ao backend para obter os dados do aluno
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
      // Se não encontrar o aluno, redireciona para a lista
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
    // Faz requisição ao backend para atualizar o aluno
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/updateAlunos', {
      aluno_id: parseInt(aluno_id),
      nome,
      matricula,
      datanascimento
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      // Se a edição foi bem-sucedida, redireciona para a lista
      res.redirect('/alunos');
    } else {
      // Se houver erro, mostra a página de edição com erro
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
    // Faz requisição ao backend para excluir o aluno (soft delete)
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/deleteAlunos', {
      aluno_id: parseInt(aluno_id)
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      // Se a exclusão foi bem-sucedida, redireciona para a lista
      res.redirect('/alunos');
    } else {
      // Se houver erro, redireciona de volta para a lista (pode mostrar mensagem de erro depois)
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

