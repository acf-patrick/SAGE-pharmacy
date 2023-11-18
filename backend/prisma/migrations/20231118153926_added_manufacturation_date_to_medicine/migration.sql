-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "manufacturationDate" DATE,
ALTER COLUMN "expirationDate" DROP NOT NULL;
