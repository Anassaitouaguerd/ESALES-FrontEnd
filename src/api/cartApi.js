import apiClient from './apiClient';

const getLocalCart = () => {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : { items: [], total: 0 };
};

const saveLocalCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const cartApi = {
    getCart: async () => {
        return getLocalCart();
    },
    
    addItem: async (product, quantity = 1) => {
        try {
            const cart = getLocalCart();
            const existingItemIndex = cart.items.findIndex(item => item.id === product.id);
            
            if (existingItemIndex >= 0) {
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                cart.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity
                });
            }
            
            cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            saveLocalCart(cart);
            return cart;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    },
    
    updateItemQuantity: async (productId, quantity) => {
        try {
            const cart = getLocalCart();
            const itemIndex = cart.items.findIndex(item => item.id === productId);
            
            if (itemIndex >= 0) {
                if (quantity <= 0) {
                    cart.items.splice(itemIndex, 1);
                } else {
                    cart.items[itemIndex].quantity = quantity;
                }
                
                cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                
                saveLocalCart(cart);
            }
            
            return cart;
        } catch (error) {
            console.error('Error updating cart:', error);
            throw error;
        }
    },
    
    removeItem: async (productId) => {
        try {
            const cart = getLocalCart();
            cart.items = cart.items.filter(item => item.id !== productId);
            
            cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            saveLocalCart(cart);
            return cart;
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    },
    
    clearCart: async () => {
        try {
            const emptyCart = { items: [], total: 0 };
            saveLocalCart(emptyCart);
            return emptyCart;
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    }
};
