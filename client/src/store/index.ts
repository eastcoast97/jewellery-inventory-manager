/**
 * Zustand Store
 * Global state management for jewellery-inventory-manager
 */

import { create } from 'zustand';
import { Item, Sale } from '../types';

interface AppState {
  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Item state
  items: Item[];
  selectedItem: Item | null;
  itemLoading: boolean;

  // Item actions
  setItems: (items: Item[]) => void;
  setSelectedItem: (item: Item | null) => void;
  setItemLoading: (loading: boolean) => void;
  addItem: (item: Item) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  removeItem: (id: string) => void;

  // Sale state
  sales: Sale[];
  selectedSale: Sale | null;
  saleLoading: boolean;

  // Sale actions
  setSales: (sales: Sale[]) => void;
  setSelectedSale: (sale: Sale | null) => void;
  setSaleLoading: (loading: boolean) => void;
  addSale: (sale: Sale) => void;
  updateSale: (id: string, updates: Partial<Sale>) => void;
  removeSale: (id: string) => void;

}

export const useStore = create<AppState>((set) => ({
  // UI state
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Item state
  items: [],
  selectedItem: null,
  itemLoading: false,

  // Item actions
  setItems: (items) => set({ items }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setItemLoading: (loading) => set({ itemLoading: loading }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (id, updates) => set((state) => ({
    items: state.items.map(item => item.id === id ? { ...item, ...updates } : item)
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),

  // Sale state
  sales: [],
  selectedSale: null,
  saleLoading: false,

  // Sale actions
  setSales: (sales) => set({ sales }),
  setSelectedSale: (sale) => set({ selectedSale: sale }),
  setSaleLoading: (loading) => set({ saleLoading: loading }),
  addSale: (sale) => set((state) => ({ sales: [...state.sales, sale] })),
  updateSale: (id, updates) => set((state) => ({
    sales: state.sales.map(item => item.id === id ? { ...item, ...updates } : item)
  })),
  removeSale: (id) => set((state) => ({
    sales: state.sales.filter(item => item.id !== id)
  })),

}));