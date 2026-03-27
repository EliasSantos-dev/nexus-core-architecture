# Manifesto de Engenharia e Estratégia de Portfólio Sênior

**Data:** 25 de Março de 2026
**Status:** [APPROVED]
**Arquitetura:** Monorepo (Turborepo) com Workspaces NPM/Yarn.

## 1. Visão Geral do Ecossistema
Este repositório não é apenas um conjunto de aplicações, mas uma demonstração de **Engenharia de Sistemas Distribuídos**. Ele unifica:
- **Engenharia Financeira:** Resiliência e idempotência com Stripe Connect.
- **Inteligência Artificial Autônoma:** Orquestração de grafos cognitivos com LangGraph.js.
- **Arquitetura de Software:** Clean Architecture e modularidade extrema no NestJS.

---

## 2. Padrões de Qualidade e Governança de Engenharia

Para demonstrar senioridade e garantir um desenvolvimento estruturado e previsível, aplicaremos rigorosamente:

### 2.1 Estratégia de Git & Branching (Trunk-Based)
- **`main`**: Branch de produção. Protegida contra commits diretos.
- **`develop`**: Branch de integração estável.
- **`feature/[app]-[funcionalidade]`**: Branches de curta duração. 
  - *Fluxo:* Toda branch deve conter **Testes Automatizados** antes ou junto com a implementação.
  - *PRs:* Pull Requests detalhados com evidências de teste.

### 2.2 Padrão de Commits Atômicos (Conventional Commits)
Os commits devem ser pequenos e explicar o "porquê".
- `feat(app):` novas funcionalidades.
- `test(app):` adição de cobertura de testes.
- `docs(root):` melhorias na documentação e ADRs.
- `chore(root):` configurações de infraestrutura.

---

## 3. Cronograma de Execução e Commits (Semana 1)

Este cronograma simula um progresso estruturado para o seu portfólio.

| Dia | Objetivo | Commits Esperados (Exemplos) |
| :--- | :--- | :--- |
| **01** | **Fundação e Governança** | `chore: init turborepo`, `docs: ADR-001 strategy`, `docs: agents.md` |
| **02** | **Boilerplate e CI/CD** | `feat(marketplace): base nestjs`, `feat(shared): shared-types`, `ci: github actions` |
| **03** | **Engenharia Financeira** | `test(marketplace): stripe module`, `feat(marketplace): idempotency layer` |
| **04** | **IA & Orquestração** | `test(panda): langgraph state`, `feat(panda): supervisor node`, `docs: agent-flow` |

---

## 4. Detalhamento dos Projetos

### P1: Marketplace B2B (Next.js + NestJS + Stripe Connect)
- **Foco:** Webhooks resilientes, `Destination Charges`, Onboarding Embutido.
- **Desafio Sênior:** Lidar com falhas de rede usando a tabela `webhook_events` e `@VersionColumn` (Optimistic Locking).

### P2: Triage Panda (Next.js + NestJS + LangGraph.js)
- **Foco:** Agentes autônomos para correção de bugs via GitHub Webhooks.
- **Desafio Sênior:** Implementar o padrão `Supervisor` com `Human-in-the-loop` para aprovação de PRs gerados por IA.

### P3: Virtual CFO (Fusão Stripe + LangGraph)
- **Foco:** IA com permissões financeiras limitadas.
- **Desafio Sênior:** Implementar travas de segurança onde a IA requer aprovação humana para transações > $100.

---

## 5. Arquivos de Governança (Obrigatórios)
- `README.md`: Visão técnica e diagramas Mermaid.js.
- `agents.md`: Regras para assistentes de IA (ex: "Não use 'any'", "Sempre prefira Zod").
- `docs/ADR/`: Architecture Decision Records (Explicando por que Turborepo, por que NestJS, etc).
