/*
  Warnings:

  - A unique constraint covering the columns `[contatoId,fluxoId]` on the table `ExecucaoFluxo` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilaEnvio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contatoId" INTEGER NOT NULL,
    "mensagem" TEXT NOT NULL,
    "agendadoPara" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "tentativa" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FilaEnvio_contatoId_fkey" FOREIGN KEY ("contatoId") REFERENCES "Contato" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FilaEnvio" ("agendadoPara", "contatoId", "id", "mensagem", "status", "tentativa") SELECT "agendadoPara", "contatoId", "id", "mensagem", "status", "tentativa" FROM "FilaEnvio";
DROP TABLE "FilaEnvio";
ALTER TABLE "new_FilaEnvio" RENAME TO "FilaEnvio";
CREATE INDEX "FilaEnvio_status_agendadoPara_idx" ON "FilaEnvio"("status", "agendadoPara");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ExecucaoFluxo_contatoId_fluxoId_key" ON "ExecucaoFluxo"("contatoId", "fluxoId");
