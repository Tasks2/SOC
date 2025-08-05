/*
  Warnings:

  - You are about to drop the column `teamId` on the `leaverequest` table. All the data in the column will be lost.
  - Added the required column `type` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `leaverequest` DROP FOREIGN KEY `LeaveRequest_teamId_fkey`;

-- AlterTable
ALTER TABLE `leaverequest` DROP COLUMN `teamId`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
