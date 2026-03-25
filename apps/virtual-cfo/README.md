# Projeto 3: Virtual CFO (Fusão Financeira + IA)

## Visão Geral
Robô fiscal cognitivo que atua como um Diretor Financeiro Virtual, monitorando fluxos do Stripe e tomando decisões autônomas.

## Diferenciais Técnicos (Senioridade)
- **Tool Calling Autônomo:** Agentes do LangGraph com permissão para invocar métodos da API do Stripe (`stripe.refunds.create`, etc).
- **Lógica de Decisão Estocástica:**
    - IA analisa o LTV (Lifetime Value) e o histórico do cliente antes de decidir entre reembolso automático ou pausa de assinatura.
- **Governança e Segurança:**
    - Travas de segurança (`Human-in-the-loop`) para qualquer transação financeira acima de $100.
    - Monitoramento de fraudes e chargebacks em tempo real.

## Stack Tecnológica
- **Backend:** NestJS, LangGraph.js, Stripe SDK.
- **Frontend:** Next.js (Mesa de comando operacional estratégica).

## Casos de Uso
1. Webhook do Stripe avisa sobre falha de pagamento.
2. IA consulta histórico no PostgreSQL via TypeORM.
3. Se cliente é "High LTV", IA decide aplicar uma carência de 14 dias sem cancelar a conta.
4. Relatório de ação é enviado ao dashboard para auditoria.
