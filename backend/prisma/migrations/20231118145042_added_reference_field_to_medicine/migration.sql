/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reference` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "reference" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_reference_key" ON "Medicine"("reference");
