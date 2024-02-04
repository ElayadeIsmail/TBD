/*
  Warnings:

  - You are about to drop the column `majorId` on the `ClassEntity` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `ClassEntity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassEntity" DROP CONSTRAINT "ClassEntity_majorId_fkey";

-- DropForeignKey
ALTER TABLE "ClassEntity" DROP CONSTRAINT "ClassEntity_subjectId_fkey";

-- DropIndex
DROP INDEX "ClassEntity_levelId_subjectId_majorId_key";

-- AlterTable
ALTER TABLE "ClassEntity" DROP COLUMN "majorId",
DROP COLUMN "subjectId";

-- CreateTable
CREATE TABLE "_ClassEntityToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassEntityToMajorStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassEntityToSubject_AB_unique" ON "_ClassEntityToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassEntityToSubject_B_index" ON "_ClassEntityToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassEntityToMajorStudent_AB_unique" ON "_ClassEntityToMajorStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassEntityToMajorStudent_B_index" ON "_ClassEntityToMajorStudent"("B");

-- AddForeignKey
ALTER TABLE "_ClassEntityToSubject" ADD CONSTRAINT "_ClassEntityToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "ClassEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassEntityToSubject" ADD CONSTRAINT "_ClassEntityToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassEntityToMajorStudent" ADD CONSTRAINT "_ClassEntityToMajorStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "ClassEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassEntityToMajorStudent" ADD CONSTRAINT "_ClassEntityToMajorStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "MajorStudent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
