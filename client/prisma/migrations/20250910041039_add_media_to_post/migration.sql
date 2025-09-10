/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `imageUrl`,
    ADD COLUMN `mediaType` VARCHAR(191) NULL,
    ADD COLUMN `mediaUrl` VARCHAR(191) NULL;
