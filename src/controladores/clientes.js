const knex = require("../database/conexao");
const bcrypt = require("bcrypt");

const listarCliente = async (req, res) => {
  try {
    const listarClientes = await knex("clientes").returning("*");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const detalharCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const buscarCliente = await knex("clientes").where("id", id).first();
    if (!buscarCliente) {
      return res.status(404).json({ mensagem: "Cleinte não encontrado" });
    }
    return res.status(200).json(buscarCliente);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { listarCliente, detalharCliente };
