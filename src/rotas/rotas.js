const { Router } = require('express');

const usuarios = require('../controladores/usuarios');
const login = require('../controladores/login');
const verificarLogin = require('../filtros/verificarLogin');
const categorias = require('../controladores/categorias');
const produtos = require('../controladores/produtos');
const produtoSchema = require('../validacoes/produtoSchema');
const validarProdutos = require('../intermediarios/validarProdutos');
const clientes = require('../controladores/clientes');
const clienteSchema = require('../validacoes/clienteSchema');
const validarClientes = require('../intermediarios/validarClientes');

const rotas = Router();

rotas.post('/usuario', usuarios.cadastrarUsuario);

rotas.post('/login', login.login);

rotas.get('/categoria', categorias.listarCategorias);

rotas.use(verificarLogin);

rotas.get('/usuario', usuarios.detalharUsuarioLogado);

rotas.put('/usuario', usuarios.editarUsuario);

rotas.post(
  '/produto',
  validarProdutos(produtoSchema),
  produtos.cadastrarProdutos,
);

rotas.put(
  '/produto/:id',
  validarProdutos(produtoSchema),
  produtos.editarDadosProduto,
);

rotas.delete('/produto/:id', produtos.removerProduto);

rotas.post(
  '/cliente',
  validarClientes(clienteSchema),
  clientes.cadastrarCliente,
);

rotas.put(
  '/cliente/:id',
  validarClientes(clienteSchema),
  clientes.atualizarCliente,
);

rotas.get('/cliente', clientes.listarCliente);

rotas.get('/cliente/:id', clientes.detalharCliente);

module.exports = rotas;
