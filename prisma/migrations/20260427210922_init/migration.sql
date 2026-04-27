-- CreateEnum
CREATE TYPE "StatusMembro" AS ENUM ('ATIVO', 'INATIVO', 'TRANSFERIDO');

-- CreateTable
CREATE TABLE "membros" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "dataNascimento" DATE,
    "dataBatismo" DATE,
    "cargo" TEXT,
    "status" "StatusMembro" NOT NULL DEFAULT 'ATIVO',
    "endereco" JSONB,

    CONSTRAINT "membros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meta_sistema" (
    "id" UUID NOT NULL,
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meta_sistema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "membros_email_key" ON "membros"("email");

-- CreateIndex
CREATE INDEX "membros_status_idx" ON "membros"("status");

-- CreateIndex
CREATE INDEX "membros_email_idx" ON "membros"("email");

-- CreateIndex
CREATE UNIQUE INDEX "meta_sistema_chave_key" ON "meta_sistema"("chave");
