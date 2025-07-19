import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <nav className="mb-4">
        <Link to="/admin" className="mr-4">Dashboard</Link>
        <Link to="/admin/products">Products</Link>
      </nav>
      <Outlet />
    </div>
  );
}
