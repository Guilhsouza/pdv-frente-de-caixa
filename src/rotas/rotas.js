const { Router } = require('express');
const usuarios = require('../controladores/usuarios');
const login = require('../controladores/login');
const verificarLogin = require('../filtros/verificarLogin')
const categorias = require('../controladores/categorias')

const rotas = Router();

rotas.post("/usuario", usuarios.cadastrarUsuario);

rotas.post("/login", login.login)

rotas.get('/categoria', categorias.listarCategorias);

rotas.use(verificarLogin);

rotas.get('/usuario', usuarios.detalharUsuarioLogado);

rotas.put('/usuario', usuarios.editarUsuario)

module.exports = rotas