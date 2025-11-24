const express = require('express');
const routerApp = express.Router();

// Importa os controllers de cada módulo
// Cada módulo tem seu próprio controller que gerencia as rotas relacionadas
const ctlLogin = require('../apps/login/controller/ctlLogin');
const ctlDashboard = require('../apps/dashboard/controller/ctlDashboard');
const ctlAlunos = require('../apps/aluno/controller/ctlAlunos');
const ctlProfessores = require('../apps/professor/controller/ctlProfessores');
const ctlDisciplinas = require('../apps/disciplina/controller/ctlDisciplinas');
const ctlMatriculas = require('../apps/matricula/controller/ctlMatriculas');

// Middleware de autenticação
// Verifica se o usuário está logado antes de acessar rotas protegidas
const autenticaSessao = require('../middleware/autenticaSessao');

// ==================== ROTAS PÚBLICAS ====================
// Rota inicial - redireciona para login se não autenticado
routerApp.get('/', autenticaSessao, ctlDashboard.getDashboard);

// Rota de login (GET - mostra a página de login)
routerApp.get('/login', ctlLogin.getLogin);

// Rota de login (POST - processa o login)
routerApp.post('/login', ctlLogin.postLogin);

// Rota de logout
routerApp.get('/logout', ctlLogin.logout);

// ==================== ROTAS PROTEGIDAS ====================
// Todas as rotas abaixo exigem autenticação (middleware autenticaSessao)

// Dashboard
routerApp.get('/dashboard', autenticaSessao, ctlDashboard.getDashboard);

// ==================== ROTAS DE ALUNOS ====================
// Lista todos os alunos
routerApp.get('/alunos', autenticaSessao, ctlAlunos.listar);
// Página para inserir novo aluno
routerApp.get('/alunos/inserir', autenticaSessao, ctlAlunos.inserir);
// Processa a inserção de aluno
routerApp.post('/alunos/inserir', autenticaSessao, ctlAlunos.postInserir);
// Página para editar aluno
routerApp.get('/alunos/editar/:id', autenticaSessao, ctlAlunos.editar);
// Processa a edição de aluno
routerApp.post('/alunos/editar', autenticaSessao, ctlAlunos.postEditar);
// Processa a exclusão de aluno
routerApp.post('/alunos/excluir', autenticaSessao, ctlAlunos.excluir);

// ==================== ROTAS DE PROFESSORES ====================
routerApp.get('/professores', autenticaSessao, ctlProfessores.listar);
routerApp.get('/professores/inserir', autenticaSessao, ctlProfessores.inserir);
routerApp.post('/professores/inserir', autenticaSessao, ctlProfessores.postInserir);
routerApp.get('/professores/editar/:id', autenticaSessao, ctlProfessores.editar);
routerApp.post('/professores/editar', autenticaSessao, ctlProfessores.postEditar);
routerApp.post('/professores/excluir', autenticaSessao, ctlProfessores.excluir);

// ==================== ROTAS DE DISCIPLINAS ====================
routerApp.get('/disciplinas', autenticaSessao, ctlDisciplinas.listar);
routerApp.get('/disciplinas/inserir', autenticaSessao, ctlDisciplinas.inserir);
routerApp.post('/disciplinas/inserir', autenticaSessao, ctlDisciplinas.postInserir);
routerApp.get('/disciplinas/editar/:id', autenticaSessao, ctlDisciplinas.editar);
routerApp.post('/disciplinas/editar', autenticaSessao, ctlDisciplinas.postEditar);
routerApp.post('/disciplinas/excluir', autenticaSessao, ctlDisciplinas.excluir);

// ==================== ROTAS DE MATRÍCULAS ====================
// Lista todas as matrículas
routerApp.get('/matriculas', autenticaSessao, ctlMatriculas.listar);
// Página para inserir nova matrícula
routerApp.get('/matriculas/inserir', autenticaSessao, ctlMatriculas.inserir);
// Processa a matrícula de um aluno
routerApp.post('/matriculas/matricular', autenticaSessao, ctlMatriculas.matricular);
// Processa a desmatrícula de um aluno
routerApp.post('/matriculas/desmatricular', autenticaSessao, ctlMatriculas.desmatricular);

// ==================== ROTAS API (para AJAX) ====================
// Rota para buscar alunos de uma disciplina (usado na página de matrículas)
routerApp.post('/api/alunos-disciplina', autenticaSessao, async (req, res) => {
  try {
    const apiService = require('../services/apiService');
    const response = await apiService.fazerRequisicaoAutenticada(req, 'post', '/getAlunosByDisciplinaID', {
      disciplinaid: parseInt(req.body.disciplinaid)
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = routerApp;