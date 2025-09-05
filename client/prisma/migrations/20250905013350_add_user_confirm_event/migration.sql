/*
  Warnings:

  - You are about to drop the `_EventToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_EventToUser` DROP FOREIGN KEY `_EventToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_EventToUser` DROP FOREIGN KEY `_EventToUser_B_fkey`;

-- DropTable
DROP TABLE `_EventToUser`;

-- CreateTable
CREATE TABLE `EventUserConfirm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventUserConfirm` ADD CONSTRAINT `EventUserConfirm_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventUserConfirm` ADD CONSTRAINT `EventUserConfirm_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
