import { Outlet, Link } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div className="p-4 min-h-screen bg-white">
      <h1 className="text-xl font-bold mb-4">User Site</h1>
      <nav className="mb-4">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/user">Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
}
