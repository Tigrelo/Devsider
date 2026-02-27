const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.criar = async (dados) => {
  return await prisma.campanha.create({
    data: dados,
  });
};

exports.listar = async () => {
  return await prisma.campanha.findMany({
    orderBy: { id: "desc" },
  });
};

exports.disparar = async (campanhaId) => {
  const campanha = await prisma.campanha.findUnique({
    where: { id: campanhaId },
  });
  if (!campanha) throw new Error("Campanha não encontrada");

  const contatos = await prisma.contato.findMany();

  for (const contato of contatos) {
    const delay =
      Math.floor(Math.random() * (campanha.delayMax - campanha.delayMin + 1)) +
      campanha.delayMin;

    await prisma.filaEnvio.create({
      data: {
        contatoId: contato.id,
        mensagem: campanha.mensagem,
        agendadoPara: new Date(Date.now() + delay * 1000),
      },
    });
  }

  return { status: "Campanha agendada", total: contatos.length };
};