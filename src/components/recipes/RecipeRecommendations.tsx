import { useState, useEffect } from 'react';
import { ChefHat, Clock, Users, Bookmark, BookmarkCheck, ThumbsUp, AlertTriangle, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  colors,
  spacing,
  shadows,
  borderRadius,
  animation
} from '../ui/KitchenStoriesDesign';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PantryItem } from '../../types/pantry';

// Mock recipe data
interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  instructions: string[];
  tags: string[];
  saved: boolean;
  rating: number;
  matchScore: number;
}

const mockRecipes: Recipe[] = [
  {
    id: "r1",
    title: "Creamy Chicken Pasta",
    description: "A delicious pasta dish with creamy sauce and tender chicken pieces.",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { name: "Chicken Breast", quantity: 2, unit: "lbs" },
      { name: "Pasta", quantity: 8, unit: "oz" },
      { name: "Heavy Cream", quantity: 1, unit: "cup" },
      { name: "Parmesan Cheese", quantity: 0.5, unit: "cup" },
      { name: "Garlic", quantity: 3, unit: "cloves" },
      { name: "Olive Oil", quantity: 2, unit: "tbsp" },
      { name: "Salt", quantity: 1, unit: "tsp" },
      { name: "Black Pepper", quantity: 0.5, unit: "tsp" }
    ],
    instructions: [
      "Boil pasta according to package instructions.",
      "Season chicken with salt and pepper, then cook in olive oil until golden.",
      "Add minced garlic and cook for 1 minute.",
      "Pour in heavy cream and bring to a simmer.",
      "Add parmesan cheese and stir until melted.",
      "Combine with cooked pasta and serve hot."
    ],
    tags: ["pasta", "chicken", "dinner", "quick", "creamy"],
    saved: false,
    rating: 4.7,
    matchScore: 92
  },
  {
    id: "r2",
    title: "Vegetable Stir Fry",
    description: "A healthy and colorful stir fry loaded with fresh vegetables.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    prepTime: 10,
    cookTime: 15,
    servings: 3,
    difficulty: "easy",
    ingredients: [
      { name: "Bell Peppers", quantity: 2, unit: "medium" },
      { name: "Broccoli", quantity: 1, unit: "head" },
      { name: "Carrots", quantity: 2, unit: "medium" },
      { name: "Snow Peas", quantity: 1, unit: "cup" },
      { name: "Garlic", quantity: 2, unit: "cloves" },
      { name: "Ginger", quantity: 1, unit: "tbsp" },
      { name: "Soy Sauce", quantity: 3, unit: "tbsp" },
      { name: "Sesame Oil", quantity: 1, unit: "tbsp" },
      { name: "Rice", quantity: 1, unit: "cup" }
    ],
    instructions: [
      "Cook rice according to package instructions.",
      "Chop all vegetables into bite-sized pieces.",
      "Heat sesame oil in a wok or large pan.",
      "Add minced garlic and ginger, cook for 30 seconds.",
      "Add vegetables and stir fry for 5-7 minutes.",
      "Add soy sauce and continue cooking for 2 minutes.",
      "Serve hot over rice."
    ],
    tags: ["vegetarian", "healthy", "quick", "dinner", "vegan"],
    saved: true,
    rating: 4.5,
    matchScore: 85
  },
  {
    id: "r3",
    title: "Berry Smoothie Bowl",
    description: "A refreshing and nutritious smoothie bowl topped with fresh fruits and granola.",
    imageUrl: "https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1098&q=80",
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: "easy",
    ingredients: [
      { name: "Frozen Mixed Berries", quantity: 1, unit: "cup" },
      { name: "Banana", quantity: 1, unit: "medium" },
      { name: "Greek Yogurt", quantity: 0.5, unit: "cup" },
      { name: "Almond Milk", quantity: 0.25, unit: "cup" },
      { name: "Honey", quantity: 1, unit: "tbsp" },
      { name: "Granola", quantity: 0.25, unit: "cup" },
      { name: "Fresh Berries", quantity: 0.25, unit: "cup" },
      { name: "Chia Seeds", quantity: 1, unit: "tsp" }
    ],
    instructions: [
      "Blend frozen berries, banana, yogurt, almond milk, and honey until smooth.",
      "Pour into a bowl.",
      "Top with granola, fresh berries, and chia seeds.",
      "Serve immediately."
    ],
    tags: ["breakfast", "healthy", "quick", "vegetarian", "smoothie"],
    saved: false,
    rating: 4.8,
    matchScore: 78
  },
  {
    id: "r4",
    title: "Avocado Toast with Eggs",
    description: "Simple yet delicious avocado toast topped with perfectly cooked eggs.",
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    prepTime: 5,
    cookTime: 5,
    servings: 2,
    difficulty: "easy",
    ingredients: [
      { name: "Whole Wheat Bread", quantity: 2, unit: "slices" },
      { name: "Avocado", quantity: 1, unit: "medium" },
      { name: "Eggs", quantity: 2, unit: "large" },
      { name: "Cherry Tomatoes", quantity: 6, unit: "count" },
      { name: "Red Pepper Flakes", quantity: 0.25, unit: "tsp" },
      { name: "Salt", quantity: 0.25, unit: "tsp" },
      { name: "Black Pepper", quantity: 0.25, unit: "tsp" },
      { name: "Olive Oil", quantity: 1, unit: "tsp" }
    ],
    instructions: [
      "Toast bread slices until golden brown.",
      "Mash avocado and spread on toast.",
      "Fry eggs to your preference (sunny side up recommended).",
      "Place eggs on avocado toast.",
      "Top with halved cherry tomatoes, red pepper flakes, salt, and pepper.",
      "Drizzle with olive oil and serve immediately."
    ],
    tags: ["breakfast", "quick", "vegetarian", "healthy", "eggs"],
    saved: false,
    rating: 4.6,
    matchScore: 88
  }
];

