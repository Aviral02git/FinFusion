/*
  Warnings:

  - You are about to drop the column `bankname` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - Added the required column `bankName` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BankAccount` DROP COLUMN `bankname`,
    ADD COLUMN `bankName` VARCHAR(191) NOT NULL,
    ADD COLUMN `bgColor` VARCHAR(191) NULL,
    ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `logo` VARCHAR(191) NULL,
    ADD COLUMN `shortName` VARCHAR(191) NULL,
    ADD COLUMN `type` ENUM('SAVINGS', 'CURRENT') NOT NULL DEFAULT 'SAVINGS',
    MODIFY `balance` DECIMAL(12, 2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `createdAt`,
    ADD COLUMN `category` ENUM('FOOD', 'SHOPPING', 'TRANSPORT', 'BILLS', 'ENTERTAINMENT', 'TRANSFER', 'INCOME', 'REFUND', 'OTHER') NOT NULL DEFAULT 'OTHER',
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `amount` DECIMAL(12, 2) NOT NULL,
    MODIFY `type` ENUM('CREDIT', 'DEBIT') NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    INDEX `Notification_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Transaction_userId_idx` ON `Transaction`(`userId`);

-- CreateIndex
CREATE INDEX `Transaction_timestamp_idx` ON `Transaction`(`timestamp`);

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `BankAccount` RENAME INDEX `BankAccount_userId_fkey` TO `BankAccount_userId_idx`;

-- RenameIndex
ALTER TABLE `Transaction` RENAME INDEX `Transaction_accountId_fkey` TO `Transaction_accountId_idx`;
