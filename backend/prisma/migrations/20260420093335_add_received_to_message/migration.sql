-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "received" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "receivedAt" TIMESTAMP(3);
