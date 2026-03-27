# Senior Engineering Ecosystem: Financial & Autonomous Systems

Este monorepo demonstra proficiência em arquitetura de sistemas distribuídos, engenharia financeira com Stripe e orquestração de IA com LangGraph.

## 🚀 Arquitetura Geral
O ecossistema é gerenciado por um **Turborepo** para garantir build compartilhado, tipagem forte de ponta a ponta (Next.js ↔ NestJS) e reaproveitamento de esquemas Zod.

### Projetos Inclusos:
1.  **[Marketplace B2B](./apps/marketplace):** Engenharia Financeira resiliente (Stripe Connect).
2.  **[Triage Panda](./apps/triage-panda):** IA Multi-Agente autônoma para DevOps.
3.  **[Virtual CFO](./apps/virtual-cfo):** Agente de IA com capacidades de execução financeira.

---

## 🛡️ Manifesto de Qualidade
Para assegurar o nível de excelência técnica e senioridade, este repositório segue rigorosamente:
- **Trunk-Based Development:** Feature branches para cada sub-tarefa.
- **TDD & Testes de Integração:** Uso massivo de Vitest e Stripe CLI.
- **Idempotência e Resiliência:** Estratégias contra duplicidade de webhooks e condições de corrida.
- **Governança de IA:** Diretrizes estritas para co-autoria com assistentes de IA (Cursor/Copilot) definidas no [agents.md](./agents.md).

## 🛠️ Tecnologias Chave
- **Monorepo:** Turborepo, Workspaces.
- **Backends:** NestJS, TypeORM, PostgreSQL.
- **Frontends:** Next.js 15+ (App Router), Tailwind CSS.
- **IA:** LangGraph.js, OpenAI, Pinecone (RAG).
- **Finanças:** Stripe SDK, Stripe Connect.

---

## 📦 Como Executar
1. Instale o Turbo: `npm install -g turbo`
2. Instale as dependências: `npm install`
3. Execute em dev: `npm run dev`
