import axios from "axios";
import AuthService from "./AuthService";

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

// Configura o axios para incluir o token em TODAS as requisições automaticamente
axios.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class UserService {
  async list() {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  }

  async get(id) {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  }

  async create(data) {
    const response = await axios.post(`${API_URL}/users`, data);
    return response.data;
  }

  async delete(id) {
    await axios.delete(`${API_URL}/users/${id}`);
  }

  async update(id, data) {
    const response = await axios.put(`${API_URL}/users/${id}`, data);
    return response.data;
  }
}

export default new UserService();