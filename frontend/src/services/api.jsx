// 

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const register = (data) => API.post('/users/register', data);

export const login = (data) => API.post('/users/login', data);

export const getTasks = (token) =>
  API.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });

export const createTask = (data, token) =>
  API.post('/tasks', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateTask = (id, data, token) =>
  API.put(`/tasks/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTask = (id, token) =>
  API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
