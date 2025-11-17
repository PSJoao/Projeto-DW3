const express = require('express');
const routerApp = express.Router();

//Os Apps
const appLogin = require('../apps/login/controller/ctlLogin');
const appAluno = require('../apps/aluno/controller/ctlAlunos');
const appProfessores = require('../apps/professor/controller/ctlProfessores')
const appDashboard = require('../apps/dashboard/controller/ctlDashboard')
const appDisciplina = require('../apps/disciplina/controller/ctlDisciplinas')
const appMatricula = require('../apps/matricula/controller/ctlMatriculas')

//Rotas de Autenticação
routerApp.post('/login', appLogin.Login);
routerApp.post('/logout', appLogin.Logout);

//Rota principal
routerApp.get('/', appLogin.AutenticaJWT, appDashboard.getDashboardDados);

//Rotas de aluno
routerApp.get('/getAllAlunos', appLogin.AutenticaJWT, appAluno.getAllAlunos);
routerApp.post('/getAlunoByID', appLogin.AutenticaJWT, appAluno.getAlunoByID);
routerApp.post('/insertAlunos', appLogin.AutenticaJWT, appAluno.insertAlunos);
routerApp.post('/updateAlunos', appLogin.AutenticaJWT, appAluno.updateAlunos);
routerApp.post('/deleteAlunos', appLogin.AutenticaJWT, appAluno.deleteAlunos);

//Rotas de Professores
routerApp.get('/getAllProfessores', appLogin.AutenticaJWT, appProfessores.getAllProfessores);
routerApp.post('/getProfessorByID', appLogin.AutenticaJWT, appProfessores.getProfessorByID);
routerApp.post('/insertProfessores', appLogin.AutenticaJWT, appProfessores.insertProfessores);
routerApp.post('/updateProfessores', appLogin.AutenticaJWT, appProfessores.updateProfessores);
routerApp.post('/deleteProfessores', appLogin.AutenticaJWT, appProfessores.deleteProfessores);

//Rotas das disciplinas
routerApp.get('/getAllDisciplinas', appLogin.AutenticaJWT, appDisciplina.getAllDisciplinas);
routerApp.post('/getDisciplinaByID', appLogin.AutenticaJWT, appDisciplina.getDisciplinaByID);
routerApp.post('/insertDisciplinas', appLogin.AutenticaJWT, appDisciplina.insertDisciplinas);
routerApp.post('/updateDisciplinas', appLogin.AutenticaJWT, appDisciplina.updateDisciplinas);
routerApp.post('/deleteDisciplinas', appLogin.AutenticaJWT, appDisciplina.deleteDisciplinas);

//Rotas das Matriculas
routerApp.post('/getDisciplinasByAlunoID', appLogin.AutenticaJWT, appMatricula.getDisciplinasByAlunoID);
routerApp.post('/getAlunosByDisciplinaID', appLogin.AutenticaJWT, appMatricula.getAlunosByDisciplinaID);
routerApp.post('/insertAlunoDisciplina', appLogin.AutenticaJWT, appMatricula.insertAlunoDisciplina);
routerApp.post('/deleteAlunoDisciplina', appLogin.AutenticaJWT, appMatricula.deleteAlunoDisciplina);




module.exports = routerApp;