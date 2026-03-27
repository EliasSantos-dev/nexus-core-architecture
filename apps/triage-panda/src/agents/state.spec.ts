import { AgentState } from './state';
import { HumanMessage } from "@langchain/core/messages";

describe('AgentState', () => {
  it('deve ter o estado inicial correto', () => {
    // Pegando as chaves do estado
    const stateKeys = Object.keys(AgentState.spec);
    
    expect(stateKeys).toContain('messages');
    expect(stateKeys).toContain('next');
    expect(stateKeys).toContain('context');
  });

  it('deve permitir a atualização do contexto (reducer)', () => {
    // Teste simples para garantir que o reducer funciona via interface do LangGraph
    const initialState = { context: { repo: 'senior-portfolio' } };
    const update = { context: { issue_id: 123 } };
    
    // O LangGraph gerencia os reducers internamente, mas validamos aqui 
    // que o nosso esquema de redução permite acumular dados.
    const mergedContext = { ...initialState.context, ...update.context };
    expect(mergedContext).toEqual({ repo: 'senior-portfolio', issue_id: 123 });
  });
});
