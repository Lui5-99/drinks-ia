import { Dialog, Transition } from "@headlessui/react";
import { Fragment, JSX } from "react";
import { useAppStore } from "../stores/useAppStore";
import { Recipe } from "../types";

export default function Modal() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const recipe = useAppStore((state) => state.recipe);
  const handleClickAddFavorites = useAppStore(
    (state) => state.handleClickAddFavorites
  );
  const handleClickRemoveFavorites = useAppStore(
    (state) => state.handleClickRemoveFavorites
  );
  const favoriteExist = useAppStore((state) => state.favoriteExists);
  const showNotification = useAppStore((state) => state.showNotification);

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = [];
    for (let i = 1; i <= 6; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
      const measure = recipe[`strMeasure${i}` as keyof Recipe];
      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="text-lg font-normal">
            {ingredient} - {measure}
          </li>
        );
      }
    }

    return ingredients;
  };

  const renderInstructions = () => {
    // Ej 1: "1. Fill a rocks glass with ice 2.add white creme de cacao and vodka 3.stir"
    // Ej 2: "Fill 14oz glass with ice and alcohol. Fill 2/3 glass with cola and remainder with sweet & sour. Top with dash of bitters and lemon wedge."
    // Teniendo en cuenta que la receta puede no tener un formato específico, algunos tienen numeros para determinar los pasos, se puede usar un regex para separar las instrucciones por punto y espacio.
    if (!recipe.strInstructions) {
      return <p className="text-lg">No hay instrucciones disponibles.</p>;
    }
    return recipe.strInstructions.split(/(\d+\.\s*)/).map((part, index) => {
      if (/\d+\.\s*/.test(part)) {
        return (
          <span key={index}>
            <strong>{part}</strong>
          </span>
        );
      }
      return (
        <span key={index}>
          {part}
          <br />
        </span>
      );
    });
  };

  // Add/Remove favorites
  const handleClickFavorites = (recipe: Recipe) => {
    const isFavorite = favoriteExist(recipe);
    if (isFavorite) {
      // Remove from favorites
      handleClickRemoveFavorites(recipe);
      showNotification({
        text: "Receta eliminada de favoritos",
        error: false,
      });
    } else {
      // Add to favorites
      handleClickAddFavorites(recipe);
      showNotification({
        text: "Receta agregada a favoritos",
        error: false,
      });
    }
    closeModal();
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    {recipe.strDrink}
                  </Dialog.Title>
                  <img
                    alt={`Image of ${recipe.strDrink}`}
                    src={recipe.strDrinkThumb}
                    className="mx-auto w-96"
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Ingredientes y Cantidades
                  </Dialog.Title>
                  {renderIngredients()}
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Instrucciones
                  </Dialog.Title>
                  <p className="text-lg">{renderInstructions()}</p>
                  <div className="mt-5 flex justify-between gap-4">
                    <button
                      className="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500 cursor-pointer"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                    <button
                      className="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500 cursor-pointer"
                      onClick={() => handleClickFavorites(recipe)}
                      type="button"
                    >
                      {favoriteExist(recipe)
                        ? "Eliminar de Favoritos"
                        : "Agregar a Favoritos"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
