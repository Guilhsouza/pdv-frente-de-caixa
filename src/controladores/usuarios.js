const knex = require('../database/conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome) {
        return res.status(404).json("O campo nome é obrigatório");
    }

    if (!email) {
        return res.status(404).json("O campo email é obrigatório");
    }

    if (!senha) {
        return res.status(404).json("O campo senha é obrigatório");
    }

    try {

    } catch (error) {
        console.log(error.message);
        return res.status(500).jsno({ mensagem: 'erro no servidor' })
    }
};

module.exports = {
    cadastrarUsuario
}