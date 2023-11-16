const { Router } = require('express');

const usuarios = require('../controladores/usuarios');
const login = require('../controladores/login');
const categorias = require('../controladores/categorias');
const produtos = require('../controladores/produtos');
const clientes = require('../controladores/clientes');
const pedidos = require('../controladores/pedidos')

const verificarLogin = require('../intermediarios/verificarLogin');
const validacaoDoCorpoReq = require('../intermediarios/validarCorpoReq');

const produtoSchema = require('../validacoes/produtoSchema');
const clienteSchema = require('../validacoes/clienteSchema');
const pedidoSchema = require('../validacoes/pedidoSchema');
const multer = require('../servicos/multer');

const rotas = Router();

rotas.post('/usuario', usuarios.cadastrarUsuario);
rotas.post('/login', login.login);

rotas.use(verificarLogin);

rotas.get('/usuario', usuarios.detalharUsuarioLogado);
rotas.put('/usuario', usuarios.editarUsuario);

rotas.get('/categoria', categorias.listarCategorias);

rotas.post('/produto', multer.single('imagem'), produtos.cadastrarProdutos);
rotas.put('/produto/:id', validacaoDoCorpoReq(produtoSchema), multer.single('imagem'), produtos.editarProduto);
rotas.get('/produto', produtos.listarProdutos);
rotas.get('/produto/:id', produtos.detalharProdutos);
rotas.delete('/produto/:id', produtos.removerProdutos);

rotas.post('/cliente', validacaoDoCorpoReq(clienteSchema), clientes.cadastrarCliente);
rotas.put('/cliente/:id', validacaoDoCorpoReq(clienteSchema), clientes.editarCliente);
rotas.get('/cliente', clientes.listarCliente);
rotas.get('/cliente/:id', clientes.detalharCliente);

rotas.post('/pedido', validacaoDoCorpoReq(pedidoSchema), pedidos.cadastrarPedidos)

module.exports = rotas;
