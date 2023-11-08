const { Router } = require('express');

const usuarios = require('../controladores/usuarios');
const login = require('../controladores/login');
const verificarLogin = require('../filtros/verificarLogin')
const categorias = require('../controladores/categorias')

const produtos = require('../controladores/produtos')
const validarProdutos = require('../intermediarios/validarProdutos')
const produtoSchema = require('../validacoes/produtoSchema')

const cliente = require('../controladores/cliente')

const rotas = Router();

rotas.post('/usuario', usuarios.cadastrarUsuario);
rotas.post('/login', login.login)

rotas.get('/categoria', categorias.listarCategorias);

rotas.use(verificarLogin);

rotas.get('/usuario', usuarios.detalharUsuarioLogado);
rotas.put('/usuario', usuarios.editarUsuario);

rotas.post('/produto', validarProdutos(produtoSchema), produtos.cadastrarProdutos);
rotas.put('/produto/:id', produtos.editarDadosProduto);

rotas.post('/cliente', cliente.cadastrarCliente);

rotas.put('/cliente/:id', cliente.atualizarCliente);

module.exports = rotas