/*
  Warnings:

  - You are about to drop the column `closeTime` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `daysOpen` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `isOpen` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `openTime` on the `College` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "College" DROP COLUMN "closeTime",
DROP COLUMN "daysOpen",
DROP COLUMN "isOpen",
DROP COLUMN "openTime";

-- CreateTable
CREATE TABLE "ButteryTime" (
    "id" SERIAL NOT NULL,
    "daysOpen" TEXT,
    "isOpen" BOOLEAN,
    "openTime" TEXT,
    "closeTime" TEXT,
    "collegeId" INTEGER NOT NULL,

    CONSTRAINT "ButteryTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ButteryTime_collegeId_key" ON "ButteryTime"("collegeId");

-- AddForeignKey
ALTER TABLE "ButteryTime" ADD CONSTRAINT "ButteryTime_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
