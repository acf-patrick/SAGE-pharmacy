-- DropForeignKey
ALTER TABLE "OrderMedicine" DROP CONSTRAINT "OrderMedicine_medicineFromProviderId_fkey";

-- AddForeignKey
ALTER TABLE "OrderMedicine" ADD CONSTRAINT "OrderMedicine_medicineFromProviderId_fkey" FOREIGN KEY ("medicineFromProviderId") REFERENCES "MedicineFromProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
