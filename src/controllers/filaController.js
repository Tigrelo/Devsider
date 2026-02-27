const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.criar = async (req, res) => {
  try {
    const { contatoId, mensagem, agendadoPara } = req.body;

    const envio = await prisma.filaEnvio.create({
      data: {
        contatoId,
        mensagem,
        agendadoPara: new Date(agendadoPara)
      }
    });

    res.json(envio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar envio na fila" });
  }
};