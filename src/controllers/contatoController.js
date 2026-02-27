const contatoService = require("../services/contatoService");

exports.criar = async (req, res) => {
  try {
    const contato = await contatoService.criar(req.body);
    res.status(201).json(contato);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const contatos = await contatoService.listar();
    res.json(contatos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};