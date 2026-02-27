-- CreateTable
CREATE TABLE "Contato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Campanha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mensagem" TEXT NOT NULL,
    "delayMin" INTEGER NOT NULL,
    "delayMax" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativa',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FilaEnvio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contatoId" INTEGER NOT NULL,
    "mensagem" TEXT NOT NULL,
    "agendadoPara" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "tentativa" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "FilaEnvio_contatoId_fkey" FOREIGN KEY ("contatoId") REFERENCES "Contato" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fluxo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "FluxoEtapa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fluxoId" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,
    "mensagem" TEXT NOT NULL,
    "delaySeg" INTEGER NOT NULL,
    CONSTRAINT "FluxoEtapa_fluxoId_fkey" FOREIGN KEY ("fluxoId") REFERENCES "Fluxo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExecucaoFluxo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contatoId" INTEGER NOT NULL,
    "fluxoId" INTEGER NOT NULL,
    "etapaAtual" INTEGER NOT NULL,
    "proximaExecucao" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    CONSTRAINT "ExecucaoFluxo_contatoId_fkey" FOREIGN KEY ("contatoId") REFERENCES "Contato" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExecucaoFluxo_fluxoId_fkey" FOREIGN KEY ("fluxoId") REFERENCES "Fluxo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
