/*
  Warnings:

  - You are about to drop the column `evidences` on the `ArchivedOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArchivedOrder" DROP COLUMN "evidences";

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_archivedOrderId_fkey" FOREIGN KEY ("archivedOrderId") REFERENCES "ArchivedOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
