const knex = require('../database/conexao')
const enviar = require('../servicos/nodemailer')

const cadastrarPedidos = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body
    const valoresDoPedido = []

    try {
        const cliente = await knex('clientes').where('id', cliente_id).first()

        if (!cliente) {
            return res.status(404).json({ mensagem: 'O cliente não foi encontrado!' })
        }

        for (let produtos of pedido_produtos) {
            const produtoNoEstoque = await knex('produtos').where('id', produtos.produto_id).first()

            if (!produtoNoEstoque) {
                return res.status(404).json({ mensagem: `O produto não foi encontrado!` })
            }

            if (produtoNoEstoque.quantidade_estoque < produtos.quantidade_produto) {
                return res.status(400).json({ mensagem: `O produto ${produtoNoEstoque.descricao} não tem a quantidade suficiente para efetuar o pedido.`, estoque: produtoNoEstoque.quantidade_estoque })
            }

            const valorAtualizadoEstoque = produtoNoEstoque.quantidade_estoque - produtos.quantidade_produto

            await knex('produtos').update('quantidade_estoque', valorAtualizadoEstoque).where('id', produtos.produto_id)

            const valorTotalDoProduto = produtoNoEstoque.valor * produtos.quantidade_produto

            valoresDoPedido.push(valorTotalDoProduto)
        }


        const valorTotal = valoresDoPedido.reduce((acumulador, valor) => acumulador + valor)

        const cadastrarPedido = await knex('pedidos').insert({ cliente_id, observacao, valor_total: valorTotal }).returning('id')

        for (let produtos of pedido_produtos) {
            const produto = await knex('produtos').where('id', produtos.produto_id).first()

            await knex('pedido_produtos')
                .insert({
                    pedido_id: cadastrarPedido[0].id,
                    produto_id: produtos.produto_id,
                    quantidade_produto: produtos.quantidade_produto,
                    valor_produto: produto.valor
                })
        }

        const textoEmail = `Parabéns pela compra ${cliente.nome}, já que os produtos estão na sua casa!!`

        enviar(cliente.email, 'Compra Efetuada com Sucesso!', textoEmail)

        return res.status(204).send()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
    }

}

const listarPedidos = async (req, res) => {
    try {
        const clienteId = req.query.clienteId;

        const consulta = knex('pedidos');

        if (clienteId) {
            consulta.where('cliente_id', clienteId);
        }

        const pedidos = await consulta;

        return res.status(200).json(pedidos);
    } catch (error) {
        console.error("Erro ao listar pedidos:", error);
        return res.status(400).json({ error: "Erro interno do servidor." });
    }
}

module.exports = {
    cadastrarPedidos,
    listarPedidos,
}