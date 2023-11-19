-- AlterTable
ALTER TABLE "TransactionHistory" ALTER COLUMN "order_complete" DROP NOT NULL,
ALTER COLUMN "queue_size_on_complete" DROP NOT NULL,
ALTER COLUMN "in_progress" SET DATA TYPE TEXT;
