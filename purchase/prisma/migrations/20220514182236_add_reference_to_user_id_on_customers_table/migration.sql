/*
  Warnings:

  - A unique constraint covering the columns `[authuserId]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "authuserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "customer_authuserId_key" ON "customer"("authuserId");
