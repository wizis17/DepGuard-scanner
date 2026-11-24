-- CreateEnum
CREATE TYPE "ScanStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'PARTIAL', 'FAILED');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "FindingStatus" AS ENUM ('OPEN', 'RESOLVED');

-- CreateEnum
CREATE TYPE "ReportFormat" AS ENUM ('PDF', 'CSV');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scans" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "status" "ScanStatus" NOT NULL DEFAULT 'PENDING',
    "sourceFileName" TEXT NOT NULL,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "scans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dependencies" (
    "id" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "ecosystem" TEXT NOT NULL DEFAULT 'npm',
    "version" TEXT NOT NULL,
    "isDirect" BOOLEAN NOT NULL,
    "isDev" BOOLEAN NOT NULL DEFAULT false,
    "lockfilePath" TEXT,

    CONSTRAINT "dependencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vulnerabilities" (
    "id" TEXT NOT NULL,
    "osvId" TEXT NOT NULL,
    "aliases" TEXT[],
    "summary" TEXT,
    "details" TEXT,
    "severity" "Severity" NOT NULL DEFAULT 'UNKNOWN',
    "cvssVector" TEXT,
    "references" JSONB,
    "publishedAt" TIMESTAMP(3),
    "modifiedAt" TIMESTAMP(3),
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vulnerabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scan_findings" (
    "id" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "dependencyId" TEXT NOT NULL,
    "vulnerabilityId" TEXT NOT NULL,
    "affectedRange" TEXT,
    "fixedVersion" TEXT,
    "status" "FindingStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scan_findings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "format" "ReportFormat" NOT NULL,
    "filePath" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "projects_userId_idx" ON "projects"("userId");

-- CreateIndex
CREATE INDEX "scans_projectId_createdAt_idx" ON "scans"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "dependencies_scanId_idx" ON "dependencies"("scanId");

-- CreateIndex
CREATE INDEX "dependencies_packageName_version_idx" ON "dependencies"("packageName", "version");

-- CreateIndex
CREATE UNIQUE INDEX "vulnerabilities_osvId_key" ON "vulnerabilities"("osvId");

-- CreateIndex
CREATE INDEX "scan_findings_scanId_idx" ON "scan_findings"("scanId");

-- CreateIndex
CREATE UNIQUE INDEX "scan_findings_dependencyId_vulnerabilityId_key" ON "scan_findings"("dependencyId", "vulnerabilityId");

-- CreateIndex
CREATE INDEX "reports_scanId_idx" ON "reports"("scanId");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scans" ADD CONSTRAINT "scans_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dependencies" ADD CONSTRAINT "dependencies_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "scans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scan_findings" ADD CONSTRAINT "scan_findings_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "scans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scan_findings" ADD CONSTRAINT "scan_findings_dependencyId_fkey" FOREIGN KEY ("dependencyId") REFERENCES "dependencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scan_findings" ADD CONSTRAINT "scan_findings_vulnerabilityId_fkey" FOREIGN KEY ("vulnerabilityId") REFERENCES "vulnerabilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "scans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
