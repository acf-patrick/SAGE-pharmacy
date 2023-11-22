/*
  Warnings:

  - Made the column `orderId` on table `OrderMedicine` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OrderMedicine" DROP CONSTRAINT "OrderMedicine_orderId_fkey";

-- AlterTable
ALTER TABLE "OrderMedicine" ALTER COLUMN "orderId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderMedicine" ADD CONSTRAINT "OrderMedicine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
