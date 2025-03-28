import { Header } from "../Components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="mx-auto container py-16 ">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
