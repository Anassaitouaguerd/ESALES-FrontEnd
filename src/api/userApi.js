import apiClient from './apiClient';

export const userApi = {
    login: async (credentials) => {
        try {
            const response = await apiClient.post('/auth/login', credentials);
            const { token, user } = response.data;
            
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            return user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    
    register: async (userData) => {
        try {
            const response = await apiClient.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },
    
    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    },
    
    getProfile: async () => {
        try {
            const response = await apiClient.get('/users/profile');
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },
    
    updateProfile: async (profileData) => {
        try {
            const response = await apiClient.put('/users/profile', profileData);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },
    
    getAddresses: async () => {
        try {
            const response = await apiClient.get('/users/addresses');
            return response.data;
        } catch (error) {
            console.error('Error fetching addresses:', error);
            throw error;
        }
    },
    
    addAddress: async (address) => {
        try {
            const response = await apiClient.post('/users/addresses', address);
            return response.data;
        } catch (error) {
            console.error('Error adding address:', error);
            throw error;
        }
    }
};
