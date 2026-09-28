import { apiClient } from './client';
import { mockCategories, mockMenuItems } from '../../data/mockMenu';
import { mockProducts } from '../../data/mockProducts';
export const catalogApi = {
    fetchMenu: async () => {
        return apiClient.get('/vendor/menu', { categories: mockCategories, items: mockMenuItems });
    },
    updateItemAvailability: async (itemId, isAvailable) => {
        return apiClient.put(`/vendor/menu/items/${itemId}/availability`, { isAvailable }, { success: true });
    },
    fetchGroceryProducts: async () => {
        return apiClient.get('/vendor/catalog/products', mockProducts);
    },
    updateStockCount: async (productId, stockCount) => {
        return apiClient.put(`/vendor/catalog/products/${productId}/stock`, { stockCount }, { success: true });
    },
};
