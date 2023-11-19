/*
  Warnings:

  - You are about to drop the column `accountName` on the `Provider` table. All the data in the column will be lost.
  - Added the required column `accountNumber` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "accountName",
ADD COLUMN     "accountNumber" TEXT NOT NULL;
