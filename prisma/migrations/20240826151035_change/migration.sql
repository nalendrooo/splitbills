/*
  Warnings:

  - The primary key for the `user_bills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user_bills` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `user_id` on the `items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_user_id_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_bills" DROP CONSTRAINT "user_bills_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_bills_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
