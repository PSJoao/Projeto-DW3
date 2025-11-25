const axios = require('axios');

const API_BASE_URL = process.env.API_URL;

// Cria uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// O token JWT é armazenado no cookie e precisa ser enviado no header Authorization
function getTokenFromCookie(req) {
  return req.cookies.token || null;
}

// Função para fazer requisições autenticadas
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

// Função para fazer login
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