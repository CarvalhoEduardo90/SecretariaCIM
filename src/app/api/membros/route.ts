import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/membros - Lista todos os membros
export async function GET() {
  try {
    const membros = await prisma.membro.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(membros);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar membros" },
      { status: 500 }
    );
  }
}

// POST /api/membros - Cria novo membro
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const membro = await prisma.membro.create({
      data: {
        nome: body.nome,
        email: body.email,
        telefone: body.telefone,
        cargo: body.cargo,
        status: body.status || "ATIVO",
        dataNascimento: body.dataNascimento 
          ? new Date(body.dataNascimento) 
          : null,
        dataBatismo: body.dataBatismo 
          ? new Date(body.dataBatismo) 
          : null,
        endereco: body.endereco || null,
      },
    });
    
    return NextResponse.json(membro, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar membro" },
      { status: 500 }
    );
  }
}
