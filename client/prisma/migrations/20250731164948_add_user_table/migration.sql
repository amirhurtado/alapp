/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Favorite` DROP FOREIGN KEY `Favorite_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `Follow_followerId_fkey`;

-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `Follow_followingId_fkey`;

-- DropForeignKey
ALTER TABLE `LikeComment` DROP FOREIGN KEY `LikeComment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `LikePost` DROP FOREIGN KEY `LikePost_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Repost` DROP FOREIGN KEY `Repost_userId_fkey`;

-- DropIndex
DROP INDEX `Comment_userId_fkey` ON `Comment`;

-- DropIndex
DROP INDEX `Favorite_userId_fkey` ON `Favorite`;

-- DropIndex
DROP INDEX `Follow_followerId_fkey` ON `Follow`;

-- DropIndex
DROP INDEX `Follow_followingId_fkey` ON `Follow`;

-- DropIndex
DROP INDEX `LikeComment_userId_fkey` ON `LikeComment`;

-- DropIndex
DROP INDEX `LikePost_userId_fkey` ON `LikePost`;

-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `Post`;

-- DropIndex
DROP INDEX `Repost_userId_fkey` ON `Repost`;

-- AlterTable
ALTER TABLE `Comment` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Favorite` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Follow` MODIFY `followerId` VARCHAR(191) NOT NULL,
    MODIFY `followingId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `LikeComment` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `LikePost` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `authorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Profile` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Repost` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeComment` ADD CONSTRAINT `LikeComment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikePost` ADD CONSTRAINT `LikePost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Repost` ADD CONSTRAINT `Repost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
