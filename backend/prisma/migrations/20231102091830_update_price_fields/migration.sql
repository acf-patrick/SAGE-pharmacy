/*
  Warnings:

  - You are about to drop the column `priceWithTax` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `priceWithoutTax` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `isTaxed` on the `MedicineFromProvider` table. All the data in the column will be lost.
  - Added the required column `costPrice` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingPrice` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "priceWithTax",
DROP COLUMN "priceWithoutTax",
ADD COLUMN     "costPrice" INTEGER NOT NULL,
ADD COLUMN     "sellingPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MedicineFromProvider" DROP COLUMN "isTaxed";
