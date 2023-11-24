/*
  Warnings:

  - You are about to drop the `Evidence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_archivedOrderId_fkey";

-- DropForeignKey
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_orderId_fkey";

-- DropTable
DROP TABLE "Evidence";

-- CreateTable
CREATE TABLE "Receipt" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "orderId" TEXT,
    "archivedOrderId" TEXT,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_archivedOrderId_fkey" FOREIGN KEY ("archivedOrderId") REFERENCES "ArchivedOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
