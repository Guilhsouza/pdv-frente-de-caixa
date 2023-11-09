const { Router } = require('express');

const usuarios = require('../controladores/usuarios');
const login = require('../controladores/login');
const verificarLogin = require('../filtros/verificarLogin');
const categorias = require('../controladores/categorias');
const produtos = require('../controladores/produtos');
const clientes = require('../controladores/clientes');


const rotas = Router();

rotas.post('/usuario', usuarios.cadastrarUsuario);

rotas.post('/login', login.login)

rotas.get('/categoria', categorias.listarCategorias);

rotas.use(verificarLogin);

rotas.get('/usuario', usuarios.detalharUsuarioLogado);

rotas.put('/usuario', usuarios.editarUsuario);

rotas.post('/produto', produtos.cadastrarProdutos);

rotas.put('/produto/:id', produtos.editarDadosProduto);

rotas.get('/produto', produtos.listarProdutos);

rotas.get('/produto/:id', produtos.detalharProduto);

rotas.delete('/produto/:id', produtos.removerProduto);

rotas.post('/cliente', clientes.cadastrarCliente);

rotas.put('/cliente/:id', clientes.atualizarCliente);

rotas.get('/cliente', clientes.listarCliente);

rotas.get('/cliente/:id', clientes.detalharCliente);

module.exports = rotas

