import { prisma } from "@/lib/prisma";
import { Payment, Prisma, StatusPayment, TypePayment } from "@prisma/client";

export type CreatePaymentInput = Prisma.PaymentCreateInput;
export type UpdatePaymentInput = Prisma.PaymentUpdateInput;
export type PaymentWhereInput = Prisma.PaymentWhereInput;

export async function getAllPayments(where?: PaymentWhereInput): Promise<Payment[]> {
  return prisma.payment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { enrollment: { include: { person: true, event: true } } },
  });
}

export async function getPaymentById(id: string): Promise<Payment | null> {
  return prisma.payment.findUnique({
    where: { id },
    include: { enrollment: { include: { person: true, event: true } } },
  });
}

export async function getPaymentsByEnrollment(enrollmentId: string): Promise<Payment[]> {
  return prisma.payment.findMany({
    where: { enrollmentId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPaymentsByStatus(status: StatusPayment): Promise<Payment[]> {
  return prisma.payment.findMany({
    where: { status },
    include: { enrollment: { include: { person: true, event: true } } },
    orderBy: { dueDate: "asc" },
  });
}

export async function createPayment(data: CreatePaymentInput): Promise<Payment> {
  return prisma.payment.create({ data });
}

export async function updatePayment(id: string, data: UpdatePaymentInput): Promise<Payment> {
  return prisma.payment.update({ where: { id }, data });
}

export async function deletePayment(id: string): Promise<Payment> {
  return prisma.payment.delete({ where: { id } });
}

export async function confirmPayment(id: string, receivedBy: string, reference?: string): Promise<Payment> {
  return prisma.payment.update({
    where: { id },
    data: { status: "PAGO", paidAt: new Date(), receivedBy, reference },
  });
}

export async function markAsOverdue(id: string): Promise<Payment> {
  return prisma.payment.update({
    where: { id },
    data: { status: "ATRASADO" },
  });
}

export async function cancelPayment(id: string): Promise<Payment> {
  return prisma.payment.update({
    where: { id },
    data: { status: "CANCELADO" },
  });
}

export async function getTotalPaymentsByType(): Promise<Record<TypePayment, number>> {
  const totals = await prisma.payment.groupBy({
    by: ["type"],
    where: { status: "PAGO" },
    _sum: { amount: true },
  });

  const result: Record<string, number> = { MATRICULA: 0, MENSALIDADE: 0, MATERIAL: 0, OUTRO: 0 };
  totals.forEach((t) => { result[t.type] = Number(t._sum.amount) || 0; });
  return result as Record<TypePayment, number>;
}

export async function getPaymentsSummary(): Promise<{ total: number; paid: number; pending: number; overdue: number; totalAmount: number }> {
  const [total, paid, pending, overdue, sumResult] = await Promise.all([
    prisma.payment.count(),
    prisma.payment.count({ where: { status: "PAGO" } }),
    prisma.payment.count({ where: { status: "PENDENTE" } }),
    prisma.payment.count({ where: { status: "ATRASADO" } }),
    prisma.payment.aggregate({ where: { status: "PAGO" }, _sum: { amount: true } }),
  ]);

  return { total, paid, pending, overdue, totalAmount: Number(sumResult._sum.amount) || 0 };
}
