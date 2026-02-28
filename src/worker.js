const { PrismaClient } = require("@prisma/client");
const { processarFila } = require("./services/filaService");

const prisma = new PrismaClient();

console.log("🚀 Worker rodando...");

async function processarFluxos() {
  const agora = new Date();

  const execucoes = await prisma.execucaoFluxo.findMany({
    where: { status: "ativo", proximaExecucao: { lte: agora } },
    orderBy: { proximaExecucao: "asc" },
    take: 50,
  });

  for (const exec of execucoes) {
    const etapa = await prisma.fluxoEtapa.findFirst({
      where: { fluxoId: exec.fluxoId, ordem: exec.etapaAtual },
    });

    // terminou o fluxo
    if (!etapa) {
      await prisma.execucaoFluxo.update({
        where: { id: exec.id },
        data: { status: "finalizado" },
      });
      console.log(`Fluxo finalizado para contato ${exec.contatoId}`);
      continue;
    }

    console.log(
      ` Executando etapa ${exec.etapaAtual} (fluxo ${exec.fluxoId}) para contato ${exec.contatoId}`
    );

    // Cria envio imediato na fila
    await prisma.filaEnvio.create({
      data: {
        contatoId: exec.contatoId,
        mensagem: etapa.mensagem,
        agendadoPara: new Date(),
      },
    });

    // Agenda próxima etapa
    await prisma.execucaoFluxo.update({
      where: { id: exec.id },
      data: {
        etapaAtual: exec.etapaAtual + 1,
        proximaExecucao: new Date(Date.now() + etapa.delaySeg * 1000),
      },
    });
  }
}

setInterval(async () => {
  try {
    await processarFluxos();
    await processarFila();
  } catch (err) {
    console.error("Erro no worker:", err?.message || err);
  }
}, 3000);

