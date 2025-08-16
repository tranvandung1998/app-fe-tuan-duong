// src/api/products.js
import http from '../../src/utils/http';

export const createNavbar = (name) => http.post('api/categories', name);
export const getNavbar = () => http.get('api/categories');

export const createTypes = (name, category_name) => http.post('api/types', name, category_name);
export const getTypes = () => http.get('api/types');

export const createProduct = (payload) => http.post('api/products', payload);
export const getroduct = (payload) => http.get('api/products', payload);

export const createProductDetail = (payload) => http.post('api/product-details', payload);