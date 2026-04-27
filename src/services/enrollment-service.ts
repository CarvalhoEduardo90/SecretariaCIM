import { prisma } from "@/lib/prisma";
import { Enrollment, Prisma, StatusEnrollment } from "@prisma/client";

export type CreateEnrollmentInput = Prisma.EnrollmentCreateInput;
export type UpdateEnrollmentInput = Prisma.EnrollmentUpdateInput;
export type EnrollmentWhereInput = Prisma.EnrollmentWhereInput;

export async function getAllEnrollments(where?: EnrollmentWhereInput): Promise<Enrollment[]> {
  return prisma.enrollment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { person: true, event: true, payments: true },
  });
}

export async function getEnrollmentById(id: string): Promise<Enrollment | null> {
  return prisma.enrollment.findUnique({
    where: { id },
    include: { person: true, event: true, payments: true },
  });
}

export async function getEnrollmentsByEvent(eventId: string): Promise<Enrollment[]> {
  return prisma.enrollment.findMany({
    where: { eventId },
    include: { person: true, payments: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getEnrollmentsByPerson(personId: string): Promise<Enrollment[]> {
  return prisma.enrollment.findMany({
    where: { personId },
    include: { event: true, payments: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createEnrollment(data: CreateEnrollmentInput): Promise<Enrollment> {
  return prisma.enrollment.create({ data });
}

export async function updateEnrollment(id: string, data: UpdateEnrollmentInput): Promise<Enrollment> {
  return prisma.enrollment.update({ where: { id }, data });
}

export async function deleteEnrollment(id: string): Promise<Enrollment> {
  return prisma.enrollment.delete({ where: { id } });
}

export async function approveEnrollment(id: string, approvedBy: string): Promise<Enrollment> {
  return prisma.enrollment.update({
    where: { id },
    data: { status: "APROVADO", approvedAt: new Date(), approvedBy },
  });
}

export async function rejectEnrollment(id: string): Promise<Enrollment> {
  return prisma.enrollment.update({
    where: { id },
    data: { status: "DESISTENTE" },
  });
}

export async function moveToWaitlist(id: string): Promise<Enrollment> {
  return prisma.enrollment.update({
    where: { id },
    data: { status: "ESPERA" },
  });
}

export async function countEnrollmentsByStatus(eventId: string): Promise<Record<StatusEnrollment, number>> {
  const counts = await prisma.enrollment.groupBy({
    by: ["status"],
    where: { eventId },
    _count: { status: true },
  });

  const result: Record<string, number> = { PENDENTE: 0, APROVADO: 0, ESPERA: 0, DESISTENTE: 0 };
  counts.forEach((c) => { result[c.status] = c._count.status; });
  return result as Record<StatusEnrollment, number>;
}
