const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.criar = async (dados) => {
  return await prisma.contato.create({
    data: dados,
  });
};

exports.listar = async () => {
  return await prisma.contato.findMany({
    orderBy: { id: "desc" }
  });
};