// Seed script completo - 80 pessoas, matrículas e pagamentos

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Dados fictícios brasileiros
const nomesAlunos = [
  "Ana Paula Ferreira", "Carlos Eduardo Souza", "Mariana Oliveira", "João Pedro Silva",
  "Fernanda Lima", "Ricardo Santos", "Juliana Costa", "Bruno Almeida",
  "Camila Rodrigues", "Lucas Mendes", "Amanda Barbosa", "Gabriel Rocha",
  "Larissa Castro", "Matheus Araújo", "Bianca Cardoso", "Felipe Nunes",
  "Letícia Moreira", "Gustavo Pinto", "Manuela Teixeira", "Henrique Farias",
  "Isabela Duarte", "Igor Monteiro", "Valentina Freitas", "Tiago Correia",
  "Sophia Machado", "Vitor Nascimento", "Lorena Antunes", "Diego Peixoto",
  "Clara Vasconcelos", "Leonardo Fonseca", "Helena Pires", "Eduardo Cunha",
  "Alice Guimarães", "Daniel Magalhães", "Laura Tavares", "Pedro Henrique Dias",
  "Cecília Brito", "Murilo Andrade", "Eloá Figueiredo", "Rafael Campos",
  "Yasmin Leite", "Samuel Guerra", "Isis Pacheco", "Caio Brandão",
  "Melissa Aguiar", "Thiago Ximenes", "Esther Toledo", "Enzo Martinelli",
  "Lívia Seixas", "Vinícius Pontes", "Antônia Nogueira", "Joaquim Beltrão",
  "Catarina Drummond", "Bernardo Quintana", "Maitê Villar", "Heitor Sales",
  "Alícia Santana", "Davi Kuhn", "Rebeca Lacerda", "João Lucas Morais"
];

const nomesObreiros = [
  "Pastor Roberto Lima", "Diácono Marcos Silva", "Diaconisa Rosa Maria",
  "Coordenador João Batista", "Tesoureiro Paulo Ricardo", "Secretária Maria José",
  "Professor Elias Torres", "Professora Cristina Mendes", "Auxiliar Lucas Gabriel",
  "Cantor Mateus Aleluia", "Intercessor Ana Beatriz", "Evangelista Samuel Pedro",
  "Missionária Raquel Cruz", "Presbítero Daniel Levi", "Coroinha Pedro Tiago",
  "Recolhedora Ana Lúcia", "Pregador Josué Caleb", "Acompanhante Rute Noemi",
  "Instrutor Gideão Barak", "Visitador Esaú Jacó"
];

const cidades = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre", "Salvador", "Recife", "Fortaleza", "Brasília", "Goiânia"];
const estados = ["SP", "RJ", "MG", "PR", "RS", "BA", "PE", "CE", "DF", "GO"];
const bairros = ["Centro", "Jardim Paulista", "Bela Vista", "Vila Mariana", "Tatuapé", "Mooca", "Pinheiros", "Santana", "Liberdade", "Consolação"];

function gerarCPF() {
  const n = () => Math.floor(Math.random() * 10);
  return `${n()}${n()}${n()}.${n()}${n()}${n()}.${n()}${n()}${n()}-${n()}${n()}`;
}

function gerarTelefone() {
  const ddd = [11, 21, 31, 41, 51, 71, 81, 85, 61, 62][Math.floor(Math.random() * 10)];
  const n = () => Math.floor(Math.random() * 10);
  return `(${ddd}) 9${n()}${n()}${n()}${n()}-${n()}${n()}${n()}${n()}`;
}

function gerarEmail(nome) {
  const limpo = nome.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, ".");
  const dominios = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com.br", "email.com"];
  return `${limpo}.${Math.floor(Math.random() * 999)}@${dominios[Math.floor(Math.random() * dominios.length)]}`;
}

function gerarEndereco() {
  const numero = Math.floor(Math.random() * 2000) + 1;
  const complemento = Math.random() > 0.7 ? `Apto ${Math.floor(Math.random() * 100) + 1}` : null;
  const idx = Math.floor(Math.random() * cidades.length);
  
  return {
    street: `Rua ${["das Flores", "dos Pinheiros", "Principal", "Boa Vista", "São João", "XV de Novembro", "Oliveira", "Brasil", "Paulista", "Independência"][Math.floor(Math.random() * 10)]}`,
    number: String(numero),
    complemento,
    neighborhood: bairros[Math.floor(Math.random() * bairros.length)],
    city: cidades[idx],
    state: estados[idx],
    zipCode: `${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 900) + 100}`,
  };
}

function gerarDataNascimento(minAge = 16, maxAge = 65) {
  const ano = new Date().getFullYear() - Math.floor(Math.random() * (maxAge - minAge + 1)) - minAge;
  const mes = Math.floor(Math.random() * 12);
  const dia = Math.floor(Math.random() * 28) + 1;
  return new Date(ano, mes, dia);
}

