import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/admin", label: "Admin" },
  ];

  const isActive = (path) => pathname === path || pathname.startsWith(path + "/");

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between">
      <h1 className="font-bold text-lg">MyShop</h1>
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`hover:text-yellow-300 ${
              isActive(item.path) ? "text-yellow-300 font-semibold" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
