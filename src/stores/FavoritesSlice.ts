import { StateCreator } from "zustand";
import { Recipe } from "../types";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickAddFavorites: (recipe: Recipe) => void;
  handleClickRemoveFavorites: (recipe: Recipe) => void;
  favoriteExists: (recipe: Recipe) => boolean;
  loadFromLocalStorage: () => void;
};

export const createFavoriteSlice: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: [],
  handleClickAddFavorites: (recipe: Recipe) => {
    const { favoriteExists } = get();
    if (favoriteExists(recipe)) {
      return;
    }
    set((state) => ({
      favorites: [...state.favorites, recipe],
    }));
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  handleClickRemoveFavorites: (recipe: Recipe) => {
    set((state) => ({
      favorites: state.favorites.filter(
        (item) => item.idDrink !== recipe.idDrink
      ),
    }));
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExists: (recipe: Recipe) => {
    const { favorites } = get();
    return favorites.some((item) => item.idDrink === recipe.idDrink);
  },
  loadFromLocalStorage: () => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      set({ favorites: JSON.parse(favorites) });
    } else {
      set({ favorites: [] });
    }
  },
});
