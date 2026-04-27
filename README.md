# 📚 Sistema de Gestão de Cursos com Tesouraria Integrada

Sistema web completo para gerenciamento de cursos recorrentes, com foco em inscrição de participantes, controle operacional e gestão financeira (tesouraria).

Projetado para atender secretarias e equipes organizadoras, o sistema permite gerenciar todo o ciclo do curso — desde a inscrição até o acompanhamento financeiro dos participantes.

---

## 🚀 Funcionalidades

### 📥 Inscrições

* Formulário público para alunos e obreiros
* Cadastro completo de dados pessoais e ministeriais
* Controle de vagas e lista de espera (para alunos)
* Status de inscrição:

  * Pendente
  * Aprovado
  * Espera
  * Desistente

---

### 👥 Gestão de Participantes

* Listagem com filtros avançados
* Visualização detalhada em modal/painel
* Edição e exclusão de registros
* Promoção automática/manual de lista de espera
* Separação entre alunos e obreiros

---

### 💰 Tesouraria (Diferencial)

* Controle financeiro por inscrição
* Registro de pagamentos (total ou parcial)
* Status financeiro:

  * Pendente
  * Parcial
  * Pago
  * Isento
* Upload de comprovantes
* Resumo financeiro:

  * Total arrecadado
  * Valores pendentes
  * Índice de inadimplência

---

### 📊 Dashboard

* Estatísticas gerais do curso
* Indicadores por status, cidade e oficina
* Métricas financeiras integradas

---

### ⚙️ Administração

* Gestão de edições do curso (multi-evento)
* Controle de usuários e permissões
* Auditoria e logs
* Importação de dados via planilha

---

### 🧠 Recursos adicionais

* Ficha médica vinculada ao participante
* Programação do curso
* Gestão de equipes
* Feedback e avaliações
* Atualizações em tempo real

---

## 🏗️ Arquitetura

O sistema é organizado por módulos de domínio, garantindo escalabilidade e manutenção facilitada:

```bash
src/
  modules/
    students/
    workers/
    enrollments/
    treasury/
    teams/
    course/
    evaluations/
    admin/
```

---

## 🛠️ Tecnologias

* **Frontend:** Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui
* **Backend:** PostgreSQL (local) → preparado para Supabase
* **ORM:** Prisma
* **Validação:** Zod
* **Realtime (futuro):** Supabase

---

## 🗄️ Banco de Dados

Principais entidades:

* `events` — edições do curso
* `people` — participantes (alunos e obreiros)
* `enrollments` — inscrições e status
* `payments` — controle financeiro

Estrutura pensada para ser compatível com Supabase desde o início.

---

## 🔄 Fluxo do Sistema

1. Usuário realiza inscrição pública
2. Sistema cria registro e define status
3. Secretaria gerencia aprovação e vagas
4. Tesouraria acompanha pagamentos
5. Dashboard consolida informações

---

## 🎯 Objetivo

Centralizar e profissionalizar a gestão de cursos, reduzindo processos manuais, melhorando a organização e oferecendo visibilidade completa — inclusive financeira.

---

## 📌 Status do Projeto

🚧 Em desenvolvimento — arquitetura modular em construção por etapas

---

## 📄 Licença

Uso interno / privado (ajustar conforme necessidade)

---

## 🤝 Contribuição

Este projeto segue boas práticas de arquitetura e organização de código. Sugestões e melhorias são bem-vindas.
