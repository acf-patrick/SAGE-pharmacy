/*
  Warnings:

  - You are about to drop the column `medicineFromProviderId` on the `Medicine` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_medicineFromProviderId_fkey";

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "medicineFromProviderId";

-- AlterTable
ALTER TABLE "MedicineFromProvider" ADD COLUMN     "medicineId" TEXT;

-- AddForeignKey
ALTER TABLE "MedicineFromProvider" ADD CONSTRAINT "MedicineFromProvider_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
