import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice";
import { createFavoriteSlice, FavoritesSliceType } from "./FavoritesSlice";

export const useAppStore = create<RecipeSliceType & FavoritesSliceType>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
  }))
);
