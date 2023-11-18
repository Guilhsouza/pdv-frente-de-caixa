const knex = require("../database/conexao");
const { uploadImagem, removeImagem } = require("../upload");

const cadastrarProdutos = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const imagem = req.file

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

        if (imagem) {
            try {
                const novaImagem = imagem.originalname.split(' ').join('-')
                const produto_id = adicionarProduto[0].id

                const imagemProduto = await uploadImagem(`produtos/${produto_id}/${novaImagem}`,
                    imagem.buffer,
                    imagem.mimetype
                )
                const atualizarImagem = await knex('produtos').update('produto_imagem', imagemProduto.imagem).where('id', produto_id).returning('*')
                return res.status(201).json(atualizarImagem[0])
            } catch (error) {

                return res.status(500).json({ message: 'Erro interno do servidor.' })
            }
        }

        return res
            .status(201)
            .json({ mensagem: 'Produto criado com sucesso', adicionarProduto });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'erro interno no servidor' });
    }
};

const editarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const imagem = req.file

    try {
        const descricaoExistente = await knex('produtos')
            .where({ descricao })
            .andWhere('id', '!=', id)
            .first();

        if (descricaoExistente) {
            return res.status(409).json({ mensagem: 'Produto com essa descrição já cadastrado' });
        }

        if (imagem) {
            try {
                const imagemNome = imagem.originalname.split(' ').join('-')

                const produto = await knex('produtos').where({ id }).first()

                if (produto.produto_imagem !== null) {
                    const indexPath = produto.produto_imagem.indexOf(produto.id)
                    const path = produto.produto_imagem.slice(indexPath)
                    await removeImagem(`produtos/${path}`)
                }

                const imagemProduto = await uploadImagem(
                    `produtos/${id}/${imagemNome}`,
                    imagem.buffer,
                    imagem.mimetype
                )

                const atualizarProduto = await knex('produtos')
                    .where({ id })
                    .update({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem: imagemProduto.imagem })
                    .returning('*');

                return res.status(201).json(atualizarProduto[0])
            } catch (error) {
                return res.status(500).json({ message: 'Erro interno do servidor.' })
            }
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
        console.log(error);
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
        const produtoPedido = await knex('pedido_produtos').where('produto_id', id)

        if (produtoPedido.length > 0) {
            return res.status(400).json({ mensagem: `[ERRO] Não é possivel excluir um produto enquanto há uma solitação (pedido) dele em aberto` })
        }

        await knex('produtos').where({ id }).del();

        if (produtoExcluido[0].produto_imagem !== null) {
            const pathIndex = produtoExcluido[0].produto_imagem.indexOf(produtoExcluido[0].id);
            const path = produtoExcluido[0].produto_imagem.slice(pathIndex);
            await removeImagem(`produtos/${path}`);
        }

        return res.status(200).json({ mensagem: 'Produto excluído com sucesso' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

module.exports = {
    cadastrarProdutos,
    editarProduto,
    listarProdutos,
    detalharProdutos,
    removerProdutos
};
