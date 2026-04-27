# Camada de Serviços

Esta camada encapsula o acesso ao banco de dados via Prisma, fornecendo uma API tipada e reutilizável.

## Estrutura

```
/services
├── index.ts              # Exporta todos os serviços
├── event-service.ts      # Gestão de eventos/cursos
├── people-service.ts     # Gestão de pessoas (alunos/obreiros)
├── enrollment-service.ts # Gestão de matrículas
└── payment-service.ts    # Gestão de pagamentos (tesouraria)
```

## Serviços

### EventService

Gerencia eventos/cursos oferecidos.

```typescript
import { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  getAvailableSlots 
} from "@/services/event-service";
```

**Funções:**
- `getAllEvents(where?)` - Lista eventos com contagem de matrículas
- `getEventById(id)` - Busca evento com matrículas e pagamentos
- `createEvent(data)` - Cria novo evento
- `updateEvent(id, data)` - Atualiza evento
- `deleteEvent(id)` - Remove evento
- `getAvailableSlots(eventId)` - Retorna vagas disponíveis

**Tipos:**
- `CreateEventInput` - Dados para criar evento
- `UpdateEventInput` - Dados para atualizar evento
- `EventWhereInput` - Filtros de busca

---

### PeopleService

Gerencia pessoas (alunos e obreiros).

```typescript
import { 
  getAllPeople, 
  getPersonById, 
  createPerson, 
  updatePerson, 
  deletePerson,
  getAllStudents,
  getAllWorkers,
  getPersonByEmail,
  getPersonByCpf 
} from "@/services/people-service";
```

**Funções:**
- `getAllPeople(where?)` - Lista pessoas
- `getPersonById(id)` - Busca pessoa com matrículas
- `getPersonByEmail(email)` - Busca por email
- `getPersonByCpf(cpf)` - Busca por CPF
- `createPerson(data)` - Cria pessoa
- `updatePerson(id, data)` - Atualiza pessoa
- `deletePerson(id)` - Remove pessoa
- `getAllStudents()` - Lista apenas alunos
- `getAllWorkers()` - Lista apenas obreiros

---

### EnrollmentService

Gerencia matrículas de alunos em eventos.

```typescript
import { 
  getAllEnrollments, 
  getEnrollmentById, 
  createEnrollment, 
  updateEnrollment, 
  deleteEnrollment,
  getEnrollmentsByEvent,
  getEnrollmentsByPerson,
  approveEnrollment,
  rejectEnrollment,
  moveToWaitlist,
  countEnrollmentsByStatus 
} from "@/services/enrollment-service";
```

**Funções:**
- `getAllEnrollments(where?)` - Lista matrículas
- `getEnrollmentById(id)` - Busca matrícula completa
- `getEnrollmentsByEvent(eventId)` - Matrículas de um evento
- `getEnrollmentsByPerson(personId)` - Matrículas de uma pessoa
- `createEnrollment(data)` - Cria matrícula
- `updateEnrollment(id, data)` - Atualiza matrícula
- `deleteEnrollment(id)` - Remove matrícula
- `approveEnrollment(id, approvedBy)` - Aprova matrícula
- `rejectEnrollment(id)` - Marca como desistente
- `moveToWaitlist(id)` - Move para lista de espera
- `countEnrollmentsByStatus(eventId)` - Contagem por status

---

### PaymentService

Gerencia pagamentos (tesouraria).

```typescript
import { 
  getAllPayments, 
  getPaymentById, 
  createPayment, 
  updatePayment, 
  deletePayment,
  getPaymentsByEnrollment,
  getPaymentsByStatus,
  confirmPayment,
  markAsOverdue,
  cancelPayment,
  getTotalPaymentsByType,
  getPaymentsSummary 
} from "@/services/payment-service";
```

**Funções:**
- `getAllPayments(where?)` - Lista pagamentos
- `getPaymentById(id)` - Busca pagamento
- `getPaymentsByEnrollment(enrollmentId)` - Pagamentos de uma matrícula
- `getPaymentsByStatus(status)` - Filtra por status
- `createPayment(data)` - Cria pagamento
- `updatePayment(id, data)` - Atualiza pagamento
- `deletePayment(id)` - Remove pagamento
- `confirmPayment(id, receivedBy, reference?)` - Confirma pagamento
- `markAsOverdue(id)` - Marca como atrasado
- `cancelPayment(id)` - Cancela pagamento
- `getTotalPaymentsByType()` - Total arrecadado por tipo
- `getPaymentsSummary()` - Resumo geral de pagamentos

## Exemplos de Uso

### Criar um novo evento

```typescript
import { createEvent } from "@/services/event-service";

const event = await createEvent({
  name: "Curso de Teologia",
  description: "Curso introdutório",
  location: "Igreja Central",
  startDate: new Date("2025-03-01"),
  endDate: new Date("2025-06-30"),
  maxCapacity: 50,
  price: 150.00,
  isActive: true,
});
```

### Matricular um aluno

```typescript
import { createEnrollment, approveEnrollment } from "@/services/enrollment-service";

const enrollment = await createEnrollment({
  person: { connect: { id: personId } },
  event: { connect: { id: eventId } },
  status: "PENDENTE",
});

// Aprovar matrícula
await approveEnrollment(enrollment.id, workerId);
```

### Registrar pagamento

```typescript
import { createPayment, confirmPayment } from "@/services/payment-service";

const payment = await createPayment({
  enrollment: { connect: { id: enrollmentId } },
  type: "MATRICULA",
  amount: 150.00,
  status: "PENDENTE",
  dueDate: new Date("2025-02-15"),
});

// Confirmar pagamento
await confirmPayment(payment.id, workerId, "PIX-12345");
```

### Listar todos os aprovados de um evento

```typescript
import { getEnrollmentsByEvent } from "@/services/enrollment-service";

const enrollments = await getEnrollmentsByEvent(eventId);
const approved = enrollments.filter(e => e.status === "APROVADO");
```

### Resumo financeiro

```typescript
import { getPaymentsSummary } from "@/services/payment-service";

const summary = await getPaymentsSummary();
console.log(`Total arrecadado: R$ ${summary.totalAmount}`);
```

## Boas Práticas

1. **Sempre use os tipos exportados** para garantir type safety
2. **Prefira funções específicas** (ex: `getAllStudents`) ao invés de filtros genéricos quando possível
3. **Use includes conscientemente** - só inclua relações quando necessário
4. **Trate erros** - as funções lançam exceções do Prisma em caso de erro
