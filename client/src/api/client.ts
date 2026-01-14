/**
 * API Client
 * Axios-based API client with typed methods
 */

import axios from 'axios';
import { Item, CreateItemInput, UpdateItemInput, Sale, CreateSaleInput, UpdateSaleInput, ApiResponse, PaginatedResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiClient = {
  // Item API
  items: {
    getAll: async (params?: { page?: number; limit?: number }) => {
      const response = await api.get<PaginatedResponse<Item>>('/items', { params });
      return response.data;
    },
    getById: async (id: string) => {
      const response = await api.get<ApiResponse<Item>>(`/items/${id}`);
      return response.data;
    },
    create: async (data: CreateItemInput) => {
      const response = await api.post<ApiResponse<Item>>('/items', data);
      return response.data;
    },
    update: async (id: string, data: UpdateItemInput) => {
      const response = await api.put<ApiResponse<Item>>(`/items/${id}`, data);
      return response.data;
    },
    delete: async (id: string) => {
      await api.delete(`/items/${id}`);
    },
  },
  // Sale API
  sales: {
    getAll: async (params?: { page?: number; limit?: number }) => {
      const response = await api.get<PaginatedResponse<Sale>>('/sales', { params });
      return response.data;
    },
    getById: async (id: string) => {
      const response = await api.get<ApiResponse<Sale>>(`/sales/${id}`);
      return response.data;
    },
    create: async (data: CreateSaleInput) => {
      const response = await api.post<ApiResponse<Sale>>('/sales', data);
      return response.data;
    },
    update: async (id: string, data: UpdateSaleInput) => {
      const response = await api.put<ApiResponse<Sale>>(`/sales/${id}`, data);
      return response.data;
    },
    delete: async (id: string) => {
      await api.delete(`/sales/${id}`);
    },
  },
};

export default apiClient;