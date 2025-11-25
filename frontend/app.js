const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Importa o router principal
const router = require('./routes/router');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do Handlebars
// Define o engine de templates como Handlebars
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  // Helpers do Handlebars
  helpers: {
    // Helper para comparar dois valores (usado no menu para destacar página ativa)
    eq: function(a, b) {
      return a === b;
    }
  }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Middlewares
// Permite que o Express entenda dados JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve arquivos estáticos (CSS, JS, imagens)
app.use(express.static(__dirname + '/public'));

// Utiliza o router principal para todas as rotas
app.use(router);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Frontend rodando na porta ${port}`);
  console.log(`Acesse: http://localhost:${port}`);
});

