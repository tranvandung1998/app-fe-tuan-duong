import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./page/Home";
import Products from "./page/Products";
import Admin from "./page/Admin";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/home" element={<Home />} /> {/* nếu cần Home page */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
