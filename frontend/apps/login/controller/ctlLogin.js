const apiService = require('../../../services/apiService');

// Exibe a página de login
// Se o usuário já estiver logado, redireciona para o dashboard
const getLogin = (req, res) => {
  // Verifica se já existe um token (usuário já logado)
  const token = req.cookies.token;
  
  if (token) {
    // Se já estiver logado, redireciona para o dashboard
    return res.redirect('/dashboard');
  }
  
  // Renderiza a página de login
  res.render('login/login', {
    title: 'Login - Mini Sistema Acadêmico',
    error: null
  });
};

// Processa o login do usuário
// Recebe username e password, faz a requisição ao backend e armazena o token
const postLogin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Faz a requisição de login ao backend
    const response = await apiService.fazerLogin(username, password);
    
    if (response.auth && response.token) {
      // Se o login foi bem-sucedido, armazena o token em um cookie
      // O cookie expira em 1 hora (mesmo tempo do token JWT)
      res.cookie('token', response.token, {
        httpOnly: true, // Previne acesso via JavaScript (mais seguro)
        maxAge: 3600000, // 1 hora em milissegundos
        secure: false // Em produção, deve ser true se usar HTTPS
      });
      
      // Redireciona para o dashboard
      res.redirect('/dashboard');
    } else {
      // Se o login falhou, mostra a página de login com erro
      res.render('login/login', {
        title: 'Login - Mini Sistema Acadêmico',
        error: response.message || 'Credenciais inválidas'
      });
    }
  } catch (error) {
    // Trata erros de conexão ou outros erros
    res.render('login/login', {
      title: 'Login - Mini Sistema Acadêmico',
      error: error.message || 'Erro ao fazer login. Tente novamente.'
    });
  }
};

// Faz logout do usuário
// Remove o token do cookie e redireciona para login
const logout = async (req, res) => {
  try {
    // Opcional: chama o endpoint de logout do backend
    // (mesmo que o backend não faça nada, é uma boa prática)
    const token = req.cookies.token;
    if (token) {
      await apiService.fazerRequisicaoAutenticada(req, 'post', '/logout');
    }
  } catch (error) {
    // Ignora erros no logout (o importante é limpar o cookie)
    console.error('Erro ao fazer logout:', error);
  } finally {
    // Remove o token do cookie
    res.clearCookie('token');
    // Redireciona para a página de login
    res.redirect('/login');
  }
};

module.exports = {
  getLogin,
  postLogin,
  logout
};