const knex = require('../database/conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
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
        const usuario = await knex('usuarios')
        .insert({nome, email, senha})
        .returning('*');

        if(usuario.length === 0) {
            return res.status(400).json({ mensagem: 'Não foi possivel cadastrar o usuário.' })
        }

        return res.status(200).json(usuario[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'erro no servidor' })
    }
};

const listarUsuario = async (req, res) => {
    try {
        const usuarios = await knex('usuarios');
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario,
    listarUsuario
}