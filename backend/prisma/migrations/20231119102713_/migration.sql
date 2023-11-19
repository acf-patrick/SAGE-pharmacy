/*
  Warnings:

  - You are about to drop the column `medicineId` on the `MedicineFromProvider` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MedicineFromProvider" DROP CONSTRAINT "MedicineFromProvider_medicineId_fkey";

-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "medicineFromProviderId" TEXT;

-- AlterTable
ALTER TABLE "MedicineFromProvider" DROP COLUMN "medicineId";

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_medicineFromProviderId_fkey" FOREIGN KEY ("medicineFromProviderId") REFERENCES "MedicineFromProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
