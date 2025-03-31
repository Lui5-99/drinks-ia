import axios from "axios";
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponseSchema,
  RecipeAPIResponseSchemaWithDrinks,
} from "../utils/recipes-schema";
import { Drink, SearchFilter } from "../types";

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios(url);
  const result = CategoriesAPIResponseSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }
}

export async function getRecipes(filters: SearchFilter) {
  const { ingredient, category } = filters;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}&c=${category}`;
  const { data } = await axios(url);
  const result = DrinksAPIResponseSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }
  throw new Error("Error fetching recipes");
}

export async function getRecipeById(id: Drink["idDrink"]) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data } = await axios(url);
  const result = RecipeAPIResponseSchemaWithDrinks.safeParse(data);

  if (result.success) {
    return result.data.drinks[0];
  }
}
