import apiClient from './apiClient';
import { cartApi } from './cartApi';

export const orderApi = {
    createOrder: async (orderData) => {
        try {
            const response = await apiClient.post('/orders', orderData);
            
            if (response.data) {
                await cartApi.clearCart();
            }
            
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },
    
    getOrderById: async (orderId) => {
        try {
            const response = await apiClient.get(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching order ${orderId}:`, error);
            throw error;
        }
    },
    
    getOrderHistory: async () => {
        try {
            const response = await apiClient.get('/orders/history');
            return response.data;
        } catch (error) {
            console.error('Error fetching order history:', error);
            throw error;
        }
    },
    
    processPayment: async (orderId, paymentDetails) => {
        try {
            const response = await apiClient.post(`/orders/${orderId}/payment`, paymentDetails);
            return response.data;
        } catch (error) {
            console.error('Error processing payment:', error);
            throw error;
        }
    }
};
