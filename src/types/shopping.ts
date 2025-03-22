// Define shopping list types for the application

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price?: number;
  inPantry: boolean;
  fromRecipe?: string;
  isChecked: boolean;
  notes?: string;
  store?: string;
  sources?: ShoppingSource[];
}

export interface ShoppingList {
  id: string;
  name: string;
  createdAt: Date;
  items: ShoppingItem[];
  isActive: boolean;
}

export interface StorePrice {
  store: string;
  price: number;
}

export interface PriceComparison {
  itemName: string;
  prices: StorePrice[];
}

export interface ShoppingSource {
  id: string;
  name: string;
  price: string;
}
