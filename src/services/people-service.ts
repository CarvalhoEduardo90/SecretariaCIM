import { prisma } from "@/lib/prisma";

export interface CreatePersonInput {
  fullName: string;
  email: string;
  phone?: string;
  cpf?: string;
  birthDate?: Date;
  roleType: "STUDENT" | "WORKER";
  address?: any;
}

export interface UpdatePersonInput {
  fullName?: string;
  email?: string;
  phone?: string;
  cpf?: string;
  birthDate?: Date;
  roleType?: "STUDENT" | "WORKER";
  address?: any;
}

export interface PersonWhereInput {
  id?: string;
  email?: string;
  cpf?: string;
  roleType?: "STUDENT" | "WORKER";
}

export async function getAllPeople(where?: PersonWhereInput): Promise<any[]> {
  return prisma.person.findMany({
    where,
    orderBy: { fullName: "asc" },
    include: { _count: { select: { enrollments: true } } },
  });
}

export async function getPersonById(id: string): Promise<any | null> {
  return prisma.person.findUnique({
    where: { id },
    include: { enrollments: { include: { event: true, payments: true } } },
  });
}

export async function getPersonByEmail(email: string): Promise<any | null> {
  return prisma.person.findUnique({ where: { email } });
}

export async function createPerson(data: CreatePersonInput): Promise<any> {
  return prisma.person.create({ data });
}

export async function updatePerson(id: string, data: UpdatePersonInput): Promise<any> {
  return prisma.person.update({ where: { id }, data });
}

export async function deletePerson(id: string): Promise<any> {
  return prisma.person.delete({ where: { id } });
}

export async function getAllStudents(): Promise<any[]> {
  return prisma.person.findMany({ where: { roleType: "STUDENT" }, orderBy: { fullName: "asc" } });
}

export async function getAllWorkers(): Promise<any[]> {
  return prisma.person.findMany({ where: { roleType: "WORKER" }, orderBy: { fullName: "asc" } });
}

export async function getPersonByCpf(cpf: string): Promise<any | null> {
  return prisma.person.findUnique({ where: { cpf } });
}
