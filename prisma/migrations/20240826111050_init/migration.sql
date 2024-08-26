-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('INDIVIDUAL', 'ALL', 'SEVERAL');

-- CreateTable
CREATE TABLE "bills" (
    "code" TEXT NOT NULL,
    "creator" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "user_bills" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bills_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "user_bills_id" TEXT NOT NULL,
    "bills_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_bills_id_key" ON "user_bills"("id");

-- AddForeignKey
ALTER TABLE "user_bills" ADD CONSTRAINT "user_bills_bills_code_fkey" FOREIGN KEY ("bills_code") REFERENCES "bills"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_user_bills_id_fkey" FOREIGN KEY ("user_bills_id") REFERENCES "user_bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_bills_code_fkey" FOREIGN KEY ("bills_code") REFERENCES "bills"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
