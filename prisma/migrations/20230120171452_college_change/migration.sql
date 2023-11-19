/*
  Warnings:

  - A unique constraint covering the columns `[college]` on the table `College` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "College_college_key" ON "College"("college");
