/*
  Warnings:

  - You are about to drop the `Availability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ButteryMetaData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuItemToIngredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AvailabilityToMenuItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IngredientToItemRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IngredientToTransactionItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "ButteryMetaData" DROP CONSTRAINT "ButteryMetaData_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "ItemRating" DROP CONSTRAINT "ItemRating_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "MenuItemToIngredients" DROP CONSTRAINT "MenuItemToIngredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "MenuItemToIngredients" DROP CONSTRAINT "MenuItemToIngredients_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "_AvailabilityToMenuItem" DROP CONSTRAINT "_AvailabilityToMenuItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_AvailabilityToMenuItem" DROP CONSTRAINT "_AvailabilityToMenuItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToItemRating" DROP CONSTRAINT "_IngredientToItemRating_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToItemRating" DROP CONSTRAINT "_IngredientToItemRating_B_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToTransactionItem" DROP CONSTRAINT "_IngredientToTransactionItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToTransactionItem" DROP CONSTRAINT "_IngredientToTransactionItem_B_fkey";

-- DropTable
DROP TABLE "Availability";

-- DropTable
DROP TABLE "ButteryMetaData";

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "ItemRating";

-- DropTable
DROP TABLE "MenuItemToIngredients";

-- DropTable
DROP TABLE "_AvailabilityToMenuItem";

-- DropTable
DROP TABLE "_IngredientToItemRating";

-- DropTable
DROP TABLE "_IngredientToTransactionItem";
