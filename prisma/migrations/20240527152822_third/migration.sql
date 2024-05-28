/*
  Warnings:

  - Added the required column `scale_id` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Map" ADD COLUMN     "scale_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Map" ADD CONSTRAINT "Map_scale_id_fkey" FOREIGN KEY ("scale_id") REFERENCES "Scale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
