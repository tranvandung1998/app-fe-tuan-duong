import http from '../utils/http';

export const getUsers = () => http.get('/users');

export const createUser = (data) => http.post('/api/products', data);
