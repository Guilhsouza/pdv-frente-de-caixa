const knex = require("../database/conexao");
const produtoSchema = require('../validacoes/produtoSchema')

const cadastrarProdutos = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
      return res
        .status(400)
        .json({ mensagem: 'Estão faltando campos obrigatórios' });
    }

    const buscarCategoria = await knex('categorias')
      .where("id", categoria_id)
      .first();

    if (!buscarCategoria) {
      return res
        .status(404)
        .json({ mensagem: 'A categoria não foi encontrada!' });
    }

    const produto = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    };

    const adicionarProduto = await knex('produtos')
      .insert(produto)
      .returning("*");

    return res
      .status(201)
      .json({ mensagem: 'Produto criado com sucesso', adicionarProduto });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: 'erro interno no servidor' });
  }
};

const editarDadosProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const { error } = produtoSchema.validate(req.body)

    if (error) {
      console.log('Dados inválidos:', error.details)
      return res.status(400).json({ mensagem: 'Dados inválidos', detalhes: error.details });
    }

    const produtoExistente = await knex('produtos').where({ id }).first();

    if (!produtoExistente) {
      console.log('Produto não encontrado')
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    const categoriaExistente = await knex('categorias').where({ id: categoria_id }).first()


    if (!categoriaExistente) {
      console.log('Categoria não encontrada')
      return res.status(404).json({ mensagem: 'Categoria não encontrada' })
    }

    const descricaoExistente = await knex('produtos')
      .where({ descricao })
      .andWhere('id', '!=', id)
      .first();

    if (descricaoExistente) {
      console.log('Produto com essa descrição já cadastrado')
      return res.status(409).json({ mensagem: 'Produto com essa descrição já cadastrado' });
    }

    const produtoAtualizado = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id
    };

    await knex('produtos').where({ id }).update(produtoAtualizado);
    return res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: 'erro interno no servidor' });
  }
};

module.exports = {
  cadastrarProdutos,
  editarDadosProduto
};
