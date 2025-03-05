/*
  Warnings:

  - You are about to drop the `_ImageToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ImageToUser" DROP CONSTRAINT "_ImageToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToUser" DROP CONSTRAINT "_ImageToUser_B_fkey";

-- DropTable
DROP TABLE "_ImageToUser";

-- CreateTable
CREATE TABLE "favorite_images" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorite_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorite_images" ADD CONSTRAINT "favorite_images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_images" ADD CONSTRAINT "favorite_images_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
