/*
  Warnings:

  - You are about to drop the column `authuserId` on the `customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authUserId]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "customer_authuserId_key";

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "authuserId",
ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "customer_authUserId_key" ON "customer"("authUserId");
