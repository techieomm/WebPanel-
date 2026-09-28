import React, { createContext, useContext, useState } from 'react';
import { mockOrders } from '../data/mockOrders';

const OrderContext = createContext(undefined);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(mockOrders);
  const [activeTab, setActiveTab] = useState('preparing');
  const [selectedOrderId, setSelectedOrderId] = useState('ord-2841');

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const acceptOrder = (orderId, prepMinutes = 20) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'preparing',
              prepMinutes,
              timeRemaining: `${prepMinutes}:00`,
            }
          : ord
      )
    );
    setActiveTab('preparing');
  };

  const rejectOrder = (orderId) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
  };

  const markOrderReady = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'ready',
              timeRemaining: 'Ready for pickup',
            }
          : ord
      )
    );
    setActiveTab('ready');
  };

  const completeOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'completed',
              timeRemaining: 'Picked up / Completed',
            }
          : ord
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeTab,
        setActiveTab,
        selectedOrderId,
        setSelectedOrderId,
        selectedOrder,
        acceptOrder,
        rejectOrder,
        markOrderReady,
        completeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
