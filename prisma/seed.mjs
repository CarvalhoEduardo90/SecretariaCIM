// @ts-check
// Seed script para Prisma v7

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  console.log("🌱 Iniciando seed...");

  // Cria alguns membros de exemplo
  const membros = await prisma.membro.createMany({
    data: [
      {
        nome: "João Silva",
        email: "joao.silva@email.com",
        telefone: "(11) 98765-4321",
        cargo: "Membro",
        status: "ATIVO",
      },
      {
        nome: "Maria Santos",
        email: "maria.santos@email.com",
        telefone: "(11) 91234-5678",
        cargo: "Diaconisa",
        status: "ATIVO",
      },
      {
        nome: "Pedro Oliveira",
        email: "pedro.oliveira@email.com",
        status: "INATIVO",
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ ${membros.count} membros criados`);

  // Registra versão do sistema
  await prisma.metaSistema.upsert({
    where: { chave: "versao" },
    update: { valor: "0.1.0" },
    create: {
      chave: "versao",
      valor: "0.1.0",
    },
  });

  console.log("✅ Seed concluído!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
