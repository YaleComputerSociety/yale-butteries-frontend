/*
  Warnings:

  - You are about to drop the column `endedAt` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "endedAt",
ADD COLUMN     "readyAt" TIMESTAMP(3);
