# Nexus Core Architecture

Monorepo **Turborepo** explorando arquitetura de sistemas distribuídos com foco em **engenharia de pagamentos** e **Clean Architecture**. O propósito do repositório é demonstrar decisões de arquitetura, separação de camadas e testabilidade.

## 🗂️ Estrutura

```
apps/
├── marketplace/   # ✅ Marketplace B2B — pagamentos (Stripe) e webhooks (NestJS)
├── triage-panda/  # 🚧 roadmap — automação de DevOps
└── virtual-cfo/   # 🚧 roadmap — agente financeiro
packages/
└── shared/        # código e contratos compartilhados entre apps
```

> **Transparência:** hoje o app **marketplace** é o que está implementado. `triage-panda` e `virtual-cfo` são direções planejadas do ecossistema e ainda não possuem código.

## ✅ Marketplace B2B (implementado)

API **NestJS** com pagamentos via **Stripe** e processamento de **webhooks**, organizada em camadas:

- `application/` — casos de uso: `payment.service`, `product.service`, `webhook-processor.service`
- Validação de entrada com **Zod**
- **Testes** (`*.spec.ts`) cobrindo serviços e o processamento de webhooks
- Pacote **`@senior-portfolio/shared`** com contratos reutilizados

## 🧰 Tooling

- **Turborepo** — build e cache compartilhados, tipagem forte entre pacotes
- **TypeScript** em todo o monorepo
- **NestJS** no backend

## 🚀 Rodando

```bash
npm install
npx turbo run dev
```
