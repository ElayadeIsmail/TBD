/*
  Warnings:

  - You are about to drop the column `creatorId` on the `StudentEnrollment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentEnrollment" DROP CONSTRAINT "StudentEnrollment_creatorId_fkey";

-- AlterTable
ALTER TABLE "StudentEnrollment" DROP COLUMN "creatorId",
ALTER COLUMN "enrollmentDate" SET DEFAULT CURRENT_TIMESTAMP;
