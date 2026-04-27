// Tipos específicos do módulo de membros

export interface Membro {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  dataNascimento?: Date;
  dataBatismo?: Date;
  cargo?: string;
  status: "ativo" | "inativo" | "transferido";
  endereco?: Endereco;
  createdAt: Date;
  updatedAt: Date;
}

export interface Endereco {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface CreateMembroDTO {
  nome: string;
  email: string;
  telefone?: string;
  dataNascimento?: Date;
  dataBatismo?: Date;
  cargo?: string;
  endereco?: Endereco;
}

export interface UpdateMembroDTO {
  nome?: string;
  email?: string;
  telefone?: string;
  dataNascimento?: Date;
  dataBatismo?: Date;
  cargo?: string;
  status?: "ativo" | "inativo" | "transferido";
  endereco?: Endereco;
}
