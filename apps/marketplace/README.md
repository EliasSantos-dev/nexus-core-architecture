# Projeto 1: Marketplace B2B (Next.js + NestJS + Stripe Connect)

## Visão Geral
Plataforma SaaS B2B focada em "Marketplace de Serviços Analíticos", onde empresas compram relatórios de parceiros.

## Diferenciais Técnicos (Senioridade)
- **Stripe Connect (Embedded Onboarding):** Integração via `Onboarding Session Tokens` para conformidade KYC/AML sem sair do dashboard.
- **Engenharia Financeira Resiliente:**
    - **Idempotência:** Tabela `webhook_events` no PostgreSQL para prevenir processamento duplicado de eventos.
    - **Optimistic Locking:** Uso de `@VersionColumn` no TypeORM para evitar condições de corrida em saldos e assinaturas.
- **Topologia de Pagamento:** Uso de `Destination Charges` e `Separate Charges and Transfers`.

## Stack Tecnológica
- **Backend:** NestJS, TypeORM, PostgreSQL.
- **Frontend:** Next.js (App Router), Tailwind CSS, Shadcn/UI.
- **Financeiro:** Stripe SDK, Stripe CLI (para testes de webhook).

## Fluxo de Dados
1. Cliente inicia checkout no Next.js.
2. NestJS cria `PaymentIntent` via SDK.
3. Webhook do Stripe notifica o backend.
4. Backend valida assinatura criptográfica e verifica idempotência antes de provisionar o serviço.
