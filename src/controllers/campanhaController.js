const campanhaService = require("../services/campanhaService");

exports.criar = async (req, res) => {
  try {
    const campanha = await campanhaService.criar(req.body);
    res.status(201).json(campanha);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const campanhas = await campanhaService.listar();
    res.json(campanhas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};