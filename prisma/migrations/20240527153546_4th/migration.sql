/*
  Warnings:

  - Added the required column `value` to the `ScaleValue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScaleValue" ADD COLUMN     "value" TEXT NOT NULL;
