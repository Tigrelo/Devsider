const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.processarFila = async () => {
  const agora = new Date();

  const envios = await prisma.filaEnvio.findMany({
    where: {
      status: "pendente",
      agendadoPara: {
        lte: agora
      }
    },
    include: {
      contato: true
    }
  });

  for (const envio of envios) {
    try {
      console.log("📤 Enviando para:", envio.contato.telefone);
      console.log("Mensagem:", envio.mensagem);

      // Simulação de envio
      await prisma.filaEnvio.update({
        where: { id: envio.id },
        data: { status: "enviado" }
      });

    } catch (err) {
      console.error("Erro ao enviar:", err);

      await prisma.filaEnvio.update({
        where: { id: envio.id },
        data: {
          tentativa: envio.tentativa + 1
        }
      });
    }
  }
};