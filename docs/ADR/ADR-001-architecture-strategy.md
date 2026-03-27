# ADR 001: Estratégia de Arquitetura e Governança

**Data:** 26 de Março de 2026
**Status:** Aceito

## Contexto
O objetivo deste portfólio é demonstrar competência em engenharia de software sênior, focando em sistemas distribuídos, resiliência financeira e orquestração de IA. Precisamos de uma estrutura que permita o desenvolvimento isolado de micro-serviços/apps, compartilhamento de código eficiente e garantias de qualidade.

## Decisões

### 1. Monorepo com Turborepo
Utilizaremos **Turborepo** para gerenciar múltiplos workspaces NPM.
- **Por que:** Facilita o compartilhamento de tipos e lógica entre Next.js (frontend) e NestJS (backend), além de otimizar o tempo de build/cache em CI/CD.

### 2. NestJS (Modular Architecture)
O backend seguirá o padrão modular do NestJS com **Clean Architecture**.
- **Por que:** Permite desacoplar a lógica de negócio (Services/Entities) das implementações externas (Stripe, LangChain, TypeORM).

### 3. Governança por IA (agents.md)
Implementamos um arquivo de regras estrito para assistentes de IA.
- **Por que:** Garante consistência no código (Zod, Type safety) e segurança em operações financeiras.

### 4. Estratégia de Testes
Toda funcionalidade deve ser acompanhada de testes unitários ou de integração.
- **Por que:** Demonstra maturidade profissional e garante que refatorações não quebrem o sistema.

## Consequências
- **Positivas:** Alta manutenibilidade, facilidade de escala e demonstração clara de padrões de design.
- **Negativas:** Curva de aprendizado inicial maior para a estrutura do monorepo.
