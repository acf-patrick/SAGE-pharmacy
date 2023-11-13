/*
  Warnings:

  - Made the column `providerId` on table `MedicineFromProvider` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MedicineFromProvider" DROP CONSTRAINT "MedicineFromProvider_providerId_fkey";

-- AlterTable
ALTER TABLE "MedicineFromProvider" ALTER COLUMN "providerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "MedicineFromProvider" ADD CONSTRAINT "MedicineFromProvider_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
