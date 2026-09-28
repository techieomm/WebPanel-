export const mockWeeklySales = [
    { day: 'M', amount: 14200, percentage: 45 },
    { day: 'T', amount: 18400, percentage: 62 },
    { day: 'W', amount: 16100, percentage: 53 },
    { day: 'T', amount: 24500, percentage: 78 },
    { day: 'F', amount: 21200, percentage: 68 },
    { day: 'S', amount: 31000, percentage: 92, isPeak: true },
    { day: 'S', amount: 22800, percentage: 72 },
];
export const mockTransactions = [
    { id: 'tx-1', title: 'Order #RR-2841', amount: '+ ₹865', time: 'Today, 1:24 PM', isCredit: true },
    { id: 'tx-2', title: 'Platform fee', amount: '− ₹86', time: 'Today, 1:24 PM', isCredit: false },
    { id: 'tx-3', title: 'Weekly settlement', amount: '+ ₹28,420', time: '10 Jun', isCredit: true },
    { id: 'tx-4', title: 'Order #RR-2818', amount: '+ ₹640', time: '9 Jun, 8:42 PM', isCredit: true },
];
export const mockCategoryShares = [
    { category: 'Fresh produce', percentage: 86 },
    { category: 'Bakery', percentage: 68 },
    { category: 'Beverages', percentage: 52 },
];
export const mockTopProducts = [
    { name: 'Organic Avocado', unitsSold: 84, revenue: '₹12,480' },
    { name: 'Sourdough Loaf', unitsSold: 67, revenue: '₹10,300' },
    { name: 'Cold Brew Coffee', unitsSold: 50, revenue: '₹8,120' },
];
