# Script de Seed - Dados Fictícios

## O que é criado

O script `seed.ts` popula o banco com dados realistas para teste:

| Entidade | Quantidade | Distribuição |
|----------|-----------|--------------|
| **Evento** | 1 | Curso de Liderança Cristã 2025 |
| **Alunos** | 60 | roleType = STUDENT |
| **Obreiros** | 20 | roleType = WORKER |
| **Matrículas** | 60 | Distribuídas em 4 status |
| **Pagamentos** | ~80 | Vários status (pago, pendente, atrasado) |

## Distribuição das Matrículas

- **Aprovados**: 60% (36 pessoas) - Vaga garantida
- **Pendentes**: 15% (9 pessoas) - Aguardando aprovação
- **Em Espera**: 15% (9 pessoas) - Lista de espera
- **Desistentes**: 10% (6 pessoas) - Desistiram

## Distribuição dos Pagamentos

Para matrículas **APROVADAS**:
- **Pagos**: 70% 
- **Pendentes**: 20%
- **Atrasados**: 10%

Além disso, 30% dos alunos têm pagamento extra de **material didático**.

## Dados Realistas

Cada registro inclui:
- Nomes brasileiros completos
- CPFs em formato válido (xxx.xxx.xxx-xx)
- Telefones celulares com DDD brasileiro
- Emails realistas (gmail, hotmail, outlook)
- Endereços completos (rua, número, bairro, cidade, estado, CEP)
- Datas de nascimento (16-65 anos para alunos, 25-60 para obreiros)

## Comando para Executar

```bash
npm run db:seed
```

Ou diretamente:

```bash
npx tsx prisma/seed.ts
```

## Saída Esperada

```
🌱 Iniciando seed completo...

🧹 Limpando dados existentes...
📅 Criando evento...
✅ Evento: Curso de Liderança Cristã 2025 (Vagas: 50)

👥 Criando obreiros...
✅ 20 obreiros criados

🎓 Criando alunos...
✅ 60 alunos criados

📝 Criando matrículas...
✅ Matrículas criadas:
   • Aprovados: ~36
   • Pendentes: ~9
   • Em espera: ~9
   • Desistentes: ~6

💰 Resumo Financeiro:
   • Total de pagamentos: ~80
   • Pagos: ~50
   • Pendentes: ~25
   • Atrasados: ~5

🎉 Seed concluído com sucesso!
```

## Resetar e Rodar Novamente

```bash
# Limpar e recriar tudo
npm run db:seed
```

O script automaticamente limpa os dados existentes antes de criar novos.

## Verificar Dados

Após rodar o seed:

```bash
# Abrir Prisma Studio
npx prisma studio
```

Acesse: http://localhost:5555

Ou via API:
```bash
curl http://localhost:3000/api/membros
```
