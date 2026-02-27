const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.criarFluxo = async ({ nome }) => {
  return await prisma.fluxo.create({
    data: { nome },
  });
};

exports.listarFluxos = async () => {
  return await prisma.fluxo.findMany({
    orderBy: { id: "desc" },
  });
};

exports.criarEtapa = async (fluxoId, { ordem, mensagem, delaySeg }) => {
  return await prisma.fluxoEtapa.create({
    data: {
      fluxoId,
      ordem,
      mensagem,
      delaySeg,
    },
  });
};

exports.listarEtapas = async (fluxoId) => {
  return await prisma.fluxoEtapa.findMany({
    where: { fluxoId },
    orderBy: { ordem: "asc" },
  });
};

exports.adicionarTodosContatosAoFluxo = async (fluxoId) => {
  const contatos = await prisma.contato.findMany();

  for (const contato of contatos) {
    await prisma.execucaoFluxo.upsert({
      where: {
        contatoId_fluxoId: {
          contatoId: contato.id,
          fluxoId,
        },
      },
      update: {}, 
      create: {
        contatoId: contato.id,
        fluxoId,
        etapaAtual: 1,
        proximaExecucao: new Date(),
        status: "ativo",
      },
    });
  }

  return { status: "Contatos adicionados ao fluxo", total: contatos.length };
};