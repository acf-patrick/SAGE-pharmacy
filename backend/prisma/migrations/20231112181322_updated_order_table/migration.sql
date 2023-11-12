/*
  Warnings:

  - You are about to drop the column `orderId` on the `MedicineFromProvider` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MedicineFromProvider" DROP CONSTRAINT "MedicineFromProvider_orderId_fkey";

-- AlterTable
ALTER TABLE "MedicineFromProvider" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "OrderMedicine" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "medicineFromProviderId" TEXT NOT NULL,

    CONSTRAINT "OrderMedicine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderMedicine" ADD CONSTRAINT "OrderMedicine_medicineFromProviderId_fkey" FOREIGN KEY ("medicineFromProviderId") REFERENCES "MedicineFromProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderMedicine" ADD CONSTRAINT "OrderMedicine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
