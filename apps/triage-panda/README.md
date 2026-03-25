# Projeto 2: Triage Panda (IA Multi-Agente)

## Visão Geral
Ferramenta interna de DevOps para resolução estratégica de bugs via IAs autônomas integradas ao GitHub.

## Diferenciais Técnicos (Senioridade)
- **Multi-Agent Supervisor Pattern:** Orquestração complexa com LangGraph.js, onde um Agente Supervisor delega tarefas para agentes especialistas.
- **Arquitetura Cognitiva:**
    - **Agente Analista (RAG):** Busca semântica em código usando Pinecone ou `pgvector`.
    - **Agente de Pesquisa:** Varredura web via Tavily API.
- **Human-in-the-Loop:** Interrupção forçada (`interruptBefore`) para aprovação manual de Pull Requests geradas por IA.

## Stack Tecnológica
- **Backend:** NestJS (Orquestrador), LangGraph.js, OpenAI/Anthropic.
- **Banco Vetorial:** Pinecone ou pgvector.
- **Frontend:** Next.js (Dashboards de visualização de grafos em tempo real).

## Fluxo de Trabalho
1. GitHub Webhook notifica erro ou nova Issue.
2. Supervisor analisa o erro e chama o Agente Analista (RAG).
3. Agente propõe correção e gera um rascunho de Pull Request.
4. O sistema pausa e aguarda aprovação humana via Dashboard antes de abrir a PR oficial.