// Function to calculate days until expiry
const calculateDaysUntilExpiry = (expiryDate: Date): number => {
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Function to check if an item is expiring soon (within 7 days)
const isExpiringSoon = (item: PantryItem): boolean => {
  const daysUntilExpiry = calculateDaysUntilExpiry(item.expiryDate);
  return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
};

interface RecipeRecommendationsProps {
  pantryItems?: PantryItem[];
}

export default function RecipeRecommendations({ pantryItems = [] }: RecipeRecommendationsProps) {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [activeFilter, setActiveFilter] = useState<'expiring' | 'all' | 'saved'>('expiring');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  
  // Get expiring items
  const expiringItems = pantryItems.filter(isExpiringSoon);
  
  // Filter recipes based on active filter
  const filteredRecipes = recipes.filter(recipe => {
    if (activeFilter === 'saved') return recipe.saved;
    if (activeFilter === 'expiring') {
      // In a real app, we would match recipe ingredients with expiring items
      // For now, just return all recipes for the expiring filter
      return true;
    }
    return true;
  });
  
  // Sort recipes by match score (highest first)
  const sortedRecipes = [...filteredRecipes].sort((a, b) => b.matchScore - a.matchScore);
  
  // Toggle save recipe
  const toggleSaveRecipe = (recipeId: string) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === recipeId ? { ...recipe, saved: !recipe.saved } : recipe
    ));
  };
  
  // Navigate to recipe detail
  const viewRecipeDetail = (recipeId: string) => {
    // In a real app, we would navigate to the recipe detail page
    console.log(`Viewing recipe: ${recipeId}`);
  };
  
  return (
    <Container style={{ 
      padding: 0, 
      maxWidth: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,245,255,0.85))',
      backdropFilter: 'blur(10px)'
    }}>
      {/* Header */}
      <div style={{ 
        padding: `${spacing.md} ${spacing.md}`, 
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: `1px solid rgba(230, 235, 245, 0.8)`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <Flex justify="space-between" align="center">
          <div>
            <Text variant="h2" style={{ color: colors.textPrimary }}>Recipe Ideas</Text>
            <Text variant="body2" style={{ color: colors.textSecondary }}>
              Based on your pantry items
            </Text>
          </div>
          <div
            onClick={() => setShowFilters(!showFilters)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: borderRadius.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: showFilters ? colors.primaryLight : 'rgba(240, 245, 255, 0.8)',
              cursor: 'pointer',
              color: showFilters ? colors.primary : colors.textSecondary
            }}
          >
            <Filter size={20} />
          </div>
        </Flex>
        
        {/* Filters */}
        {showFilters && (
          <div style={{ 
            marginTop: spacing.md,
            display: 'flex',
            gap: spacing.sm,
            overflowX: 'auto',
            paddingBottom: spacing.sm
          }}>
            <div
              onClick={() => setActiveFilter('expiring')}
              style={{
                padding: `${spacing.xs} ${spacing.md}`,
                borderRadius: borderRadius.full,
                backgroundColor: activeFilter === 'expiring' ? colors.primary : 'rgba(240, 245, 255, 0.8)',
                color: activeFilter === 'expiring' ? colors.white : colors.textSecondary,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs
              }}
            >
              <AlertTriangle size={14} />
              Expiring Soon
            </div>
            <div
              onClick={() => setActiveFilter('all')}
              style={{
                padding: `${spacing.xs} ${spacing.md}`,
                borderRadius: borderRadius.full,
                backgroundColor: activeFilter === 'all' ? colors.primary : 'rgba(240, 245, 255, 0.8)',
                color: activeFilter === 'all' ? colors.white : colors.textSecondary,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              All Recipes
            </div>
            <div
              onClick={() => setActiveFilter('saved')}
              style={{
                padding: `${spacing.xs} ${spacing.md}`,
                borderRadius: borderRadius.full,
                backgroundColor: activeFilter === 'saved' ? colors.primary : 'rgba(240, 245, 255, 0.8)',
                color: activeFilter === 'saved' ? colors.white : colors.textSecondary,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs
              }}
            >
              <BookmarkCheck size={14} />
              Saved
            </div>
            
            {/* Additional filters */}
            <div
              style={{
                padding: `${spacing.xs} ${spacing.md}`,
                borderRadius: borderRadius.full,
                backgroundColor: 'rgba(240, 245, 255, 0.8)',
                color: colors.textSecondary,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Quick Meals
            </div>
            <div
              style={{
                padding: `${spacing.xs} ${spacing.md}`,
                borderRadius: borderRadius.full,
                backgroundColor: 'rgba(240, 245, 255, 0.8)',
                color: colors.textSecondary,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Vegetarian
            </div>
          </div>
        )}
      </div>

      {/* Expiring Items Banner */}
      {activeFilter === 'expiring' && expiringItems.length > 0 && (
        <div style={{
          margin: `${spacing.md} ${spacing.md} 0`,
          padding: spacing.md,
          backgroundColor: 'rgba(255, 248, 225, 0.8)',
          borderRadius: borderRadius.lg,
          border: '1px solid rgba(255, 236, 179, 0.8)'
        }}>
          <Text variant="body1" style={{ fontWeight: 600, marginBottom: spacing.xs }}>
            <AlertTriangle size={16} style={{ marginRight: spacing.xs, verticalAlign: 'text-bottom' }} color={colors.warning} />
            Items Expiring Soon
          </Text>
          <div style={{
            display: 'flex',
            gap: spacing.xs,
            flexWrap: 'wrap',
            marginTop: spacing.xs
          }}>
            {expiringItems.map(item => (
              <div
                key={item.id}
                style={{
                  padding: `${spacing.xs} ${spacing.sm}`,
                  backgroundColor: 'rgba(255, 236, 179, 0.5)',
                  borderRadius: borderRadius.md,
                  fontSize: '12px',
                  fontWeight: 500,
                  color: colors.textSecondary
                }}
              >
                {item.name} ({calculateDaysUntilExpiry(item.expiryDate)}d)
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipe List */}
      <div style={{ 
        flex: 1, 
        padding: `0 ${spacing.md} ${spacing.md}`,
        overflowY: 'auto'
      }}>
        {sortedRecipes.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: spacing.xl,
            marginTop: spacing.xl
          }}>
            <ChefHat size={48} style={{ marginBottom: spacing.md, opacity: 0.5 }} />
            <Text variant="h3" style={{ marginBottom: spacing.md }}>No Recipes Found</Text>
            <Text variant="body1" style={{ color: colors.textSecondary }}>
              {activeFilter === 'saved' 
                ? "You haven't saved any recipes yet." 
                : "Try changing your filters or adding more items to your pantry."}
            </Text>
          </div>
        ) : (
          sortedRecipes.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => viewRecipeDetail(recipe.id)}
              style={{
                marginTop: spacing.md,
                borderRadius: borderRadius.lg,
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                boxShadow: shadows.sm,
                cursor: 'pointer',
                transition: `all ${animation.fast} ${animation.easing}`,
                border: '1px solid rgba(230, 235, 245, 0.8)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = shadows.md;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = shadows.sm;
              }}
            >
              {/* Recipe Image */}
              <div style={{ position: 'relative' }}>
                <img 
                  src={recipe.imageUrl} 
                  alt={recipe.title}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover'
                  }}
                />
                
                {/* Match Score */}
                <div style={{
                  position: 'absolute',
                  top: spacing.sm,
                  left: spacing.sm,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: colors.white,
                  borderRadius: borderRadius.full,
                  padding: `${spacing.xs} ${spacing.sm}`,
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xs
                }}>
                  <ThumbsUp size={12} />
                  {recipe.matchScore}% Match
                </div>
                
                {/* Save Button */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveRecipe(recipe.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: spacing.sm,
                    right: spacing.sm,
                    width: '36px',
                    height: '36px',
                    borderRadius: borderRadius.full,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {recipe.saved ? (
                    <BookmarkCheck size={20} color={colors.primary} />
                  ) : (
                    <Bookmark size={20} color={colors.textSecondary} />
                  )}
                </div>
                
                {/* Difficulty Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: spacing.sm,
                  left: spacing.sm,
                  backgroundColor: 
                    recipe.difficulty === 'easy' ? 'rgba(76, 175, 80, 0.8)' :
                    recipe.difficulty === 'medium' ? 'rgba(255, 152, 0, 0.8)' :
                    'rgba(244, 67, 54, 0.8)',
                  color: colors.white,
                  borderRadius: borderRadius.md,
                  padding: `${spacing.xs} ${spacing.sm}`,
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'capitalize'
                }}>
                  {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                </div>
              </div>
              
              {/* Recipe Info */}
              <div style={{ padding: spacing.md }}>
                <Text variant="h3" style={{ marginBottom: spacing.xs }}>{recipe.title}</Text>
                <Text variant="body2" style={{ color: colors.textSecondary, marginBottom: spacing.md }}>
                  {recipe.description}
                </Text>
                
                {/* Recipe Meta */}
                <Flex gap={spacing.md}>
                  <Flex align="center" gap={spacing.xs}>
                    <Clock size={16} color={colors.textSecondary} />
                    <Text variant="body2" style={{ color: colors.textSecondary }}>
                      {recipe.prepTime + recipe.cookTime} min total
                    </Text>
                  </Flex>
                  <Flex align="center" gap={spacing.xs}>
                    <Users size={16} color={colors.textSecondary} />
                    <Text variant="body2" style={{ color: colors.textSecondary }}>
                      {recipe.servings} servings
                    </Text>
                  </Flex>
                  <Flex align="center" gap={spacing.xs}>
                    <ChefHat size={16} color={colors.textSecondary} />
                    <Text variant="body2" style={{ color: colors.textSecondary }}>
                      {recipe.ingredients.length} ingredients
                    </Text>
                  </Flex>
                </Flex>
                
                {/* Tags */}
                <div style={{
                  display: 'flex',
                  gap: spacing.xs,
                  flexWrap: 'wrap',
                  marginTop: spacing.md
                }}>
                  {recipe.tags.slice(0, 3).map(tag => (
                    <div
                      key={tag}
                      style={{
                        padding: `${spacing.xs} ${spacing.sm}`,
                        backgroundColor: colors.primaryLight,
                        color: colors.primary,
                        borderRadius: borderRadius.md,
                        fontSize: '12px',
                        fontWeight: 500
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                  {recipe.tags.length > 3 && (
                    <div style={{
                      padding: `${spacing.xs} ${spacing.sm}`,
                      backgroundColor: 'rgba(240, 245, 255, 0.8)',
                      color: colors.textSecondary,
                      borderRadius: borderRadius.md,
                      fontSize: '12px',
                      fontWeight: 500
                    }}>
                      +{recipe.tags.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Bottom padding for navigation */}
        <div style={{ height: '80px' }} />
      </div>
    </Container>
  );
}
