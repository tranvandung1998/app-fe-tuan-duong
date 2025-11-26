import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa";
import { getNavbar, getFullProduct } from "../api/products";

export default function Products() {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");

  // Navbar
  const { data: navData } = useQuery({
    queryKey: ["navbar"],
    queryFn: getNavbar,
  });
  const listNav = navData?.data || [];

  // Products query, filter by searchName
const { data: productData, refetch } = useQuery({
  queryKey: ["products", searchName],
  queryFn: () => getFullProduct(searchName ? { name: searchName } : {}), // nếu trống thì trả all
  keepPreviousData: true,
});


  const listProducts = productData?.data?.data || [];
  console.log(listProducts);
  

  // --- log kết quả search ---
  useEffect(() => {
    if (searchName !== "") {
      console.log("Search for:", searchName);
      console.log("Search results:", listProducts);
    }
  }, [searchName, listProducts]);

  return (
    <div>
      <Header data={listNav} onSearch={setSearchName} navigate={navigate} />

      {/* Navbar */}
      <div style={{ display: "flex", overflowX: "auto", gap: "8px", padding: "16px" }}>
        {listNav.map((list) => (
          <div
            key={list.id}
            onClick={() => navigate(`/category/${list.id}`)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              background: "#f5f5f5",
              borderRadius: "20px",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e5e5")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          >
            <FaBox size={16} color="#007bff" />
            <span style={{ fontWeight: 600, color: "#000" }}>{list.name}</span>
          </div>
        ))}
      </div>

      <div style={{ height: "5px", backgroundColor: "#ccc", width: "100%" }}></div>

      {/* Products grid */}
      <div
        className="products-grid"
        style={{ display: "grid", gap: "16px", padding: "16px" }}
      >
        {listProducts?.map((product) => {
          const imageUrl =
            product.product_images && product.product_images.length > 0
              ? product.product_images
              : "https://image.plo.vn/1200x630/Uploaded/2025/obflucp/2014_04_03/82801_20140402170734_JETO.jpg";

          return (
<div
  key={product.id}
  style={{
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    cursor: "pointer",
  }}
  onClick={() =>
    navigate(`/product-detail/${product.name}`, { state: { product } }) // truyền object product qua state
  }
>

              <img
                src={imageUrl}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
                onError={(e) =>
                (e.currentTarget.src =
                  "https://image.plo.vn/1200x630/Uploaded/2025/obflucp/2014_04_03/82801_20140402170734_JETO.jpg")
                }
              />
              <div style={{ marginTop: "8px" }}>
                <div style={{ fontWeight: 600, color: "#000" }}>{product.name}</div>
                <div style={{ color: "#007bff", margin: "4px 0" }}>
                  {Number(product.price).toLocaleString("vi-VN")} ₫
                </div>
                <div style={{ fontSize: "14px", color: "#555" }}>{product.description}</div>
              </div>
            </div>

          );
        })}
      </div>

      {/* Responsive grid */}
      <style>
        {`
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          @media (min-width: 768px) { .products-grid { grid-template-columns: repeat(4, 1fr); } }
          @media (min-width: 1024px) { .products-grid { grid-template-columns: repeat(5, 1fr); } }
        `}
      </style>
    </div>
  );
}
