import { ChangeEvent } from "react";
import { Categories } from "../types";
import { useAppStore } from "../stores/useAppStore";

interface SearchFormProps {
  categories: Categories;
  searchFilters: { ingredient: string; category: string };
  setSearchFilters: React.Dispatch<
    React.SetStateAction<{ ingredient: string; category: string }>
  >;
}

const SearchForm = ({
  categories,
  searchFilters,
  setSearchFilters,
}: SearchFormProps) => {
  const searchRecipes = useAppStore((state) => state.searchRecipes);
  const showNotification = useAppStore((state) => state.showNotification);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(searchFilters).some((value) => value === "")) {
      showNotification({
        text: "Por favor, completa todos los campos",
        error: true,
      });
      return;
    }
    searchRecipes(searchFilters);
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 rounded-lg p-10 shadow space-y-6"
    >
      <div className="space-y-4">
        <label
          htmlFor="ingredient"
          className="block text-white uppercase font-extrabold text-lg"
        >
          Nombre o ingredientes
        </label>
        <input
          type="text"
          id="ingredient"
          name="ingredient"
          className="bg-white p-3 w-full rounded-lg focus:outline-none"
          placeholder="Nombre o ingrediente. Ej. Vodka, Tequila, etc."
          onChange={handleOnChange}
          value={searchFilters.ingredient}
        />
      </div>
      <div className="space-y-4">
        <label
          htmlFor="category"
          className="block text-white uppercase font-extrabold text-lg"
        >
          Categoría
        </label>
        <select
          id="category"
          name="category"
          className="bg-white p-3 w-full rounded-lg focus:outline-none"
          onChange={handleOnChange}
          value={searchFilters.category}
        >
          <option value="">Selecciona una categoría</option>
          {categories.drinks.map((category) => (
            <option key={category.strCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
        <input
          type="submit"
          value="Buscar recetas"
          className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg transition-colors duration-300 uppercase"
        />
      </div>
    </form>
  );
};

export default SearchForm;
