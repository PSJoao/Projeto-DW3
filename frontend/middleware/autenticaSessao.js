// Verifica se o usuário está logado através do token JWT armazenado no cookie
// Se não estiver autenticado, redireciona para a página de login

const autenticaSessao = (req, res, next) => {
  // Verifica se existe um token no cookie
  const token = req.cookies.token;
  
  // Se não houver token, redireciona para login
  if (!token) {
    return res.redirect('/login');
  }
  
  // Se houver token, permite continuar para a próxima rota
  next();
};

module.exports = autenticaSessao;

