/*
  Warnings:

  - You are about to drop the `Day` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exception` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DayToMenuItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExceptionToMenuItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `ButteryMetaData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ItemRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `MenuItemToIngredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `PermissionType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `TransactionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DayToMenuItem" DROP CONSTRAINT "_DayToMenuItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_DayToMenuItem" DROP CONSTRAINT "_DayToMenuItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_ExceptionToMenuItem" DROP CONSTRAINT "_ExceptionToMenuItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExceptionToMenuItem" DROP CONSTRAINT "_ExceptionToMenuItem_B_fkey";

-- AlterTable
ALTER TABLE "ButteryMetaData" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "College" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ItemRating" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "MenuItemToIngredients" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PermissionType" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TransactionHistory" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TransactionItem" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Day";

-- DropTable
DROP TABLE "Exception";

-- DropTable
DROP TABLE "_DayToMenuItem";

-- DropTable
DROP TABLE "_ExceptionToMenuItem";

-- CreateTable
CREATE TABLE "Availability" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AvailabilityToMenuItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AvailabilityToMenuItem_AB_unique" ON "_AvailabilityToMenuItem"("A", "B");

-- CreateIndex
CREATE INDEX "_AvailabilityToMenuItem_B_index" ON "_AvailabilityToMenuItem"("B");

-- AddForeignKey
ALTER TABLE "_AvailabilityToMenuItem" ADD FOREIGN KEY ("A") REFERENCES "Availability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailabilityToMenuItem" ADD FOREIGN KEY ("B") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
