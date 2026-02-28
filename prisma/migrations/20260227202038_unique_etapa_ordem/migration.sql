/*
  Warnings:

  - A unique constraint covering the columns `[fluxoId,ordem]` on the table `FluxoEtapa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FluxoEtapa_fluxoId_ordem_key" ON "FluxoEtapa"("fluxoId", "ordem");
