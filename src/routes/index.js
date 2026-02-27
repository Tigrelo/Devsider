const express = require("express");
const router = express.Router();

const contatoController = require("../controllers/contatoController");
const campanhaController = require("../controllers/campanhaController");

router.post("/contatos", contatoController.criar);
router.get("/contatos", contatoController.listar);

router.post("/campanhas", campanhaController.criar);
router.get("/campanhas", campanhaController.listar);

module.exports = router;