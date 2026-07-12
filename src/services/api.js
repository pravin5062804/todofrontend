import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // backend API URL
});

// Automatically inject JWT token into HTTP requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
};

export const todoService = {
  getTodos: () => API.get('/todos'),
  createTodo: (todoData) => API.post('/todos', todoData),
  updateTodo: (id, todoData) => API.put(`/todos/${id}`, todoData),
  deleteTodo: (id) => API.delete(`/todos/${id}`),
};

export default API;
