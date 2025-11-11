import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./page/Home";
import Products from "./page/Products";
import CreateProducts from "./page/CreateProducts";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/create-products" element={<CreateProducts />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
