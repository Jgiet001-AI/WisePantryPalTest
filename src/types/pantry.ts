// Define pantry item types for the application

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  purchaseDate: Date;
  expiryDate: Date;
  price?: number;
  notes?: string;
  location?: string;
  imageUrl?: string;
}

export type PantryCategory = 
  | 'Fruits' 
  | 'Vegetables' 
  | 'Dairy' 
  | 'Meat' 
  | 'Seafood' 
  | 'Grains' 
  | 'Canned Goods' 
  | 'Frozen Foods' 
  | 'Snacks' 
  | 'Beverages' 
  | 'Condiments' 
  | 'Baking' 
  | 'Spices' 
  | 'Other';

export interface PantryStats {
  totalItems: number;
  expiringItems: number;
  expiredItems: number;
  categories: {
    name: PantryCategory;
    count: number;
  }[];
  totalValue: number;
}
