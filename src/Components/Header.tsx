import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SearchForm from "./SearchForm";
import { useAppStore } from "../stores/useAppStore";

export const Header = () => {
  const { pathname } = useLocation();
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <header
      className={`${
        isHomePage ? "bg-header bg-center bg-cover" : "bg-gray-800"
      }`}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <NavLink to="/">
            <img src="/logo.svg" alt="Logo" className="w-32" />
          </NavLink>
          <nav className="flex gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `uppercase font-bold ${
                  isActive ? "text-orange-500" : "text-white"
                }`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `uppercase font-bold ${
                  isActive ? "text-orange-500" : "text-white"
                }`
              }
            >
              Favoritos
            </NavLink>
            <NavLink
              to="/generate"
              className={({ isActive }) =>
                `uppercase font-bold ${
                  isActive ? "text-orange-500" : "text-white"
                }`
              }
            >
              Generar con IA
            </NavLink>
          </nav>
        </div>
        {isHomePage && (
          <SearchForm
            categories={categories}
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
          />
        )}
      </div>
    </header>
  );
};
