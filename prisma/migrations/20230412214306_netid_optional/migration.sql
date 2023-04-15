-- DropIndex
DROP INDEX "User_netid_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" TEXT,
ADD COLUMN     "token" TEXT;
