/*
  Warnings:

  - You are about to drop the column `user_bills_id` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `user_bills` table. All the data in the column will be lost.
  - Added the required column `status` to the `user_bills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `user_bills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_user_bills_id_fkey";

-- DropIndex
DROP INDEX "user_bills_id_key";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "user_bills_id";

-- AlterTable
ALTER TABLE "user_bills" DROP COLUMN "title",
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "user" TEXT NOT NULL,
ADD CONSTRAINT "user_bills_pkey" PRIMARY KEY ("id");
