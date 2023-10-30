const { Router } = require('express');


const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');

const verificarLogin = require('./filtros/verificarLogin')

const categorias = require('./controladores/categorias')


const rotas = Router();

rotas.post("/usuario", usuarios.cadastrarUsuario);


rotas.post("/login", login.login)

rotas.use(verificarLogin);

rotas.get('/usuario', usuarios.listarUsuario);

rotas.get('/usuarios', categorias.listarCategorias);


module.exports = rotas