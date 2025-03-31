import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponseSchema,
  RecipeAPIResponseSchemaWithDrinks,
} from "../utils/recipes-schema";
import { Drink, SearchFilter } from "../types";
import api from "../lib/axios";

export async function getCategories() {
  const url = "/list.php?c=list";
  const { data } = await api(url);
  const result = CategoriesAPIResponseSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }
}

export async function getRecipes(filters: SearchFilter) {
  const { ingredient, category } = filters;
  const url = `/filter.php?i=${ingredient}&c=${category}`;
  const { data } = await api(url);
  const result = DrinksAPIResponseSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }
  throw new Error("Error fetching recipes");
}

export async function getRecipeById(id: Drink["idDrink"]) {
  const url = `/lookup.php?i=${id}`;
  const { data } = await api(url);
  const result = RecipeAPIResponseSchemaWithDrinks.safeParse(data);

  if (result.success) {
    return result.data.drinks[0];
  }
}
