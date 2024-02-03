/*
  Warnings:

  - You are about to drop the column `CIN` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `CIN` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassEntity" DROP CONSTRAINT "ClassEntity_majorId_fkey";

-- DropForeignKey
ALTER TABLE "ClassEntity" DROP CONSTRAINT "ClassEntity_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_majorId_fkey";

-- AlterTable
ALTER TABLE "ClassEntity" ALTER COLUMN "subjectId" DROP NOT NULL,
ALTER COLUMN "majorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "CIN",
ADD COLUMN     "cin" TEXT,
ALTER COLUMN "majorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "CIN",
ADD COLUMN     "cin" TEXT;

-- AddForeignKey
ALTER TABLE "ClassEntity" ADD CONSTRAINT "ClassEntity_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassEntity" ADD CONSTRAINT "ClassEntity_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "MajorStudent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "MajorStudent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
