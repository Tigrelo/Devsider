const express = require("express");
const router = express.Router();

const filaController = require("../controllers/filaController");
const contatoController = require("../controllers/contatoController");
const campanhaController = require("../controllers/campanhaController");
const fluxoController = require("../controllers/fluxoController");

// Fluxos
router.post("/fluxos", fluxoController.criarFluxo);
router.get("/fluxos", fluxoController.listarFluxos);

router.post("/fluxos/:id/etapas", fluxoController.criarEtapa);
router.get("/fluxos/:id/etapas", fluxoController.listarEtapas);

router.post("/fluxos/:id/adicionar-contatos", fluxoController.adicionarContatos);

// Contatos
router.post("/contatos", contatoController.criar);
router.get("/contatos", contatoController.listar);

// Campanhas
router.post("/campanhas", campanhaController.criar);
router.get("/campanhas", campanhaController.listar);
router.post("/campanhas/:id/disparar", campanhaController.disparar);

// Fila (teste/manual)
router.post("/fila", filaController.criar);

module.exports = router;