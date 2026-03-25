# AI Governance & Coding Standards (agents.md)

Este arquivo define as regras que os assistentes de IA (GitHub Copilot, Cursor, Gemini) devem respeitar neste repositório.

## 1. Regras de Código (TypeScript/NestJS)
- **Tipagem Forte:** Proibido o uso de `any`. Use interfaces ou tipos compartilhados do `packages/shared`.
- **Validação de Dados:** Todos os inputs de API devem usar `Zod` ou `Class-Validator`.
- **Injeção de Dependências:** Siga rigorosamente o padrão modular do NestJS.
- **Segurança Financeira:** Sempre envolva operações do Stripe em blocos `try-catch` com logs de erro detalhados (sem expor PII).

## 2. Padrões de Git
- **Commits:** Siga o padrão Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`).
- **Branching:** IA não deve sugerir commits diretos na `main`. Sempre sugira criar uma branch `feature/xxx`.
- **Atomicidade:** Commits devem ser pequenos e focados em uma única responsabilidade.

## 3. Padrões de IA (LangGraph)
- **Checkpointers:** Sempre use persistência (Checkpointers) em grafos de produção.
- **Interrupts:** Qualquer ação destrutiva ou financeira > $100 deve obrigatoriamente ter um nó de `interruptBefore` (Human-in-the-loop).

## 4. Estilo de UI (Next.js)
- **Clean UI:** Siga o padrão Shadcn/UI e Tailwind CSS.
- **Server Components:** Prefira Server Components a menos que o estado do cliente seja estritamente necessário.
