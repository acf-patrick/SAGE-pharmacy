/*
  Warnings:

  - You are about to drop the column `costPrice` on the `Medicine` table. All the data in the column will be lost.
  - Added the required column `alerte` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `family` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `real` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "costPrice",
ADD COLUMN     "alerte" INTEGER NOT NULL,
ADD COLUMN     "family" TEXT NOT NULL,
ADD COLUMN     "nomenclature" TEXT,
ADD COLUMN     "real" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Standard';
