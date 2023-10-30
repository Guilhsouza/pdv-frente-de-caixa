const {Router} = require('express');

const usuarios = require('./controladores/usuarios')
const categorias = require('./controladores/categorias')

const rotas = Router();

rotas.post("/usuario", usuarios.cadastrarUsuario);

rotas.get('/usuarios', categorias.listarCategorias);

module.exports = rotas