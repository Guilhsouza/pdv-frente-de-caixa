const joi = require('joi')

const validacaoTipoNumero = (campo) => {
    return joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'any.required': `O campo ${campo} é obrigatório!`,
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
            'string.alphanum': 'Observação só pode conter letrar e números, sem caracteres especiais'
        }),

    pedido_produtos: joi.array().items(
        joi.object({
            produto_id: validacaoTipoNumero('produto ID'),

            quantidade_produto: validacaoTipoNumero('quantidade')
        })).required()
        .messages({
            'array.base': 'Pedido produtos precisa ser do tipo array!',
            'any.required': 'É preciso ter ao menos um produto para concluir o pedido!'
        })
})

module.exports = pedidoSchema