// Define recipe types for the application

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  saved: boolean;
  rating: number;
  matchScore: number;
}

export interface RecipeFilter {
  query: string;
  tags: string[];
  maxPrepTime?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  ingredients?: string[];
}

export interface RecipeCollection {
  id: string;
  name: string;
  recipes: string[]; // Recipe IDs
  createdAt: Date;
}
