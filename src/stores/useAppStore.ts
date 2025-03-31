import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice";
import { createFavoriteSlice, FavoritesSliceType } from "./FavoritesSlice";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

export const useAppStore = create<
  RecipeSliceType & FavoritesSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
  }))
);
