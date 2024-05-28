/*
  Warnings:

  - A unique constraint covering the columns `[search_option_id]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `search_option_id` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foreground_layers_id` to the `Search` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "search_option_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Search" ADD COLUMN     "foreground_layers_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_search_option_id_key" ON "Attribute"("search_option_id");

-- AddForeignKey
ALTER TABLE "Search" ADD CONSTRAINT "Search_foreground_layers_id_fkey" FOREIGN KEY ("foreground_layers_id") REFERENCES "ForegroundLayers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_search_option_id_fkey" FOREIGN KEY ("search_option_id") REFERENCES "SearchOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
