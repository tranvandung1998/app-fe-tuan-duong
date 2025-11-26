import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./page/Home";
import Products from "./page/Products";
import CreateProducts from "./page/CreateProducts";
import ProductDetail from "./page/ProductDetail";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-detail/:name" element={<ProductDetail />} />
          <Route path="/create-products" element={<CreateProducts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
