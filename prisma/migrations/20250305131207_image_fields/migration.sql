/*
  Warnings:

  - Added the required column `photographerUrl` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `src` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "photographerUrl" TEXT NOT NULL,
ADD COLUMN     "src" JSONB NOT NULL;