async function main() {
  console.log("🌱 Iniciando seed completo...\n");

  // Limpar dados existentes
  console.log("🧹 Limpando dados existentes...");
  await prisma.payment.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.person.deleteMany();
  await prisma.event.deleteMany();
  await prisma.systemMeta.deleteMany();

  // 1. Criar Evento
  console.log("📅 Criando evento...");
  const evento = await prisma.event.create({
    data: {
      name: "Curso de Liderança Cristã 2025",
      description: "Curso intensivo de formação de líderes para células e ministérios. Inclui mentorias práticas e estudos bíblicos aprofundados.",
      location: "Centro de Treinamento Comunidade da Fé",
      startDate: new Date("2025-03-01"),
      endDate: new Date("2025-08-30"),
      maxCapacity: 50,
      price: 180.0,
      isActive: true,
    },
  });
  console.log(`✅ Evento: ${evento.name} (Vagas: ${evento.maxCapacity})\n`);

  // 2. Criar Obreiros (20)
  console.log("👥 Criando obreiros...");
  const obreirosCriados = [];
  for (let i = 0; i < nomesObreiros.length; i++) {
    const nome = nomesObreiros[i];
    const obreiro = await prisma.person.create({
      data: {
        fullName: nome,
        email: gerarEmail(nome),
        phone: gerarTelefone(),
        cpf: gerarCPF(),
        birthDate: gerarDataNascimento(25, 60),
        roleType: "WORKER",
        address: gerarEndereco(),
      },
    });
    obreirosCriados.push(obreiro);
  }
  console.log(`✅ ${obreirosCriados.length} obreiros criados\n`);

  // 3. Criar Alunos (60)
  console.log("🎓 Criando alunos...");
  const alunosCriados = [];
  for (let i = 0; i < nomesAlunos.length; i++) {
    const nome = nomesAlunos[i];
    const aluno = await prisma.person.create({
      data: {
        fullName: nome,
        email: gerarEmail(nome),
        phone: gerarTelefone(),
        cpf: gerarCPF(),
        birthDate: gerarDataNascimento(16, 55),
        roleType: "STUDENT",
        address: gerarEndereco(),
      },
    });
    alunosCriados.push(aluno);
  }
  console.log(`✅ ${alunosCriados.length} alunos criados\n`);

  // 4. Criar Matrículas
  console.log("📝 Criando matrículas...");
  const aprovador = obreirosCriados[0];
  let aprovados = 0;
  let pendentes = 0;
  let espera = 0;
  let desistentes = 0;

  for (const aluno of alunosCriados) {
    const rand = Math.random();
    let status;
    
    if (rand < 0.6) {
      status = "APROVADO";
      aprovados++;
    } else if (rand < 0.75) {
      status = "PENDENTE";
      pendentes++;
    } else if (rand < 0.90) {
      status = "ESPERA";
      espera++;
    } else {
      status = "DESISTENTE";
      desistentes++;
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        personId: aluno.id,
        eventId: evento.id,
        status,
        approvedAt: status === "APROVADO" ? new Date() : null,
        approvedBy: status === "APROVADO" ? aprovador.id : null,
        notes: status === "DESISTENTE" ? "Desistiu por motivos pessoais" : null,
      },
    });

    // Criar pagamentos para aprovados e pendentes
    if (status === "APROVADO" || status === "PENDENTE") {
      let pagStatus;
      
      if (status === "APROVADO") {
        const pagamentoRand = Math.random();
        if (pagamentoRand < 0.7) pagStatus = "PAGO";
        else if (pagamentoRand < 0.9) pagStatus = "PENDENTE";
        else pagStatus = "ATRASADO";
      } else {
        pagStatus = "PENDENTE";
      }

      const recebedor = obreirosCriados[Math.floor(Math.random() * 5) + 1];

      await prisma.payment.create({
        data: {
          enrollmentId: enrollment.id,
          type: "MATRICULA",
          amount: 180.0,
          status: pagStatus,
          dueDate: new Date("2025-02-15"),
          paidAt: pagStatus === "PAGO" ? new Date("2025-02-10") : null,
          receivedBy: pagStatus === "PAGO" ? recebedor.id : null,
          reference: pagStatus === "PAGO" ? `PG-${Math.floor(Math.random() * 90000) + 10000}` : null,
        },
      });

      if (Math.random() < 0.3) {
        await prisma.payment.create({
          data: {
            enrollmentId: enrollment.id,
            type: "MATERIAL",
            amount: 45.0,
            status: pagStatus === "PAGO" ? "PAGO" : "PENDENTE",
            dueDate: new Date("2025-02-20"),
            paidAt: pagStatus === "PAGO" ? new Date("2025-02-18") : null,
            receivedBy: pagStatus === "PAGO" ? recebedor.id : null,
          },
        });
      }
    }
  }

  console.log(`✅ Matrículas criadas:`);
  console.log(`   • Aprovados: ${aprovados}`);
  console.log(`   • Pendentes: ${pendentes}`);
  console.log(`   • Em espera: ${espera}`);
  console.log(`   • Desistentes: ${desistentes}\n`);

  // 5. Registrar versão
  await prisma.systemMeta.upsert({
    where: { key: "versao" },
    update: { value: "1.0.0" },
    create: { key: "versao", value: "1.0.0" },
  });

  // Resumo
  const totalPagamentos = await prisma.payment.count();
  const pagamentosPagos = await prisma.payment.count({ where: { status: "PAGO" } });
  const pagamentosPendentes = await prisma.payment.count({ where: { status: "PENDENTE" } });
  const pagamentosAtrasados = await prisma.payment.count({ where: { status: "ATRASADO" } });

  console.log("💰 Resumo Financeiro:");
  console.log(`   • Total de pagamentos: ${totalPagamentos}`);
  console.log(`   • Pagos: ${pagamentosPagos}`);
  console.log(`   • Pendentes: ${pagamentosPendentes}`);
  console.log(`   • Atrasados: ${pagamentosAtrasados}\n`);

  console.log("🎉 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
