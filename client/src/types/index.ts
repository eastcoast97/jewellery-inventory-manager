/**
 * TypeScript type definitions
 * Auto-generated based on architecture
 */

export interface Item {
  id: string;
  name: string;
  sku: string;
  category: 'Gold' | 'Silver' | 'Diamond' | 'Platinum' | 'Other';
  weight: number;
  purity?: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  supplier?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateItemInput = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateItemInput = Partial<CreateItemInput>;

export interface Sale {
  id: string;
  customerName: string;
  customerPhone?: string;
  itemId: string;
  quantity: number;
  totalAmount: number;
  paymentMethod: 'Cash' | 'Card' | 'UPI' | 'Bank Transfer';
  saleDate: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateSaleInput = Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateSaleInput = Partial<CreateSaleInput>;

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}