import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexPage, FavoritePage } from "./Views";
import Layout from "./Layouts/Layout";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="favorites" element={<FavoritePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
