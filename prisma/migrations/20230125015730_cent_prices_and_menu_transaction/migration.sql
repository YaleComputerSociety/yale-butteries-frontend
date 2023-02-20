/*
  Warnings:

  - You are about to alter the column `price` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `price` on the `MenuItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `total_price` on the `TransactionHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `item_cost` on the `TransactionItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- DropIndex
DROP INDEX "TransactionItem_menuItemId_key";

-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "MenuItem" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TransactionHistory" ALTER COLUMN "total_price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TransactionItem" ALTER COLUMN "item_cost" SET DATA TYPE INTEGER;
