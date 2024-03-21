/*
  Warnings:

  - The primary key for the `Products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[descricao]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descricao` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Products_name_key";

-- AlterTable
ALTER TABLE "Products" DROP CONSTRAINT "Products_pkey",
DROP COLUMN "created_at",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "codigo" SERIAL NOT NULL,
ADD COLUMN     "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "preco" DECIMAL(10,2) NOT NULL,
ADD CONSTRAINT "Products_pkey" PRIMARY KEY ("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Products_descricao_key" ON "Products"("descricao");
