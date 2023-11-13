/*
  Warnings:

  - A unique constraint covering the columns `[medicineFromProviderId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_medicineFromProviderId_key" ON "Order"("medicineFromProviderId");
