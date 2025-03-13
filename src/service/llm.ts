import { config } from "dotenv";
import { Expense, ExpenseSchema } from "./expense";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatPromptTemplate } from "@langchain/core/prompts.cjs";

config();

export class LLMService {
  private prompt: ChatPromptTemplate;
  private llm: ChatMistralAI;
  private runnable: any;

  constructor() {
    this.prompt = ChatPromptTemplate.fromMessages([
      {
        role: "system",
        content:
          "You are an expert extraction algorithm. " +
          "Only extract relevant information from the text. " +
          "If you do not know the value of an attribute asked to extract, " +
          "return null for the attribute's value.",
      },
      { role: "human", content: "{text}" },
    ]);

    const apiKey = process.env.MISTRAL_API_KEY;
    this.llm = new ChatMistralAI({
      apiKey,
      model: "mistral-large-latest",
      temperature: 0,
    });

    this.runnable = this.prompt.pipe(
      this.llm.withStructuredOutput(ExpenseSchema)
    );
  }

  async runLLM(message: string): Promise<Expense> {
    return await this.runnable.invoke({ text: message });
  }
}
