const joi = require('joi')

const validacaoTipoNumero = (campo) => {
    return joi.number()
        .integer()
        .positive()
        .messages({
            'number.base': `O campo ${campo} deve ser um número!`,
            'number.integer': `O campo ${campo} deve ser um número inteiro!`,
            'number.positive': `O campo ${campo} deve ser um número positivo!`
        })
}

const pedidoSchema = joi.object({
    cliente_id: validacaoTipoNumero('cliente ID'),

    observacao: joi.string()
        .default('Não foi inserido nenhuma obersavacão.')
        .messages({
            'string.base': 'O campo observacao deve ser um texto!',
        }),

    pedido_produtos: joi.array().items(
        joi.object({
            produto_id: validacaoTipoNumero('produto ID'),

            quantidade_produto: validacaoTipoNumero('quantidade')
        })).messages({
            'array.base': 'Pedido produtos precisa ser do tipo array!',
        })
})

module.exports = pedidoSchema