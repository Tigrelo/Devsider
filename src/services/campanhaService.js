const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.criar = async (dados) => {
  return await prisma.campanha.create({
    data: dados,
  });
};

exports.listar = async () => {
  return await prisma.campanha.findMany({
    orderBy: { id: "desc" }
  });
};