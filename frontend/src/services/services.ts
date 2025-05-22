import axios from "axios";

export const api = axios.create({
	withCredentials: true,
	timeout: 60000,
	headers: { "Content-Type": "application/json" },
	baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const routeApiV1 = "/api";
