import { Header } from "../Components/Header";
import { Outlet } from "react-router-dom";
import Modal from "../Components/Modal";
import { useAppStore } from "../stores/useAppStore";
import { useEffect } from "react";

const Layout = () => {
  const favoritesStored = useAppStore((state) => state.loadFromLocalStorage);

  useEffect(() => {
    favoritesStored();
  }, []);

  return (
    <>
      <Header />
      <main className="mx-auto container py-16 ">
        <Outlet />
      </main>
      <Modal />
    </>
  );
};

export default Layout;
