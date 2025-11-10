import { useState, useEffect } from "react";
import { FaBars, FaSearch } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Theo dõi kích thước màn hình để xác định mobile / desktop
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

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
        {/* --- Icon menu (chỉ hiển thị trên mobile) --- */}
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

        {/* --- Logo --- */}
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

        {/* --- Thanh tìm kiếm (hiển thị khác nhau cho mobile / desktop) --- */}
        {isMobile ? (
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
        ) : (
          // --- Thanh tìm kiếm desktop ---
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
            >
              Tìm kiếm
            </button>
          </div>
        )}
      </div>

      {/* --- MENU MOBILE --- */}
      {isMobile && menuOpen && (
        <div
          style={{
            marginTop: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            animation: "slideDown 0.3s ease",
            color: "#000",
          }}
        >
          {/* --- Các mục chính --- */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                border: "1px solid #ccc",
                color: "#000",
              }}
            >
              Trang chủ
            </div>

            <div
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                border: "1px solid #ccc",
                color: "#000",
              }}
            >
              Giới thiệu
            </div>

            <div>
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f9f9f9",
                  cursor: "pointer",
                  fontWeight: "500",
                  color: "#000",
                }}
              >
                Danh mục sản phẩm ▾
              </button>

              {categoryOpen && (
                <div
                  style={{
                    marginTop: "6px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    animation: "fadeIn 0.2s ease",
                    color: "#000",
                  }}
                >
                  <div style={{ padding: "8px 12px", cursor: "pointer", color: "#000" }}>Gạch</div>
                  <div style={{ padding: "8px 12px", cursor: "pointer", color: "#000" }}>Bồn cầu</div>
                  <div style={{ padding: "8px 12px", cursor: "pointer", color: "#000" }}>Sen vòi</div>
                  <div style={{ padding: "8px 12px", cursor: "pointer", color: "#000" }}>Bồn rửa</div>
                </div>
              )}
            </div>

            <div
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                border: "1px solid #ccc",
                color: "#000",
              }}
            >
              Liên hệ
            </div>
          </div>
        </div>
      )}

      {/* --- TÌM KIẾM MOBILE --- */}
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
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              outline: "none",
              color: "#000", // text màu đen
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
          >
            Tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
}
