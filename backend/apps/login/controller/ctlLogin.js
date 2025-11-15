const jwt = require('jsonwebtoken');
const bCrypt = require('bcryptjs');
const mdlLogin = require('../model/mdlLogin');

const Login = async (req, res, next) => {
  const credencial = await mdlLogin.GetCredencial(req.body.username);
  if (credencial.length == 0) {
    return res.status(401).json({ auth: false, message: 'Usuário não identificado!' });
  }

  if (bCrypt.compareSync(req.body.password, credencial[0].password)) {
    const username = credencial[0].username;
    const token = jwt.sign({ username }, process.env.JWT_TOKEN_PASS, {
      expiresIn: 3600, // 60min
    });
    return res.json({ auth: true, token: token, username });
  }
  res.status(401).json({ auth: false, message: 'Login inválido!' });
};

function AutenticaJWT(req, res, next) {
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader)
    return res
      .status(401)
      .json({ auth: false, message: 'Não foi informado o token JWT' });

  const bearer = tokenHeader.split(' ');
  const token = bearer[1];

  jwt.verify(token, process.env.JWT_TOKEN_PASS, function (err, decoded) {
    if (err)
      return res
        .status(401)
        .json({ auth: false, message: 'JWT inválido ou expirado' });

    req.username = decoded.username;
    next();
  });
}

const Logout = (req, res, next) => {
  res.json({ auth: false, token: null });
};

module.exports = {
  Login,
  Logout,
  AutenticaJWT,
};
