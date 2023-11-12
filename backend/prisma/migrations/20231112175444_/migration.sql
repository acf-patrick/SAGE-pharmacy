/*
  Warnings:

  - You are about to drop the column `medicineFromProviderId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerName]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_medicineFromProviderId_fkey";

-- DropIndex
DROP INDEX "Order_medicineFromProviderId_key";

-- AlterTable
ALTER TABLE "MedicineFromProvider" ADD COLUMN     "orderId" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "medicineFromProviderId",
ADD COLUMN     "providerName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_providerName_key" ON "Order"("providerName");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_name_key" ON "Provider"("name");

-- AddForeignKey
ALTER TABLE "MedicineFromProvider" ADD CONSTRAINT "MedicineFromProvider_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_providerName_fkey" FOREIGN KEY ("providerName") REFERENCES "Provider"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
