import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaSearch } from "react-icons/fa";

export default function Header({ data, onSearch }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const listNavBar = data?.data || [];

  const handleSearch = () => {
    // Gọi callback parent
    if (onSearch) onSearch(searchText.trim());
    console.log("Search:", searchText.trim());
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        padding: "12px 20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
        backdropFilter: "blur(4px)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* --- Hàng ngang chính --- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "space-between" : "flex-start",
          gap: isMobile ? 0 : "20px",
        }}
      >
        {isMobile && (
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "22px",
              color: "#000",
            }}
          >
            <FaBars />
          </button>
        )}

        <img
          src="/image/logoIcon.png"
          alt="logo"
          style={{
            height: "45px",
            width: "auto",
            display: "block",
            margin: isMobile ? "0 auto" : "0",
          }}
        />

        {/* Thanh search desktop */}
        {!isMobile && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <input
              type="text"
              placeholder="Tìm sản phẩm, mã hàng..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{
                width: "280px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                color: "#000",
                backgroundColor: "#fff",
                transition: "all 0.2s",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid green")}
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
            />
            <button
              style={{
                padding: "8px 14px",
                backgroundColor: "rgba(0, 128, 0, 0.7)",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
              }}
              onClick={handleSearch}
            >
              Tìm kiếm
            </button>
          </div>
        )}

        {/* Mobile search button */}
        {isMobile && (
          <button
            onClick={() => {
              setSearchOpen(!searchOpen);
              setMenuOpen(false);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "22px",
              color: "#000",
            }}
          >
            <FaSearch />
          </button>
        )}
      </div>

      {/* --- SEARCH MOBILE --- */}
      {isMobile && searchOpen && (
        <div
          style={{
            marginTop: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            animation: "slideDown 0.3s ease",
          }}
        >
          <input
            type="text"
            placeholder="Nhập tên sản phẩm, mã hàng..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              outline: "none",
              color: "#000",
              backgroundColor: "#fff",
              transition: "all 0.2s",
            }}
            onFocus={(e) => (e.target.style.border = "1px solid green")}
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          />
          <button
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "rgba(0, 128, 0, 0.7)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
}
