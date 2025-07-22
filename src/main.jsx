import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import './index.css';
import 'antd/dist/reset.css';

const queryClient = new QueryClient(); // ✅

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* ✅ Wrap ở đây */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
