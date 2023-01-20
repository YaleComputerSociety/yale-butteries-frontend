/*
  Warnings:

  - Added the required column `payment_intent_id` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "College" ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TransactionHistory" ADD COLUMN     "payment_intent_id" TEXT NOT NULL;
