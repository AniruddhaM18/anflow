/*
  Warnings:

  - The values [PUT] on the enum `Methods` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updatedAt` to the `Webhook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Webhook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Methods_new" AS ENUM ('GET', 'POST', 'DELETE');
ALTER TABLE "public"."Webhook" ALTER COLUMN "method" DROP DEFAULT;
ALTER TABLE "Webhook" ALTER COLUMN "method" TYPE "Methods_new" USING ("method"::text::"Methods_new");
ALTER TYPE "Methods" RENAME TO "Methods_old";
ALTER TYPE "Methods_new" RENAME TO "Methods";
DROP TYPE "public"."Methods_old";
ALTER TABLE "Webhook" ALTER COLUMN "method" SET DEFAULT 'GET';
COMMIT;

-- AlterTable
ALTER TABLE "Webhook" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
