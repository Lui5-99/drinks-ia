import { z } from "zod";
import {
  CategoriesAPIResponseSchema,
  SearchFiltersSchema,
  DrinksAPIResponseSchema,
  DrinkAPIResponseSchema,
  RecipeAPIResponseSchema,
} from "../utils/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFiltersSchema>;
export type Drinks = z.infer<typeof DrinksAPIResponseSchema>;
export type Drink = z.infer<typeof DrinkAPIResponseSchema>;
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>;
