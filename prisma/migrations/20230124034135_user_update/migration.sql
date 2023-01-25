/*
  Warnings:

  - You are about to drop the column `credit_card_hash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `PermissionType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PermissionTypeToPosition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_positionId_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionTypeToPosition" DROP CONSTRAINT "_PermissionTypeToPosition_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionTypeToPosition" DROP CONSTRAINT "_PermissionTypeToPosition_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "credit_card_hash",
DROP COLUMN "positionId";

-- DropTable
DROP TABLE "PermissionType";

-- DropTable
DROP TABLE "Position";

-- DropTable
DROP TABLE "_PermissionTypeToPosition";
