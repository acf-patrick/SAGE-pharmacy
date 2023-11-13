-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ORDERED', 'PENDING', 'RECEIVED', 'FINISHED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'ORDERED';
