/*
  Warnings:

  - You are about to drop the column `costPrice` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `medicineId` on the `MedicineFromProvider` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.
  - Made the column `dci` on table `MedicineFromProvider` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MedicineFromProvider" DROP CONSTRAINT "MedicineFromProvider_medicineId_fkey";

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "costPrice",
ADD COLUMN     "medicineFromProviderId" TEXT;

-- AlterTable
ALTER TABLE "MedicineFromProvider" DROP COLUMN "medicineId",
ALTER COLUMN "dci" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_name_key" ON "Medicine"("name");

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_medicineFromProviderId_fkey" FOREIGN KEY ("medicineFromProviderId") REFERENCES "MedicineFromProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
