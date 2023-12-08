-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('PENDING', 'COMPLETE');

-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "status" "TodoStatus" NOT NULL DEFAULT 'PENDING';
