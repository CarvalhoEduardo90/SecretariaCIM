import { prisma } from "@/lib/prisma";

// Tipos baseados no schema
export interface CreateEventInput {
  name: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  maxCapacity: number;
  price?: number;
  isActive?: boolean;
}

export interface UpdateEventInput {
  name?: string;
  description?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  maxCapacity?: number;
  price?: number;
  isActive?: boolean;
}

export interface EventWhereInput {
  id?: string;
  name?: string;
  isActive?: boolean;
  startDate?: { gte?: Date; lte?: Date };
}

// Listar todos os eventos
export async function getAllEvents(where?: EventWhereInput): Promise<any[]> {
  return prisma.event.findMany({
    where,
    orderBy: { startDate: "asc" },
    include: {
      _count: {
        select: { enrollments: true },
      },
    },
  });
}

// Buscar evento por ID
export async function getEventById(id: string): Promise<any | null> {
  return prisma.event.findUnique({
    where: { id },
    include: {
      enrollments: {
        include: {
          person: true,
          payments: true,
        },
      },
    },
  });
}

// Criar evento
export async function createEvent(data: CreateEventInput): Promise<any> {
  return prisma.event.create({ data });
}

// Atualizar evento
export async function updateEvent(id: string, data: UpdateEventInput): Promise<any> {
  return prisma.event.update({
    where: { id },
    data,
  });
}

// Deletar evento
export async function deleteEvent(id: string): Promise<any> {
  return prisma.event.delete({ where: { id } });
}

// Contar vagas disponíveis
export async function getAvailableSlots(eventId: string): Promise<number> {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { maxCapacity: true },
  });

  if (!event) return 0;

  const approvedCount = await prisma.enrollment.count({
    where: {
      eventId,
      status: "APROVADO",
    },
  });

  return event.maxCapacity - approvedCount;
}
