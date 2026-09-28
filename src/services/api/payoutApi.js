import { apiClient } from './client';
import { mockTransactions } from '../../data/mockAnalytics';
export const payoutApi = {
    fetchBalance: async () => {
        return apiClient.get('/vendor/payouts/balance', {
            availableBalance: '₹32,800',
            scheduledDate: 'Mon, 17 Jun',
            grossSales: '₹42,680',
            netEarnings: '₹36,240',
        });
    },
    fetchTransactions: async () => {
        return apiClient.get('/vendor/payouts/transactions', mockTransactions);
    },
};
