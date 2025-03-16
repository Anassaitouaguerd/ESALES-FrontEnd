import apiClient from './apiClient';

export const productApi = {
    getProducts: async (filters = {}) => {
        try {
            const response = await apiClient.get('/products', { params: filters });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getProductById: async (productId) => {
        try {
            const response = await apiClient.get(`/products/${productId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product ${productId}:`, error);
            throw error;
        }
    },

    getCategories: async () => {
        try {
            const response = await apiClient.get('/products/categories');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
};
