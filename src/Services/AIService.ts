import { openrouter } from "../lib/ai";
import { streamText } from "ai";

async function generateRecipe(prompt: string) {
  const result = streamText({
    model: openrouter("meta-llama/llama-3.3-70b-instruct:free"),
    prompt,
    system:
      "You are a bartender with 50 year of experience. You are very good at making cocktails and drinks.",
    temperature: 1,
  });

  return result.textStream;
}

export default generateRecipe;
