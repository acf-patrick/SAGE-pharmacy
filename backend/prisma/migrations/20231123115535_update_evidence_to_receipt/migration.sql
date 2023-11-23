/*
  Warnings:

  - You are about to drop the `Evidence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_orderId_fkey";

-- DropTable
DROP TABLE "Evidence";

-- CreateTable
CREATE TABLE "Receipt" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "orderId" TEXT,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
