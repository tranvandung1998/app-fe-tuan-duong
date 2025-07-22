// src/api/products.js
import http from '../../src/utils/http';

export const createNavbar = (name) => http.post('api/categories', name);
export const getNavbar = () => http.get('api/categories');

export const createTypes = (name, category_name) => http.post('api/types', name, category_name);