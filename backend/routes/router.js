const express = require('express');
const routerApp = express.Router();

//Os Apps
const appLogin = require('../apps/login/controller/ctlLogin');

routerApp.get('/', (req, res) => {
  res.send('Olá mundo!');
});

//Rotas de Autenticação
routerApp.post('/login', appLogin.Login);
routerApp.post('/logout', appLogin.Logout);

module.exports = routerApp;
