const knex = require('../database/conexao');
const joi = require('joi');

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  try {
    const emailExiste = await knex('clientes').where('email', email).first();

    if (emailExiste) {
      return res.status(404).json({
        mensagem: 'Já existe cliente cadastrado com o e-mail informado.',
      });
    }

    const cpfExiste = await knex('clientes').where('cpf', cpf).first();

    if (cpfExiste) {
      return res.status(404).json({
        mensagem: 'Já existe cliente cadastrado com o CPF informado.',
      });
    }

    const cliente = await knex('clientes')
      .insert({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
      })
      .returning('*');

    if (!cliente[0]) {
      return res.status(404).json('O usuario não foi cadastraddo.');
    }

    return res.status(200).json(cliente[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editarCliente = async (req, res) => {
  const { id } = req.params;

  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const emailExiste = await knex('clientes').where('email', email).first();

    if (emailExiste) {
      return res
        .status(400)
        .json('O e-mail informado já está sendo ultilizado por outro cliente.');
    }

    const cpfExiste = await knex('clientes').where('cpf', cpf).first();

    if (cpfExiste) {
      return res.status(404).json({
        mensagem: 'O CPF informado já está sendo ultilizado por outro cliente.',
      });
    }

    const clienteAtualizado = await knex('clientes').where('id', id).update({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    });

    if (!clienteAtualizado) {
      return res.status(400).json('O cliente não foi atualizado.');
    }

    return res.status(200).json('Usuário foi atualizado com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarCliente = async (req, res) => {
  try {
    const listarClientes = await knex('clientes').returning('*');
    return res.status(200).json(listarClientes);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const detalharCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const buscarCliente = await knex('clientes').where('id', id).first();
    if (!buscarCliente) {
      return res.status(404).json({ mensagem: 'Cleinte não encontrado' });
    }
    return res.status(200).json(buscarCliente);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  cadastrarCliente,
  editarCliente,
  detalharCliente,
  listarCliente
};
