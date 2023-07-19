/*
  Warnings:

  - You are about to drop the column `pricePerDAy` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `pricePerDay` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "pricePerDAy",
ADD COLUMN     "pricePerDay" DECIMAL(8,2) NOT NULL;
