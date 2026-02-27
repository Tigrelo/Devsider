const fluxoService = require("../services/fluxoService");

exports.criarFluxo = async (req, res) => {
  try {
    const fluxo = await fluxoService.criarFluxo(req.body);
    res.status(201).json(fluxo);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.listarFluxos = async (req, res) => {
  try {
    const fluxos = await fluxoService.listarFluxos();
    res.json(fluxos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.criarEtapa = async (req, res) => {
  try {
    const etapa = await fluxoService.criarEtapa(Number(req.params.id), req.body);
    res.status(201).json(etapa);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.listarEtapas = async (req, res) => {
  try {
    const etapas = await fluxoService.listarEtapas(Number(req.params.id));
    res.json(etapas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.adicionarContatos = async (req, res) => {
  try {
    const result = await fluxoService.adicionarTodosContatosAoFluxo(Number(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};