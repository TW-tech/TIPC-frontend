/*
  Warnings:

  - You are about to drop the column `class` on the `ArchiveIndex` table. All the data in the column will be lost.
  - Added the required column `Class` to the `ArchiveIndex` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ArchiveIndex" DROP COLUMN "class",
ADD COLUMN     "Class" TEXT NOT NULL;
