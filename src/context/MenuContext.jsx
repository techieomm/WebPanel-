import React, { createContext, useContext, useState } from 'react';

const initialCategories = [
  { id: 'cat-all', name: 'All' },
  { id: 'cat-small-plates', name: 'Small plates' },
  { id: 'cat-bowls-mains', name: 'Bowls & mains' },
  { id: 'cat-flatbreads', name: 'Flatbreads' },
  { id: 'cat-momos', name: 'Momos & Dimsums' },
  { id: 'cat-beverages', name: 'Beverages' },
  { id: 'cat-desserts', name: 'Desserts' },
];

const initialItems = [
  {
    id: 'm-1',
    name: 'Smoked Paneer Bowl',
    category: 'Bowls & mains',
    price: '289',
    isVeg: true,
    isAvailable: true,
    variants: ['Regular', 'Large'],
    addOns: ['Extra Grilled Paneer', 'Avocado Slice'],
    description: 'Charred cottage cheese cubes served over herb quinoa and tahini glaze.',
  },
  {
    id: 'm-2',
    name: 'Charred Corn Salad',
    category: 'Small plates',
    price: '189',
    isVeg: true,
    isAvailable: true,
    variants: ['Standard'],
    addOns: ['Lime dressing', 'Cotija cheese'],
    description: 'Sweet corn tossed with micro-cilantro, chili lime butter and smoked paprika.',
  },
  {
    id: 'm-3',
    name: 'Half Plate Chowmein',
    category: 'Small plates',
    price: '120',
    isVeg: true,
    isAvailable: true,
    variants: ['Half Plate', 'Full Plate'],
    addOns: ['Extra Chilli Oil', 'Schezwan Dip'],
    description: 'Wok tossed street noodles with crispy julienned veggies and soya.',
  },
  {
    id: 'm-4',
    name: 'Steamed Veg Momos',
    category: 'Small plates',
    price: '140',
    isVeg: true,
    isAvailable: true,
    variants: ['Half Plate', 'Full Plate'],
    addOns: ['Spicy Chutney', 'Mayonnaise'],
    description: 'Steamed Himalayan dumplings with spiced vegetable filling.',
  },
  {
    id: 'm-5',
    name: 'Chicken Fried Momos',
    category: 'Small plates',
    price: '180',
    isVeg: false,
    isAvailable: true,
    variants: ['Half Plate', 'Full Plate'],
    addOns: ['Tandoori Dip', 'Fiery Garlic Sauce'],
    description: 'Crispy golden fried dumplings stuffed with tender spiced minced chicken.',
  },
  {
    id: 'm-6',
    name: 'Mushroom Flatbread',
    category: 'Flatbreads',
    price: '260',
    isVeg: true,
    isAvailable: true,
    variants: ['Single crust'],
    addOns: ['Truffle drizzle', 'Goat cheese'],
    description: 'Artisanal wood-fired flatbread with wild forest mushrooms.',
  },
  {
    id: 'm-7',
    name: 'Cold Brew 250ml',
    category: 'Beverages',
    price: '180',
    isVeg: true,
    isAvailable: true,
    variants: ['Classic Black', 'Oat Milk'],
    addOns: ['Vanilla syrup'],
    description: '18-hour slow steeped specialty Arabica coffee over ice.',
  },
];

const MenuContext = createContext(undefined);

export const MenuProvider = ({ children }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [items, setItems] = useState(initialItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const toggleItemAvailability = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const addItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: `m-${Date.now()}`,
      isAvailable: newItem.isAvailable !== undefined ? newItem.isAvailable : true,
      variants: Array.isArray(newItem.variants) ? newItem.variants : [],
      addOns: Array.isArray(newItem.addOns) ? newItem.addOns : [],
    };
    setItems((prev) => [itemWithId, ...prev]);
  };

  const updateItem = (id, updatedData) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MenuContext.Provider
      value={{
        categories,
        items,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        editingItem,
        setEditingItem,
        toggleItemAvailability,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
