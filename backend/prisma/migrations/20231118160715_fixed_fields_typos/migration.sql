/*
  Warnings:

  - You are about to drop the column `City` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `Country` on the `Provider` table. All the data in the column will be lost.
  - Added the required column `city` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "City",
DROP COLUMN "Country",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;
