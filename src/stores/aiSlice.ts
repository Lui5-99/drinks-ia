import { StateCreator } from "zustand";
import generateRecipe from "../Services/AIService";

export type AISlice = {
  recipeAI: string;
  isGenerating: boolean;
  generateRecipe: (prompt: string) => Promise<void>;
};

export const createAISlice: StateCreator<AISlice, [], [], AISlice> = (set) => ({
  recipeAI: "",
  isGenerating: false,
  generateRecipe: async (prompt) => {
    set({ recipeAI: "", isGenerating: true });
    const data = await generateRecipe(prompt);
    for await (const chunk of data) {
      set((state) => ({
        recipeAI: state.recipeAI + chunk,
      }));
    }
    set({ isGenerating: false });
  },
});
