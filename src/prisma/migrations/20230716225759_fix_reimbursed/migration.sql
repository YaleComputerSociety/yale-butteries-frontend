/*
  Warnings:

  - The `reimbursed` column on the `TransactionHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" DROP COLUMN "reimbursed",
ADD COLUMN     "reimbursed" BOOLEAN;
