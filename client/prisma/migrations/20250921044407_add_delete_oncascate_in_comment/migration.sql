-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_lastMsgId_fkey`;

-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `Messages_conversationId_fkey`;

-- DropIndex
DROP INDEX `Comment_postId_fkey` ON `Comment`;

-- DropIndex
DROP INDEX `Comment_userId_fkey` ON `Comment`;

-- DropIndex
DROP INDEX `Messages_conversationId_fkey` ON `Messages`;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_lastMsgId_fkey` FOREIGN KEY (`lastMsgId`) REFERENCES `Messages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
