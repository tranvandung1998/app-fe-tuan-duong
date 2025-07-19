import { createBrowserRouter } from 'react-router-dom';

import AdminLayout from '../../src/layouts/AdminLayout';
import UserLayout from '../../src/layouts/UserLayout';

import Dashboard from '../page/admin/Dashboard';
import Products from '../page/admin/CreateProducts';

import Home from '../page/user/Home';
import CreateProducts from '../page/admin/CreateProducts';

// import NotFound from '@/pages/notfound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'profile', element: <CreateProducts /> },
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
