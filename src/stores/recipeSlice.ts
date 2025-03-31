import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipeById,
  getRecipes,
} from "../Services/RecipeService";
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types";

export type RecipeSliceType = {
  categories: Categories;
  drinks: Drinks;
  recipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (SearchFilter: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  recipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },
  searchRecipes: async (searchFilter) => {
    const drinks = await getRecipes(searchFilter);
    set({
      drinks,
    });
  },
  selectRecipe: async (id) => {
    const recipe = await getRecipeById(id);
    set({
      recipe,
      modal: true,
    });
  },
  closeModal: () => set({ modal: false, recipe: {} as Recipe }),
});
