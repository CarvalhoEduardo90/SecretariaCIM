// Hooks específicos do módulo de membros

import { useState, useEffect, useCallback } from "react";
import { membrosApi } from "./api";
import { Membro, CreateMembroDTO, UpdateMembroDTO } from "./types";

export function useMembros() {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMembros = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await membrosApi.getAll();
      setMembros(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao carregar membros"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembros();
  }, [fetchMembros]);

  const createMembro = async (data: CreateMembroDTO) => {
    const newMembro = await membrosApi.create(data);
    setMembros((prev) => [...prev, newMembro]);
    return newMembro;
  };

  const updateMembro = async (id: string, data: UpdateMembroDTO) => {
    const updated = await membrosApi.update(id, data);
    setMembros((prev) =>
      prev.map((m) => (m.id === id ? updated : m))
    );
    return updated;
  };

  const deleteMembro = async (id: string) => {
    await membrosApi.delete(id);
    setMembros((prev) => prev.filter((m) => m.id !== id));
  };

  return {
    membros,
    isLoading,
    error,
    refetch: fetchMembros,
    createMembro,
    updateMembro,
    deleteMembro,
  };
}

export function useMembro(id: string) {
  const [membro, setMembro] = useState<Membro | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMembro = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await membrosApi.getById(id);
        setMembro(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Erro ao carregar membro"));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMembro();
    }
  }, [id]);

  return { membro, isLoading, error };
}
