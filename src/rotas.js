const { Router } = require('express');

const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');

const verificarLogin = require('./filtros/verificarLogin')

const rotas = Router();

rotas.post("/usuario", usuarios.cadastrarUsuario);

rotas.post("/login", login.login)

rotas.use(verificarLogin);

rotas.get('/usuario', usuarios.listarUsuario);

module.exports = rotas