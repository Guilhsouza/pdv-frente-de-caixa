const knex = require('../database/conexao')

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    if (!nome) {
        return res.status(404).json({
            mensagem: 'O campo nome é obrigatório.'
        })
    }
    if (!email) {
        return res.status(404).json({
            mensagem: 'O campo email é obrigatório.'
        })
    }
<<<<<<< HEAD
=======

>>>>>>> f6187ac9cc01ba258f018e575efb791d344799e7
    if (!cpf) {
        return res.status(404).json({
            mensagem: 'O campo CPF é obrigatório.'
        })
    }

    if (!cep) {
        return res.status(404).json({
            mensagem: 'O campo cep é obrigatório.'
        })
    }

    if (!rua) {
        return res.status(404).json({
            mensagem: 'O campo rua é obrigatório.'
        })
    }

    if (!numero) {
        return res.status(404).json({
            mensagem: 'O campo número é obrigatório.'
        })
    }

    if (!bairro) {
        return res.status(404).json({
            mensagem: 'O campo bairro é obrigatório.'
        })
    }

    if (!cidade) {
        return res.status(404).json({
            mensagem: 'O campo cidade é obrigatório.'
        })
    }

    if (!estado) {
        return res.status(404).json({
            mensagem: 'O campo nome é obrigatório.'
        })
    }


    try {
        const emailExiste = await knex ('clientes').where({email}).first();

        if (emailExiste) {
            return res.status(404).json({
                mensagem: 'Já existe cliente cadastrado com o e-mail informado.'
            });
        }

        const cpfExiste = await knex ('clientes').where({cpf}).first();

        if (cpfExiste) {
            return res.status(404).json({
                mensagem: 'Já existe cliente cadastrado com o CPF informado.'
            })
        }

        const cliente = await knex('clientes')
        .insert({
            nome,
            email,
            cpf, 
            cep,
            rua, 
            numero, 
            bairro, 
            cidade, 
            estado,
        }).returning('*')

        if (!cliente[0]) {
            return res.status(404).json("O usuario não foi cadastraddo.");
        }

        return res.status(200).json(cliente[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarCliente = async (req, res) => {

    const { id } = req.params

    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    if(!nome && !email && !cpf && !cep && !rua && !numero && !bairro && !cidade && !estado) {
        return res.status(404).json('É obrigatório informar ao menos um campo para atualização.')
    }

    try {
        const emailExiste = await knex('clientes').where("email", email).first()
        
        if (emailExiste) {
            return res.status(400).json( 'O e-mail informado já está sendo ultilizado por outro cliente.' );
        }

        const cpfExiste = await knex ('clientes').where("cpf", cpf).first();
        
        if (cpfExiste) {
            return res.status(404).json({
                mensagem: 'O CPF informado já está sendo ultilizado por outro cliente.'
            })
        }


        const clienteAtualizado = await knex('clientes').where("id", id).update ({
            nome,
            email,
            cpf, 
            cep,
            rua, 
            numero, 
            bairro, 
            cidade, 
            estado,
        })

        if(!clienteAtualizado) {
            return res.status(400).json('O cliente não foi atualizado.')
        }

        return res.status(200).json('Usuário foi atualizado com sucesso.');

    } catch (error) {
        return res.status(400).json({
            mensagem: 'Erro interno do servidor.'
        })
    }
}

module.exports = {
    cadastrarCliente,
    atualizarCliente
}