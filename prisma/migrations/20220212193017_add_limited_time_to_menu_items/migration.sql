/*
  Warnings:

  - Added the required column `limited_time` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "limited_time" BOOLEAN NOT NULL;
