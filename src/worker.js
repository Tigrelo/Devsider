const { processarFila } = require('./services/filaService');

console.log("🚀 Worker rodando...");

setInterval(async () => {
  try {
    await processarFila();
  } catch (err) {
    console.error("Erro no worker:", err);
  }
}, 5000);