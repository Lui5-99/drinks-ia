import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";

const IndexPage = lazy(() => import("./Views/IndexPage"));
const FavoritePage = lazy(() => import("./Views/FavoritePage"));
const GenerateView = lazy(() => import("./Views/GenerateView"));

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback="Cargando...">
                <IndexPage />
              </Suspense>
            }
          />
          <Route
            path="favorites"
            element={
              <Suspense fallback="Cargando...">
                <FavoritePage />
              </Suspense>
            }
          />
          <Route
            path="generate"
            element={
              <Suspense fallback="Cargando...">
                <GenerateView />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
