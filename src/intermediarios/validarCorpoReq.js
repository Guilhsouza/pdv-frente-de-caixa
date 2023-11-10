const validarCorpoReq = (schemaJoi) => async (req, res, next) => {
    try {
        await schemaJoi.validateAsync(req.body)
        next()
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = validarCorpoReq