/*
  Warnings:

  - A unique constraint covering the columns `[medicineFromProviderId]` on the table `OrderMedicine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderMedicine_medicineFromProviderId_key" ON "OrderMedicine"("medicineFromProviderId");
