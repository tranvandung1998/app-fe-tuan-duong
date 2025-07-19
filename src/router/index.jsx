import { createBrowserRouter } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
import UserLayout from '@/layouts/UserLayout';

import Dashboard from '../page/admin/Dashboard';
import Products from '../page/admin/Products';

import Home from '../page/user/Home';
import Profile from '../page/user/Products';

// import NotFound from '@/pages/notfound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'products', element: <Products /> },
    ],
  },
//   {
//     path: '*',
//     // element: <NotFound />,
//   },
]);
