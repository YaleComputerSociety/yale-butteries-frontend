/*
  Warnings:

  - You are about to drop the column `ingredientId` on the `ItemRating` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemRating" DROP CONSTRAINT "ItemRating_ingredientId_fkey";

-- AlterTable
ALTER TABLE "ItemRating" DROP COLUMN "ingredientId";

-- CreateTable
CREATE TABLE "_IngredientToItemRating" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToItemRating_AB_unique" ON "_IngredientToItemRating"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToItemRating_B_index" ON "_IngredientToItemRating"("B");

-- AddForeignKey
ALTER TABLE "_IngredientToItemRating" ADD FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToItemRating" ADD FOREIGN KEY ("B") REFERENCES "ItemRating"("id") ON DELETE CASCADE ON UPDATE CASCADE;
