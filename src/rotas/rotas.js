const { Router } = require('express');
const usuarios = require('../controladores/usuarios');
const login = require('../controladores/login');
const verificarLogin = require('../filtros/verificarLogin')
const categorias = require('../controladores/categorias')
const produtos = require('../controladores/produtos')
const productSchema = require('../validacoes/produtoSchema');

const rotas = Router();

rotas.post('/usuario', usuarios.cadastrarUsuario);

rotas.post('/login', login.login)

rotas.get('/categoria', categorias.listarCategorias);

rotas.use(verificarLogin);

rotas.get('/usuario', usuarios.detalharUsuarioLogado);

rotas.put('/usuario', usuarios.editarUsuario)

rotas.post('/produto', produtos.cadastrarProdutos)

rotas.put('/produto/:id', produtos.editarDadosProduto)

module.exports = rotas