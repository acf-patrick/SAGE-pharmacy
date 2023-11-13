-- AlterTable
ALTER TABLE "MedicineFromProvider" ADD COLUMN     "medicineId" TEXT;

-- AddForeignKey
ALTER TABLE "MedicineFromProvider" ADD CONSTRAINT "MedicineFromProvider_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
