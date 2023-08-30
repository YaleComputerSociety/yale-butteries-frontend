/*
  Warnings:

  - You are about to drop the column `day` on the `ButteryTime` table. All the data in the column will be lost.
  - You are about to drop the column `addison_suxz` on the `College` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[collegeId]` on the table `ButteryTime` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `days` to the `ButteryTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ButteryTime" DROP COLUMN "day",
ADD COLUMN     "days" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "College" DROP COLUMN "addison_suxz";

-- CreateIndex
CREATE UNIQUE INDEX "ButteryTime_collegeId_key" ON "ButteryTime"("collegeId");
