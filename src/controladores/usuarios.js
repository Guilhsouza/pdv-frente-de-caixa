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
        const emailExiste = await knex('usuarios').where({ email });

        if (emailExiste.length > 0) {
            return res.status(400).json("O email já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios')
            .insert({ nome, email, senha: senhaCriptografada })
            .returning('*');

        if (usuario.length === 0) {
            return res.status(400).json({ mensagem: 'Não foi possivel cadastrar o usuário.' })
        }

        const { senha: _, ...usuarioSemSenha } = usuario[0];

        return res.status(200).json(usuarioSemSenha);
    } catch (error) {
        return res.status(500).json({ mensagem: 'erro no servidor' })
    }
};

const detalharUsuarioLogado = async (req, res) => {
    try {
        return res.status(200).json(req.usuario);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const editarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    const { id } = req.usuario

    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'Esta faltando algum campo obrigatório' })
        };

        const usuario = await knex('usuarios').where({ id });

        if (!usuario) {
            return res.status(404).json({ mensagem: 'O usuário não foi encontrado!' })
        };

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        await knex('usuarios')
            .where({ id })
            .update({
                nome,
                email,
                senha: senhaCriptografada
            });

        return res.json({ mensagem: `O usuário ${req.usuario.nome} foi modificado com sucesso!` })
    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = {
    cadastrarUsuario,
    detalharUsuarioLogado,
    editarUsuario
}