/*
  Warnings:

  - Made the column `imageUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `imageUrl` VARCHAR(191) NOT NULL DEFAULT '/default-image.jpg';
