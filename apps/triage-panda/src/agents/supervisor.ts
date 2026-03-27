import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

export const createSupervisor = async (llm: ChatOpenAI, members: string[]) => {
  const systemPrompt = `Você é um supervisor encarregado de gerenciar uma conversa entre os seguintes trabalhadores: {members}.
Dado o pedido do usuário, responda com o trabalhador que deve agir em seguida.
Cada trabalhador executará uma tarefa e responderá com seus resultados e status.
Quando terminar, responda com FINISH.`;

  const options = [...members, "FINISH"];

  const routingTool = {
    name: "route",
    description: "Seleciona o próximo trabalhador.",
    schema: {
      type: "object",
      properties: {
        next: {
          type: "string",
          enum: options,
        },
      },
      required: ["next"],
    },
  };

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("messages"),
    [
      "system",
      "Dada a conversa acima, quem deve agir em seguida? Ou devemos terminar? Selecione um de: {options}",
    ],
  ]);

  const formattedPrompt = await prompt.partial({
    options: options.join(", "),
    members: members.join(", "),
  });

  return formattedPrompt
    .pipe(llm.bindTools([routingTool]))
    .pipe((x: any) => {
      const toolCall = x.tool_calls?.[0];
      if (!toolCall) return "FINISH";
      return toolCall.args.next;
    });
};
