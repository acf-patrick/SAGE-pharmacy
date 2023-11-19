/*
  Warnings:

  - Added the required column `City` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Country` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `abridgment` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountName` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collector` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commonAccountNumber` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "City" TEXT NOT NULL,
ADD COLUMN     "Country" TEXT NOT NULL,
ADD COLUMN     "abridgment" TEXT NOT NULL,
ADD COLUMN     "accountName" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cif" BIGINT,
ADD COLUMN     "collector" TEXT NOT NULL,
ADD COLUMN     "commonAccountNumber" BIGINT NOT NULL,
ADD COLUMN     "complementAdress" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "nif" BIGINT,
ADD COLUMN     "postalCode" INTEGER,
ADD COLUMN     "rc" TEXT,
ADD COLUMN     "stat" BIGINT,
ADD COLUMN     "telecopie" TEXT,
ADD COLUMN     "telephone" TEXT[],
ALTER COLUMN "min" SET DEFAULT 1;
