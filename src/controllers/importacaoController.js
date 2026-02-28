const fs = require("fs");
const csv = require("csv-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.importarCSV = async (req, res) => {
  const arquivo = req.file || (req.files && req.files[0]);

  try {
    if (!arquivo) {
      return res.status(400).json({ erro: "Arquivo CSV é obrigatório" });
    }

    const contatos = [];

    fs.createReadStream(arquivo.path)
      .pipe(csv())
      .on("data", (row) => {
        if (row.nome && row.telefone) {
          contatos.push({
            nome: String(row.nome).trim(),
            telefone: String(row.telefone).trim(),
          });
        }
      })
      .on("end", async () => {
        // remove arquivo temporário
        fs.unlink(arquivo.path, () => {});

        if (contatos.length === 0) {
          return res
            .status(400)
            .json({ erro: "CSV sem linhas válidas (nome,telefone)" });
        }

        // remove duplicados dentro do CSV (pelo telefone)
        const telefonesUnicos = new Set();
        const contatosFiltrados = contatos.filter((c) => {
          if (telefonesUnicos.has(c.telefone)) return false;
          telefonesUnicos.add(c.telefone);
          return true;
        });

        let criadas = 0;
        let atualizadas = 0;
        let erros = 0;

        for (const c of contatosFiltrados) {
          try {
            // verifica se já existe pelo telefone (que está @unique)
            const existe = await prisma.contato.findUnique({
              where: { telefone: c.telefone },
              select: { id: true },
            });

            await prisma.contato.upsert({
              where: { telefone: c.telefone },
              update: { nome: c.nome },
              create: c,
            });

            if (existe) atualizadas++;
            else criadas++;
          } catch (e) {
            erros++;
            console.error("Erro no upsert do contato:", c, e);
          }
        }

        return res.json({
          status: "Importação concluída",
          lidas: contatos.length,
          unicasNoArquivo: contatosFiltrados.length,
          criadas,
          atualizadas,
          erros,
        });
      })
      .on("error", (err) => {
        fs.unlink(arquivo.path, () => {});
        return res
          .status(500)
          .json({ erro: "Erro ao ler CSV", detalhe: err.message });
      });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};