const joi = require('joi')

const validarProdutos = (schemaJoi) => async (req, res, next) => {
    try {
        await schemaJoi.validateAsync(req.body)
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

module.exports = validarProdutos