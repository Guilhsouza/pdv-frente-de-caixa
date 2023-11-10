const joi = require('joi');

const clienteSchema = joi.object({
  nome: joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório!',
    'string.empty': 'O campo nome deve ser preenchido com um texto!',
    'string.base': 'O campo nome deve ser do tipo texto!',
  }),

  email: joi.string().email().required().messages({
    'any.required': 'O campo e-mail é obrigatório!',
    'string.empty': 'O campo e-mail deve ser preenchido com um e-mail válido!',
    'string.base': 'O campo e-mail deve ser um e-mail válido!',
    'string.email': 'O campo e-mail deve ser um e-mail válido!'
  }),

  cpf:
    joi.string().min(11).required().messages({
      'any.required': 'O campo CPF é obrigatório!',
      'string.empty': 'O campo CPF deve ser preenchido com numeros!',
      'string.base': 'O campo CPF deve ser um CPF válido!',
      'string.min': 'O campo CPF deve conter 11 dígitos'
    }),

  cep: joi.string().min(8).required().messages({
    'any.required': 'O campo CEP é obrigatório!',
    'string.empty': 'O campo CEP deve ser preenchido com numeros!',
    'string.base': 'O campo CEP deve ser um CEP válido!',
    'string.min': 'O campo CEP deve conter 8 dígitos'
  }),

  rua: joi.string().required().messages({
    'any.required': 'O campo rua é obrigatório!',
    'string.empty': 'O campo rua deve ser preenchido com um texto!',
    'string.base': 'O campo rua deve ser do tipo texto!',
  }),

  numero: joi.number().integer().positive().required().messages({
    'any.required': 'O campo numero é obrigatório!',
    'string.empty': 'O campo numero deve ser preenchido com numeros!',
    'string.base': 'O campo numero deve ser um númer!',
  }),

  bairro: joi.string().required().messages({
    'any.required': 'O campo bairro é obrigatório!',
    'string.empty': 'O campo bairro deve ser preenchido com um texto!',
    'string.base': 'O campo bairro deve ser do tipo texto!',
  }),

  cidade: joi.string().required().messages({
    'any.required': 'O campo cidade é obrigatório!',
    'string.empty': 'O campo cidade deve ser preenchido com um texto!',
    'string.base': 'O campo cidade deve ser do tipo texto!',
  }),

  estado: joi.string().required().messages({
    'any.required': 'O campo estado é obrigatório!',
    'string.empty': 'O campo estado deve ser preenchido com um texto!',
    'string.base':
      'O campo estado deve ser do tipo texto com a sigla do estado!',
  }),
});

module.exports = clienteSchema;
