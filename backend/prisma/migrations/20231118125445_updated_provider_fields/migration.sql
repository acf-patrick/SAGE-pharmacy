/*
  Warnings:

  - You are about to alter the column `commonAccountNumber` on the `Provider` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Provider" ALTER COLUMN "cif" SET DATA TYPE TEXT,
ALTER COLUMN "commonAccountNumber" SET DATA TYPE INTEGER,
ALTER COLUMN "nif" SET DATA TYPE TEXT,
ALTER COLUMN "stat" SET DATA TYPE TEXT;
