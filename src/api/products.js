// src/api/products.js
import http from '../../src/utils/http';

export const createProduct = (data) => http.post('/api/products', data);
