/*
  Warnings:

  - Added the required column `content` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Messages` ADD COLUMN `content` TEXT NOT NULL;
