import { apiClient } from './apiClient';

export const productService = {
  getAllProducts: async (params) => {
    const response = await apiClient.get('/products', { params });
    return response.data.data;
  },
  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data.data;
  },
  createProduct: async (payload) => {
    const response = await apiClient.post('/products', payload);
    return response.data.data;
  },
  updateProduct: async (id, payload) => {
    const response = await apiClient.put(`/products/${id}`, payload);
    return response.data.data;
  },
  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data.data;
  }
};
