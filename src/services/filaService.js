const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const MAX_TENTATIVAS = 3;

exports.processarFila = async () => {
  const agora = new Date();

  // Pega envios pendentes e já "trava" como processando (para evitar duplicidade)
  const pendentes = await prisma.filaEnvio.findMany({
    where: {
      status: "pendente",
      agendadoPara: { lte: agora },
      tentativa: { lt: MAX_TENTATIVAS },
    },
    include: { contato: true },
    orderBy: { agendadoPara: "asc" },
    take: 20,
  });

  for (const envio of pendentes) {
    // lock otimista: só processa se ainda estiver pendente
    const locked = await prisma.filaEnvio.updateMany({
      where: { id: envio.id, status: "pendente" },
      data: { status: "processando" },
    });

    if (locked.count === 0) continue;

    try {
      // ✅ aqui entraria WPPConnect no futuro
      console.log("📤 Enviando para:", envio.contato.telefone);
      console.log("Mensagem:", envio.mensagem);

      await prisma.filaEnvio.update({
        where: { id: envio.id },
        data: { status: "enviado" },
      });
    } catch (err) {
      console.error("Erro ao enviar:", err?.message || err);

      const tentativaNova = envio.tentativa + 1;

      await prisma.filaEnvio.update({
        where: { id: envio.id },
        data: {
          tentativa: tentativaNova,
          status: tentativaNova >= MAX_TENTATIVAS ? "erro" : "pendente",
        },
      });
    }
  }
};