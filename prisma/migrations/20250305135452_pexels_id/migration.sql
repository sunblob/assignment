/*
  Warnings:

  - Changed the type of `pexelsId` on the `images` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "pexelsId",
ADD COLUMN     "pexelsId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "images_pexelsId_key" ON "images"("pexelsId");
