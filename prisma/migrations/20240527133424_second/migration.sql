/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "LocalGoverment" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LocalGoverment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "local_goverment_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" TEXT NOT NULL,
    "projection" TEXT NOT NULL,
    "initial_position_x" DOUBLE PRECISION NOT NULL,
    "initial_position_y" DOUBLE PRECISION NOT NULL,
    "lefttop_x" DOUBLE PRECISION NOT NULL,
    "lefttop_y" DOUBLE PRECISION NOT NULL,
    "foreground_layers_id" TEXT NOT NULL,
    "matrix_def_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extent" (
    "id" TEXT NOT NULL,
    "a" TEXT NOT NULL,
    "b" TEXT NOT NULL,
    "c" TEXT NOT NULL,
    "d" TEXT NOT NULL,
    "map_id" TEXT NOT NULL,

    CONSTRAINT "Extent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scale" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Scale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScaleValue" (
    "id" TEXT NOT NULL,
    "scale_id" TEXT NOT NULL,

    CONSTRAINT "ScaleValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForegroundLayers" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "session_url" TEXT NOT NULL,
    "swd_filepath" TEXT NOT NULL,
    "map_id" TEXT NOT NULL,

    CONSTRAINT "ForegroundLayers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackgroundLayer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wmts_url" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL,
    "map_id" TEXT NOT NULL,

    CONSTRAINT "BackgroundLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Search" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "target_layer_name" TEXT NOT NULL,
    "is_move_only" BOOLEAN NOT NULL,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchOption" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "search_id" TEXT NOT NULL,

    CONSTRAINT "SearchOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" TEXT NOT NULL,
    "property" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "attribute_id" TEXT NOT NULL,
    "attribute_option_id" TEXT,

    CONSTRAINT "AttributeOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Extent_map_id_key" ON "Extent"("map_id");

-- CreateIndex
CREATE UNIQUE INDEX "ForegroundLayers_map_id_key" ON "ForegroundLayers"("map_id");

-- CreateIndex
CREATE INDEX "AttributeOption_attribute_option_id_idx" ON "AttributeOption"("attribute_option_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_local_goverment_id_fkey" FOREIGN KEY ("local_goverment_id") REFERENCES "LocalGoverment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Map" ADD CONSTRAINT "Map_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extent" ADD CONSTRAINT "Extent_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScaleValue" ADD CONSTRAINT "ScaleValue_scale_id_fkey" FOREIGN KEY ("scale_id") REFERENCES "Scale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForegroundLayers" ADD CONSTRAINT "ForegroundLayers_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackgroundLayer" ADD CONSTRAINT "BackgroundLayer_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchOption" ADD CONSTRAINT "SearchOption_search_id_fkey" FOREIGN KEY ("search_id") REFERENCES "Search"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeOption" ADD CONSTRAINT "AttributeOption_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeOption" ADD CONSTRAINT "AttributeOption_attribute_option_id_fkey" FOREIGN KEY ("attribute_option_id") REFERENCES "AttributeOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;
