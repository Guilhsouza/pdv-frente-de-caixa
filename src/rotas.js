const {Router} = require('express');

const usuarios = require('./controladores/usuarios')

const rotas = Router();

rotas.post("/usuario", usuarios.cadastrarUsuario);

module.exports = rotas