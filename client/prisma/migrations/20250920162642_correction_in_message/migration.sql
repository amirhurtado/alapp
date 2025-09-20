/*
  Warnings:

  - You are about to drop the column `type` on the `Messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Messages` DROP COLUMN `type`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    MODIFY `content` TEXT NULL;
