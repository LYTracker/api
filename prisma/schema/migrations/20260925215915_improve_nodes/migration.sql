/*
  Warnings:

  - You are about to drop the column `style` on the `nodes` table. All the data in the column will be lost.
  - The `content` column on the `nodes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "nodes" DROP COLUMN "style",
DROP COLUMN "content",
ADD COLUMN     "content" JSONB;
