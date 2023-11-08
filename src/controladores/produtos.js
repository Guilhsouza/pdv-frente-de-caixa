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

const editarDadosProduto = async (req, res) => {
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
        console.log(error.message);
        return res.status(500).json({ mensagem: 'erro interno no servidor' });
    }
};

const removerProduto = async (req, res) => {
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
    editarDadosProduto,
    removerProduto
};
