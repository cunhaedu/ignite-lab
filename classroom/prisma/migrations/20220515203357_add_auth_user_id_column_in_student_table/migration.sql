/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "student" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "student_authUserId_key" ON "student"("authUserId");
