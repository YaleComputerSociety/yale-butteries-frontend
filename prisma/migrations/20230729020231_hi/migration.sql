/*
  Warnings:

  - The `daysOpen` column on the `ButteryTime` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ButteryTime" DROP COLUMN "daysOpen",
ADD COLUMN     "daysOpen" TEXT[];
