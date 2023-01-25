-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('FOOD', 'DRINK', 'DESSERT');

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "item_type" "ItemType" NOT NULL DEFAULT E'FOOD';
