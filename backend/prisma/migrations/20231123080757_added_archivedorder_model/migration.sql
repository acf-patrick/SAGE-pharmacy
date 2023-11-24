-- AlterTable
ALTER TABLE "Evidence" ADD COLUMN     "archivedOrderId" TEXT;

-- CreateTable
CREATE TABLE "ArchivedOrder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "providerName" TEXT NOT NULL,
    "orderCreationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArchivedOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_archivedOrderId_fkey" FOREIGN KEY ("archivedOrderId") REFERENCES "ArchivedOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
