import React, { createContext, useContext, useState } from 'react';
import { mockStores } from '../data/mockNotifications';
export const DEFAULT_SCHEDULE = [
    { id: 'sched-mon', day: 'Monday', openTime: '10:00 AM', closeTime: '10:00 PM', isOpen: true },
    { id: 'sched-tue', day: 'Tuesday', openTime: '10:00 AM', closeTime: '10:00 PM', isOpen: true },
    { id: 'sched-wed', day: 'Wednesday', openTime: '10:00 AM', closeTime: '10:00 PM', isOpen: true },
    { id: 'sched-thu', day: 'Thursday', openTime: '10:00 AM', closeTime: '10:00 PM', isOpen: true },
    { id: 'sched-fri', day: 'Friday', openTime: '10:00 AM', closeTime: '11:00 PM', isOpen: true },
    { id: 'sched-sat', day: 'Saturday', openTime: '10:00 AM', closeTime: '11:30 PM', isOpen: true },
    { id: 'sched-sun', day: 'Sunday', openTime: '10:00 AM', closeTime: '10:00 PM', isOpen: true },
];

export const DEFAULT_HOLIDAYS = [
    { id: 'hol-1', date: '2026-10-02', displayDate: 'October 2, 2026', occasion: 'Gandhi Jayanti', isClosed: true },
    { id: 'hol-2', date: '2026-10-20', displayDate: 'October 20, 2026', occasion: 'Dussehra / Festival Closure', isClosed: true },
];

const VendorContext = createContext(undefined);
export const VendorProvider = ({ children }) => {
    const [stores, setStores] = useState(mockStores);
    const [activeStore, setActiveStore] = useState(mockStores[0]);
    const [vendorType, setVendorType] = useState(mockStores[0].type);
    const [isOnline, setIsOnline] = useState(true);
    const [operatingSchedule, setOperatingSchedule] = useState(DEFAULT_SCHEDULE);
    const [holidaySchedule, setHolidaySchedule] = useState(DEFAULT_HOLIDAYS);

    const switchStore = (storeId) => {
        const found = stores.find((s) => s.id === storeId);
        if (found) {
            setActiveStore(found);
            setVendorType(found.type);
        }
    };
    const handleSetIsOnline = (online) => {
        setIsOnline(online);
        setStores((prev) => prev.map((s) => (s.id === activeStore.id ? { ...s, isOnline: online } : s)));
    };
    return (<VendorContext.Provider value={{
            vendorType,
            setVendorType,
            activeStore,
            setActiveStore,
            isOnline,
            setIsOnline: handleSetIsOnline,
            stores,
            switchStore,
            operatingSchedule,
            setOperatingSchedule,
            holidaySchedule,
            setHolidaySchedule,
        }}>
      {children}
    </VendorContext.Provider>);
};
export const useVendor = () => {
    const context = useContext(VendorContext);
    if (!context) {
        throw new Error('useVendor must be used within a VendorProvider');
    }
    return context;
};
