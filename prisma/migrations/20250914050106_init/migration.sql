/*
  Warnings:

  - You are about to drop the `ArchiveIndex` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."ArchiveIndex";

-- CreateTable
CREATE TABLE "public"."archiveIndex" (
    "id" SERIAL NOT NULL,
    "Class" TEXT NOT NULL,
    "WebName" TEXT NOT NULL,
    "OrgName" TEXT NOT NULL,
    "OrgWebLink" TEXT NOT NULL,

    CONSTRAINT "archiveIndex_pkey" PRIMARY KEY ("id")
);
