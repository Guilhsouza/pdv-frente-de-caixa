const knex = require('../database/conexao')

const cadastrarProdutos = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    try {
        if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
            return res.status(400).json({ mensagem: 'Estão faltando campos obrigatórios' })
        }

        const buscarCategoria = await knex('categorias').where('id', categoria_id).first()

        if (!buscarCategoria) {
            return res.status(404).json({ mensagem: 'A categoria não foi encontrada!' })
        }

        const produto = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }

        const adicionarProduto = await knex('produtos').insert(produto).returning('*')

        return res.status(201).json({ mensagem: 'Produto criado com sucesso', adicionarProduto })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'erro interno no servidor' })
    }

}

module.exports = {
    cadastrarProdutos
}