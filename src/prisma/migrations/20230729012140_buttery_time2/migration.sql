/*
  Warnings:

  - You are about to drop the `ButteryTime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ButteryTime" DROP CONSTRAINT "ButteryTime_collegeId_fkey";

-- AlterTable
ALTER TABLE "College" ADD COLUMN     "closeTime" TEXT,
ADD COLUMN     "daysOpen" TEXT,
ADD COLUMN     "isOpen" BOOLEAN,
ADD COLUMN     "openTime" TEXT,
ALTER COLUMN "buttery_activated" DROP NOT NULL;

-- DropTable
DROP TABLE "ButteryTime";
