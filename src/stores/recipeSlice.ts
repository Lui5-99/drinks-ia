import { StateCreator } from "zustand";
import { getCategories } from "../Services/RecipeService";
import { Categories } from "../types";

export type RecipeSliceType = {
  categories: Categories;
  fetchCategories: () => Promise<void>;
};

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },
});
