-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "minQuantity" INTEGER DEFAULT 0,
ALTER COLUMN "min" DROP NOT NULL;
