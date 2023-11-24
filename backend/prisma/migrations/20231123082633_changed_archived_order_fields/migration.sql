-- DropForeignKey
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_archivedOrderId_fkey";

-- AlterTable
ALTER TABLE "ArchivedOrder" ADD COLUMN     "evidences" TEXT[];
