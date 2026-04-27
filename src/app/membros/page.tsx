import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

export default function MembrosPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Membros</h1>
          <p className="text-muted-foreground">
            Gerencie os membros da congregação
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Membro
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Lista de Membros
          </CardTitle>
          <CardDescription>
            Visualize e gerencie todos os membros cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground py-8 text-center">
            Nenhum membro cadastrado. Clique em "Novo Membro" para começar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
