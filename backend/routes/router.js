const express = require('express');
const routerApp = express.Router();

//Os Apps
const appLogin = require('../apps/login/controller/ctlLogin');
const appAluno = require('../apps/aluno/controller/ctlAlunos');
const appProfessores = require('../apps/professor/controller/ctlProfessores')
const appDashboard = require('../apps/dashboard/controller/ctlDashboard')

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



module.exports = routerApp;