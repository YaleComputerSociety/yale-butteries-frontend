/*
  Warnings:

  - The values [PENDING,IN_PROGRESS,FINISHED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `College` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'STAFF');

-- CreateEnum
CREATE TYPE "MenuItemType" AS ENUM ('FOOD', 'DRINK', 'DESSERT');

-- CreateEnum
CREATE TYPE "OrderItemStatus" AS ENUM ('QUEUED', 'ONGOING', 'READY', 'CANCELLED');



-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionHistory" DROP CONSTRAINT "TransactionHistory_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionHistory" DROP CONSTRAINT "TransactionHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionItem" DROP CONSTRAINT "TransactionItem_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionItem" DROP CONSTRAINT "TransactionItem_transactionHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_collegeId_fkey";



-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "netId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "collegeId" INTEGER NOT NULL,
    "email" TEXT,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "college" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "butteryName" TEXT NOT NULL,
    "isButteryIntegrated" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "daysOpen" TEXT[],
    "openTime" TEXT NOT NULL DEFAULT '22:00',
    "closeTime" TEXT NOT NULL DEFAULT '0:00',
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "college_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'No description provided',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "type" "MenuItemType" NOT NULL DEFAULT 'FOOD',
    "collegeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeFee" INTEGER,
    "paymentIntentId" TEXT,
    "initialQueueSize" INTEGER,
    "endQueueSize" INTEGER,
    "placedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "OrderItemStatus" NOT NULL DEFAULT 'QUEUED',
    "orderId" INTEGER NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_netId_key" ON "user"("netId");

-- CreateIndex
CREATE UNIQUE INDEX "college_name_key" ON "college"("name");

-- CreateIndex
CREATE UNIQUE INDEX "college_butteryName_key" ON "college"("butteryName");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "college"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "college"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "college"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('QUEUED', 'ONGOING', 'READY', 'PAID', 'CANCELLED', 'TIMEOUT');
ALTER TABLE "TransactionItem" ALTER COLUMN "order_status" DROP DEFAULT;
ALTER TABLE "order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old" CASCADE;
COMMIT;

-- DropTable
DROP TABLE "College";

-- DropTable
DROP TABLE "MenuItem";

-- DropTable
DROP TABLE "TransactionHistory";

-- DropTable
DROP TABLE "TransactionItem";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "ItemType";