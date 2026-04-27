# Modelagem do Banco - Sistema de Cursos

## Diagrama de Relacionamentos

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Event     │       │  Enrollment │       │   Payment   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │◄──────│ id (PK)     │◄──────│ id (PK)     │
│ name        │  1:N  │ personId(FK)│  1:N  │ enrollmentId│
│ description │       │ eventId(FK) │       │ type        │
│ startDate   │       │ status      │       │ amount      │
│ endDate     │       │ approvedAt  │       │ status      │
│ maxCapacity │       │ approvedBy  │       │ dueDate     │
│ isActive    │       └──────┬──────┘       │ paidAt      │
│ price       │              │              │ receivedBy  │
└─────────────┘              │              └─────────────┘
                             │
┌─────────────┐              │
│   Person    │              │
├─────────────┤              │
│ id (PK)     │◄─────────────┘
│ fullName    │
│ email       │
│ cpf         │
│ phone       │
│ birthDate   │
│ roleType    │  ← STUDENT ou WORKER
│ address     │
└─────────────┘
```

## Relacionamentos

### 1. Event ↔ Enrollment (1:N)
- Um **Event** pode ter muitos **Enrollments**
- Um **Enrollment** pertence a um único **Event**
- `onDelete: Cascade` - Ao deletar um evento, todas as matrículas são deletadas

### 2. Person ↔ Enrollment (1:N)
- Uma **Person** pode ter muitos **Enrollments**
- Um **Enrollment** pertence a uma única **Person**
- Índice único `[personId, eventId]` evita matrícula duplicada

### 3. Enrollment ↔ Payment (1:N)
- Um **Enrollment** pode ter muitos **Payments**
- Um **Payment** pertence a um único **Enrollment**
- Tesouraria vinculada à matrícula, não diretamente à pessoa

## Enums

### RoleType
- `STUDENT` - Aluno participante
- `WORKER` - Obreiro/Instrutor/Recebedor

### StatusEnrollment
- `PENDENTE` - Aguardando aprovação
- `APROVADO` - Matrícula confirmada
- `ESPERA` - Lista de espera
- `DESISTENTE` - Desistiu do curso

### StatusPayment
- `PENDENTE` - Aguardando pagamento
- `PAGO` - Pagamento confirmado
- `ATRASADO` - Passou do vencimento
- `CANCELADO` - Pagamento cancelado

### TypePayment
- `MATRICULA` - Taxa de matrícula
- `MENSALIDADE` - Parcela mensal
- `MATERIAL` - Material didático
- `OUTRO` - Outros valores

## Índices de Performance

| Tabela | Índice | Uso |
|--------|--------|-----|
| events | `isActive` | Listar cursos ativos |
| events | `startDate` | Ordenar por data |
| people | `roleType` | Filtrar alunos/obreiros |
| people | `email` | Login/busca |
| people | `fullName` | Busca por nome |
| enrollments | `[personId, eventId]` (único) | Evita duplicatas |
| enrollments | `status` | Filtrar por status |
| enrollments | `eventId` | Listar alunos do curso |
| enrollments | `personId` | Histórico do aluno |
| payments | `status` | Contas a receber/pagar |
| payments | `type` | Relatórios por tipo |
| payments | `enrollmentId` | Histórico de pagamentos |
| payments | `dueDate` | Contas vencidas |

## Comandos de Migração

### 1. Criar nova migração
```bash
npx prisma migrate dev --name nome_da_migracao
```

### 2. Aplicar migrações em produção
```bash
npx prisma migrate deploy
```

### 3. Resetar banco (cuidado!)
```bash
npx prisma migrate reset
```

### 4. Gerar cliente Prisma
```bash
npx prisma generate
```

### 5. Abrir Prisma Studio (GUI)
```bash
npx prisma studio
```

### 6. Popular com dados de teste
```bash
npm run db:seed
```

## Convenções

- **IDs**: UUID v4 (`@id @default(uuid()) @db.Uuid`)
- **Timestamps**: `created_at` e `updated_at` em todas as tabelas
- **Nomes de tabelas**: snake_case no banco (`@map`)
- **Nomes de campos**: camelCase no Prisma, snake_case no banco
- **Soft delete**: Usar `status` ao invés de deletar registros
- **Valores monetários**: `Decimal @db.Decimal(10, 2)`
- **JSON**: Campos flexíveis como `address` (endereço)
