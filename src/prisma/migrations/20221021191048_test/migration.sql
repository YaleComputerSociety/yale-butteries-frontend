/*
  Warnings:

  - You are about to drop the column `item_name` on the `TransactionItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[menuItemId]` on the table `TransactionItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `is_active` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuItemId` to the `TransactionItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CANCELLED', 'IN_PROGRESS', 'FINISHED');

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "is_active" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "TransactionItem" DROP COLUMN "item_name",
ADD COLUMN     "menuItemId" INTEGER NOT NULL,
ADD COLUMN     "order_status" "OrderStatus" NOT NULL DEFAULT E'PENDING';

-- CreateTable
CREATE TABLE "_IngredientToTransactionItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToTransactionItem_AB_unique" ON "_IngredientToTransactionItem"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToTransactionItem_B_index" ON "_IngredientToTransactionItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionItem_menuItemId_key" ON "TransactionItem"("menuItemId");

-- AddForeignKey
ALTER TABLE "TransactionItem" ADD CONSTRAINT "TransactionItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToTransactionItem" ADD FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToTransactionItem" ADD FOREIGN KEY ("B") REFERENCES "TransactionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
