import { useAppStore } from "../stores/useAppStore";
import { Drink } from "../types";

interface DrinkCardProps {
  drink: Drink;
}

const DrinkCard = ({ drink }: DrinkCardProps) => {
  const selectRecipe = useAppStore((state) => state.selectRecipe);

  return (
    <div className="bg-[#fefefe] shadow-lg">
      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          className="hover:scale-110 transition-transform hover:rotate-2"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white"
          onClick={() => selectRecipe(drink.idDrink)}
        >
          Ver receta
        </button>
      </div>
    </div>
  );
};

export default DrinkCard;
