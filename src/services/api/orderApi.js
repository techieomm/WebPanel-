import { apiClient } from './client';
import { mockOrders } from '../../data/mockOrders';
export const orderApi = {
    fetchOrders: async () => {
        return apiClient.get('/vendor/orders', mockOrders);
    },
    acceptOrder: async (orderId, prepMinutes) => {
        return apiClient.post(`/vendor/orders/${orderId}/accept`, { prepMinutes }, { success: true, orderId });
    },
    rejectOrder: async (orderId, reason) => {
        return apiClient.post(`/vendor/orders/${orderId}/reject`, { reason }, { success: true, orderId });
    },
    markReady: async (orderId) => {
        return apiClient.post(`/vendor/orders/${orderId}/ready`, {}, { success: true, orderId });
    },
};
