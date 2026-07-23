import axios from "axios";
import { clearSession } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isLoginRequest = error.config?.url?.includes("/api/login");
    if (typeof window !== "undefined" && status === 401 && !isLoginRequest) {
      clearSession();
      window.location.assign("/admin");
    }
    return Promise.reject(error);
  }
);

export const login = (email, password) =>
  api.post("/api/login", { email, password });

export const registerUser = (data) => api.post("/api/register", data);

export const getDrawings = () => api.get("/api/drawings/");

// FormData: let axios set the multipart boundary itself.
export const uploadDrawing = (formData) =>
  api.post("/api/upload_drawings/", formData);

export const getBooks = () => api.get("/api/books/");

export const createBook = (payload) => api.post("/api/books/", payload);

export const deleteBook = (id) => api.delete(`/api/books/${id}/`);

export const generateBook = (id) => api.post("/api/generate_book", { id });

export const sponsorPay = (formData) => api.post("/api/sponsor_pay", formData);

export default api;
