import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Dòng này BẮT BUỘC

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css';
import 'antd/dist/reset.css'; // hoặc dùng 'antd/dist/antd.css' nếu muốn

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
