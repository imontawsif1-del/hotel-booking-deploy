/*
  Warnings:

  - You are about to drop the column `latitude` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Hotel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "latitude",
DROP COLUMN "longitude";
