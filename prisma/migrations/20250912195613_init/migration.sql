-- CreateTable
CREATE TABLE "public"."ArchiveIndex" (
    "id" SERIAL NOT NULL,
    "class" TEXT NOT NULL,
    "WebName" TEXT NOT NULL,
    "OrgName" TEXT NOT NULL,
    "OrgWebLink" TEXT NOT NULL,

    CONSTRAINT "ArchiveIndex_pkey" PRIMARY KEY ("id")
);
