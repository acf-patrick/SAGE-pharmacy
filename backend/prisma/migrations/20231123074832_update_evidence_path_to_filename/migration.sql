/*
  Warnings:

  - You are about to drop the column `path` on the `Evidence` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Evidence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evidence" DROP COLUMN "path",
ADD COLUMN     "filename" TEXT NOT NULL;
