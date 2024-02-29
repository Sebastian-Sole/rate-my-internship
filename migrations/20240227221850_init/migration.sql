-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "websiteUrl" TEXT,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Internship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "hourlyWage" DOUBLE PRECISION NOT NULL,
    "teamSize" INTEGER NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "learnings" TEXT NOT NULL,
    "mentoringValue" TEXT NOT NULL,
    "socialAspects" TEXT NOT NULL,
    "expectationsVsReality" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "JobType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternshipTechnology" (
    "internshipId" INTEGER NOT NULL,
    "technologyId" INTEGER NOT NULL,

    CONSTRAINT "InternshipTechnology_pkey" PRIMARY KEY ("internshipId","technologyId")
);

-- CreateTable
CREATE TABLE "JobTypeTechnology" (
    "jobTypeId" INTEGER NOT NULL,
    "technologyId" INTEGER NOT NULL,

    CONSTRAINT "JobTypeTechnology_pkey" PRIMARY KEY ("jobTypeId","technologyId")
);

-- CreateTable
CREATE TABLE "_InternshipToJobType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "JobType_type_key" ON "JobType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "_InternshipToJobType_AB_unique" ON "_InternshipToJobType"("A", "B");

-- CreateIndex
CREATE INDEX "_InternshipToJobType_B_index" ON "_InternshipToJobType"("B");

-- AddForeignKey
ALTER TABLE "Internship" ADD CONSTRAINT "Internship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Internship" ADD CONSTRAINT "Internship_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternshipTechnology" ADD CONSTRAINT "InternshipTechnology_internshipId_fkey" FOREIGN KEY ("internshipId") REFERENCES "Internship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternshipTechnology" ADD CONSTRAINT "InternshipTechnology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTypeTechnology" ADD CONSTRAINT "JobTypeTechnology_jobTypeId_fkey" FOREIGN KEY ("jobTypeId") REFERENCES "JobType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTypeTechnology" ADD CONSTRAINT "JobTypeTechnology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InternshipToJobType" ADD CONSTRAINT "_InternshipToJobType_A_fkey" FOREIGN KEY ("A") REFERENCES "Internship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InternshipToJobType" ADD CONSTRAINT "_InternshipToJobType_B_fkey" FOREIGN KEY ("B") REFERENCES "JobType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
