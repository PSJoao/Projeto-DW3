const apiService = require('../../../services/apiService');

// Exibe a página de login
const getLogin = (req, res) => {
  const token = req.cookies.token;
  
  if (token) {
    return res.redirect('/dashboard');
  }
  
  res.render('login/login', {
    title: 'Login - Mini Sistema Acadêmico',
    error: null
  });
};

// Processa o login do usuário
const postLogin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const response = await apiService.fazerLogin(username, password);
    
    if (response.auth && response.token) {
      res.cookie('token', response.token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: false
      });
      
      res.redirect('/dashboard');
    } else {
      res.render('login/login', {
        title: 'Login - Mini Sistema Acadêmico',
        error: response.message || 'Credenciais inválidas'
      });
    }
  } catch (error) {
    res.render('login/login', {
      title: 'Login - Mini Sistema Acadêmico',
      error: error.message || 'Erro ao fazer login. Tente novamente.'
    });
  }
};

// Faz logout do usuário
const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      await apiService.fazerRequisicaoAutenticada(req, 'post', '/logout');
    }
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  } finally {
    res.clearCookie('token');
    res.redirect('/login');
  }
};

module.exports = {
  getLogin,
  postLogin,
  logout
};