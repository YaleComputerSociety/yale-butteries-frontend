/*
  Warnings:

  - A unique constraint covering the columns `[netid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_netid_key" ON "User"("netid");
