const knex = require("../database/conexao");

const cadastrarProdutos = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
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
        return res.status(500).json({ mensagem: 'erro interno no servidor' });
    }
};

const editarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const produtoExistente = await knex('produtos').where({ id }).first();

        if (!produtoExistente) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }

        const categoriaExistente = await knex('categorias').where({ id: categoria_id }).first()


        if (!categoriaExistente) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada' })
        }

        const descricaoExistente = await knex('produtos')
            .where({ descricao })
            .andWhere('id', '!=', id)
            .first();

        if (descricaoExistente) {
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
        return res.status(500).json({ mensagem: '[ERRO] Erro interno no servidor' });
    }
};

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query;

    if (!categoria_id) {
        const produtos = await knex('produtos');

        return res.status(200).json(produtos)
    };

    const produtosComQuery = await knex('produtos').where('categoria_id', categoria_id);


    return res.status(200).json(produtosComQuery)
};

const detalharProdutos = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensagem: "[ERRO] Declare o ID do produto" })
    };

    const produto = await knex('produtos').where({ id });

    if (!produto) {
        return res.status(400).json({ mensagem: "[ERRO] Não foi possivel encontrar o produto" })
    };

    return res.status(200).json(produto[0])
};

const removerProdutos = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExistente = await knex('produtos').where({ id }).first()

        if (!produtoExistente) {
            return res.status(400).json({ mensagem: 'Produto não encontrado' })
        }

        await knex('produtos').where({ id }).del();
        return res.status(200).json({ mensagem: 'Produto excluído com sucesso' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

module.exports = {
    cadastrarProdutos,
    editarProduto,
    listarProdutos,
    detalharProdutos,
    removerProdutos
};