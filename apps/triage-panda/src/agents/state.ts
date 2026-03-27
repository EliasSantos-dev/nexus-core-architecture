import { Annotation, MessagesAnnotation } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";

export const AgentState = Annotation.Root({
  ...MessagesAnnotation.spec,
  // O próximo agente a ser chamado (definido pelo supervisor)
  next: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "supervisor",
    default: () => "supervisor",
  }),
  // Contexto adicional do bug (repo, issue_id, logs)
  context: Annotation<Record<string, any>>({
    reducer: (x, y) => ({ ...x, ...y }),
    default: () => ({}),
  }),
});

export type AgentState = typeof AgentState.State;
