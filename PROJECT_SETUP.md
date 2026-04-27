# Secretaria CIM - Setup do Projeto

## Tecnologias

- **Next.js 16.2.4** (App Router)
- **React 19.2.4**
- **TypeScript 5**
- **TailwindCSS v4**
- **shadcn/ui** (base-nova style)
- **Lucide Icons**

## Estrutura de Pastas

```
/src
  /app                    # Rotas Next.js App Router
    /configuracoes        # Página de configurações
    /membros              # Página de membros
    /relatorios           # Página de relatórios
    globals.css           # Estilos globais + Tailwind
    layout.tsx            # Layout base com Navbar
    page.tsx              # Dashboard inicial

  /components
    /layout               # Componentes de layout
      navbar.tsx          # Navegação principal
    /ui                   # Componentes shadcn/ui
      button.tsx
      card.tsx
      navigation-menu.tsx
      sheet.tsx

  /hooks                  # Hooks globais
    use-local-storage.ts
    index.ts

  /lib                    # Utilitários
    utils.ts              # cn() helper

  /modules                # Módulos de domínio
    /membros              # Exemplo de módulo
      api.ts              # API calls
      hooks.ts            # Hooks específicos
      types.ts            # Tipos do módulo
      index.ts            # Exports

  /providers              # Context providers
    app-providers.tsx

  /services               # Serviços globais
    api-client.ts         # Cliente HTTP

  /types                  # Tipos globais
    index.ts

  /utils                  # Utilitários globais
    index.ts
```

## Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa ESLint
```

## Comandos Úteis

### Adicionar componentes shadcn/ui

```bash
npx shadcn@latest add [componente]
```

Exemplos: `button`, `card`, `input`, `dialog`, `table`, `form`

## Navegação

O sistema possui navegação em 4 seções:

- **Dashboard** (/) - Visão geral
- **Membros** (/membros) - Gestão de membros
- **Relatórios** (/relatorios) - Geração de relatórios
- **Configurações** (/configuracoes) - Ajustes do sistema

## Desenvolvimento

1. Inicie o servidor:
   ```bash
   npm run dev
   ```

2. Acesse: http://localhost:3000

## Build

O projeto foi testado com build de produção e todas as páginas são estáticas (SSG).
