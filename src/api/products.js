// src/api/products.js
import http from '../../src/utils/http';

export const createNavbar = (name) => http.post('api/categories', name);
export const getNavbar = () => http.get('api/categories');

export const createTypes = (name, category_name) => http.post('api/types', name, category_name);
export const getTypes = () => http.get('api/types');

export const createProduct = (formData) =>
  http.post('api/products', formData); // KHÔNG set headers


export const getProduct = (params) => {
  const query = params?.name ? `?name=${encodeURIComponent(params.name)}` : '';
  return http.get(`api/products${query}`);
};


export const createProductDetail = (payload) => http.post('api/product-detail', payload);
export const getProductDetail = (params) => {
  return http.get("/api/full-detail", { params });
};



// get api

// export const getProducts = (payload) => http.post('api/products');