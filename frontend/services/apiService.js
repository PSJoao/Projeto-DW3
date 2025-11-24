const axios = require('axios');

// URL base da API backend
// Esta é a URL onde o backend está rodando
const API_BASE_URL = process.env.API_URL || 'http://localhost:40000';

// Cria uma instância do axios com configurações padrão
// Isso facilita o uso em todo o sistema
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Função auxiliar para obter o token do cookie
// O token JWT é armazenado no cookie e precisa ser enviado no header Authorization
function getTokenFromCookie(req) {
  return req.cookies.token || null;
}

// Função para fazer requisições autenticadas
// Adiciona automaticamente o token JWT no header Authorization
async function fazerRequisicaoAutenticada(req, metodo, endpoint, dados = null) {
  const token = getTokenFromCookie(req);
  
  if (!token) {
    throw new Error('Token não encontrado');
  }
  
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  
  try {
    let response;
    switch (metodo.toLowerCase()) {
      case 'get':
        response = await api.get(endpoint, config);
        break;
      case 'post':
        response = await api.post(endpoint, dados, config);
        break;
      case 'put':
        response = await api.put(endpoint, dados, config);
        break;
      case 'delete':
        response = await api.delete(endpoint, config);
        break;
      default:
        throw new Error('Método HTTP não suportado');
    }
    return response.data;
  } catch (error) {
    // Trata erros de resposta da API
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data.message || 'Erro na requisição',
        data: error.response.data
      };
    }
    throw error;
  }
}

// Função para fazer login (não precisa de autenticação)
async function fazerLogin(username, password) {
  try {
    const response = await api.post('/login', {
      username,
      password
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data.message || 'Erro no login',
        data: error.response.data
      };
    }
    throw error;
  }
}

module.exports = {
  fazerRequisicaoAutenticada,
  fazerLogin,
  API_BASE_URL
};