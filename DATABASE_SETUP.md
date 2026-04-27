# Setup do Banco de Dados - Secretaria CIM

## Estrutura

- **PostgreSQL 16** via Docker
- **Prisma ORM** para acesso ao banco
- **UUID** como padrão para todas as tabelas
- Compatível com **Supabase** (mesmo schema)

## Configuração Inicial

### 1. Subir o PostgreSQL (Docker)

```bash
npm run db:up
```

Isso inicia:
- PostgreSQL na porta `5432`
- Adminer (gerenciador web) na porta `8080`

### 2. Gerar Cliente Prisma

```bash
npm run db:generate
```

### 3. Criar Migração Inicial

```bash
npm run db:migrate
```

Digite um nome para a migração (ex: `init`)

### 4. (Opcional) Popular com dados de teste

```bash
npm run db:seed
```

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run db:up` | Inicia PostgreSQL + Adminer |
| `npm run db:down` | Para os containers |
| `npm run db:generate` | Gera cliente Prisma |
| `npm run db:migrate` | Cria/executa migrações |
| `npm run db:migrate:prod` | Executa migrações em produção |
| `npm run db:studio` | Abre Prisma Studio (GUI) |
| `npm run db:seed` | Popula com dados iniciais |

## Acessos

- **Aplicação**: http://localhost:3000
- **Adminer**: http://localhost:8080
  - Sistema: PostgreSQL
  - Servidor: postgres
  - Usuário: postgres
  - Senha: postgres
  - Database: secretaria_cim
- **API Health Check**: http://localhost:3000/api/health
- **Prisma Studio**: `npm run db:studio` → http://localhost:5555

## Schema

### Tabelas

- `membros` - Cadastro de membros
- `meta_sistema` - Controle de versão/configurações

### Padrões

- IDs: UUID v4 (`@id @default(uuid()) @db.Uuid`)
- Timestamps: `createdAt` + `updatedAt` em todas as tabelas
- Soft delete: Campo `status` (ATIVO/INATIVO/TRANSFERIDO)
- Endereço: Campo JSON flexível

## Migração para Supabase

Quando migrar para Supabase:

1. Adicione ao `.env`:
   ```
   DATABASE_URL="postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres"
   ```

2. Descomente no `schema.prisma`:
   ```prisma
   directUrl = env("DIRECT_URL")
   ```

3. Execute:
   ```bash
   npm run db:migrate:prod
   ```

## APIs Criadas

- `GET /api/health` - Verifica conexão com banco
- `GET /api/membros` - Lista todos os membros
- `POST /api/membros` - Cria novo membro

## Troubleshooting

### Erro: "Can't reach database"
Verifique se o Docker está rodando:
```bash
docker ps
```

### Erro: "Connection refused"
Aguarde alguns segundos após `npm run db:up` para o PostgreSQL inicializar.

### Resetar banco (⚠️ cuidado)
```bash
npm run db:down
docker volume rm secretaria-cim_postgres_data
npm run db:up
npm run db:migrate
```
