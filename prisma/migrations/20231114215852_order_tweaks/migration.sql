/*
  Warnings:

  - You are about to drop the column `placedAt` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "placedAt";

-- AlterTable
ALTER TABLE "order_item" ALTER COLUMN "status" DROP DEFAULT;
