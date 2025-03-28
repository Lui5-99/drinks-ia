import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SearchForm from "./SearchForm";

export const Header = () => {
  const { pathname } = useLocation();

  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  return (
    <header
      className={`${
        isHomePage ? "bg-header bg-center bg-cover" : "bg-gray-800"
      }`}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div className="">
            <img src="/logo.svg" alt="Logo" className="w-32" />
          </div>
          <nav className="flex gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `uppercase font-bold ${
                  isActive ? "text-orange-500" : "text-white"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `uppercase font-bold ${
                  isActive ? "text-orange-500" : "text-white"
                }`
              }
            >
              Favorites
            </NavLink>
          </nav>
        </div>
        {isHomePage && <SearchForm />}
      </div>
    </header>
  );
};
