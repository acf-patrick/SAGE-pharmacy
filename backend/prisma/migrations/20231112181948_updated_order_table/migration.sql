-- DropForeignKey
ALTER TABLE "OrderMedicine" DROP CONSTRAINT "OrderMedicine_orderId_fkey";

-- AlterTable
ALTER TABLE "OrderMedicine" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderMedicine" ADD CONSTRAINT "OrderMedicine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
