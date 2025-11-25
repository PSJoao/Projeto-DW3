const apiService = require('../../../services/apiService');

// Exibe a página para matricular um aluno em uma disciplina
const inserir = async (req, res) => {
  try {
    const responseAlunos = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllAlunos');
    const responseDisciplinas = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllDisciplinas');
    
    const alunos = responseAlunos.status === 'ok' ? responseAlunos.registro || [] : [];
    const disciplinas = responseDisciplinas.status === 'ok' ? responseDisciplinas.registro || [] : [];
    
    const responseProfessores = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllProfessores');
    const professores = responseProfessores.status === 'ok' ? responseProfessores.registro || [] : [];
    
    const professoresMap = {};
    professores.forEach(prof => {
      professoresMap[prof.professor_id] = prof.nome;
    });
    
    const disciplinasComProfessor = disciplinas.map(disc => ({
      ...disc,
      nome_professor: professoresMap[disc.professor_id] || 'Não atribuído'
    }));
    
    res.render('matricula/inserir', {
      title: 'Matricular Aluno - Mini Sistema Acadêmico',
      alunos: alunos,
      disciplinas: disciplinasComProfessor,
      paginaAtiva: 'matriculas'
    });
  } catch (error) {
    console.error('Erro ao carregar dados para matrícula:', error);
    res.render('matricula/inserir', {
      title: 'Matricular Aluno - Mini Sistema Acadêmico',
      alunos: [],
      disciplinas: [],
      paginaAtiva: 'matriculas',
      error: 'Erro ao carregar dados'
    });
  }
};

// Lista todas as disciplinas com seus alunos matriculados
const listar = async (req, res) => {
  try {
    const responseDisciplinas = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllDisciplinas');
    const disciplinas = responseDisciplinas.status === 'ok' ? responseDisciplinas.registro || [] : [];
    
    const responseProfessores = await apiService.fazerRequisicaoAutenticada(req, 'get', '/getAllProfessores');
    const professores = responseProfessores.status === 'ok' ? responseProfessores.registro || [] : [];
    
    const professoresMap = {};
    professores.forEach(prof => {
      professoresMap[prof.professor_id] = prof.nome;
    });
    
    const disciplinasComProfessor = disciplinas.map(disc => ({
      ...disc,
      nome_professor: professoresMap[disc.professor_id] || 'Não atribuído'
    }));
    
    res.render('matricula/listar', {
      title: 'Listar Matrículas - Mini Sistema Acadêmico',
      disciplinas: disciplinasComProfessor,
      paginaAtiva: 'matriculas'
    });
  } catch (error) {
    console.error('Erro ao listar matrículas:', error);
    res.render('matricula/listar', {
      title: 'Listar Matrículas - Mini Sistema Acadêmico',
      disciplinas: [],
      paginaAtiva: 'matriculas',
      error: 'Erro ao carregar dados'
    });
  }
};

// Processa a matrícula de um aluno em uma disciplina
const matricular = async (req, res) => {
  const { aluno_id, disciplina_id } = req.body;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/insertAlunoDisciplina', {
      aluno_id: parseInt(aluno_id),
      disciplina_id: parseInt(disciplina_id)
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      res.redirect('/matriculas');
    } else {
      res.redirect('/matriculas/inserir');
    }
  } catch (error) {
    console.error('Erro ao matricular aluno:', error);
    res.redirect('/matriculas/inserir');
  }
};

// Processa a desmatrícula de um aluno de uma disciplina
const desmatricular = async (req, res) => {
  const { aluno_id, disciplina_id } = req.body;
  
  try {
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/deleteAlunoDisciplina', {
      aluno_id: parseInt(aluno_id),
      disciplina_id: parseInt(disciplina_id)
    });
    
    if (response.status === 'ok' && response.linhasAfetadas > 0) {
      res.redirect('/matriculas');
    } else {
      res.redirect('/matriculas');
    }
  } catch (error) {
    console.error('Erro ao desmatricular aluno:', error);
    res.redirect('/matriculas');
  }
};

module.exports = {
  inserir,
  listar,
  matricular,
  desmatricular
};

