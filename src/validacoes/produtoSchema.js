const joi = require('joi')

const produtoSchema = joi.object({
    descricao: joi.string()
        .required()
        .messages({
            'any.required': 'O campo descrição é obrigatório!',
            'string.empty': 'O campo descrição deve ser do tipo texto!',
            'string.base': 'O campo descrição deve ser do tipo texto!'
        }),
    quantidade_estoque: joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'any.required': 'O campo quantidade de estoque é obrigatório!',
            'number.base': 'O campo quantidade de estoque deve ser um número!',
            'number.integer': 'O campo quantidade de estoque deve ser um número inteiro!',
            'number.positive': 'O campo quantidade de estoque deve ser um número positivo!'
        }),
    valor: joi.number()
        .positive()
        .required()
        .messages({
            'any.required': 'O campo valor é obrigatório!',
            'number.base': 'O campo valor deve ser um número!',
            'number.positive': 'O campo valor deve ser um número positivo!'
        }),
    categoria_id: joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'any.required': 'O campo categoria ID é obrigatório!',
            'number.base': 'O campo categoria ID deve ser um número!',
            'number.positive': 'O campo categoria ID deve ser um número positivo!'
        })
});

module.exports = produtoSchema;