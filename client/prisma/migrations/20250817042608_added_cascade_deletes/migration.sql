-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `Favorite` DROP FOREIGN KEY `Favorite_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Favorite` DROP FOREIGN KEY `Favorite_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `Follow_followerId_fkey`;

-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `Follow_followingId_fkey`;

-- DropForeignKey
ALTER TABLE `LikeComment` DROP FOREIGN KEY `LikeComment_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `LikeComment` DROP FOREIGN KEY `LikeComment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `LikePost` DROP FOREIGN KEY `LikePost_postId_fkey`;

-- DropForeignKey
ALTER TABLE `LikePost` DROP FOREIGN KEY `LikePost_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Repost` DROP FOREIGN KEY `Repost_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Repost` DROP FOREIGN KEY `Repost_userId_fkey`;

-- DropIndex
DROP INDEX `Comment_parentId_fkey` ON `Comment`;

-- DropIndex
DROP INDEX `Favorite_postId_fkey` ON `Favorite`;

-- DropIndex
DROP INDEX `Follow_followingId_fkey` ON `Follow`;

-- DropIndex
DROP INDEX `LikeComment_commentId_fkey` ON `LikeComment`;

-- DropIndex
DROP INDEX `LikePost_postId_fkey` ON `LikePost`;

-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `Post`;

-- DropIndex
DROP INDEX `Repost_postId_fkey` ON `Repost`;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeComment` ADD CONSTRAINT `LikeComment_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeComment` ADD CONSTRAINT `LikeComment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikePost` ADD CONSTRAINT `LikePost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikePost` ADD CONSTRAINT `LikePost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Repost` ADD CONSTRAINT `Repost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Repost` ADD CONSTRAINT `Repost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
