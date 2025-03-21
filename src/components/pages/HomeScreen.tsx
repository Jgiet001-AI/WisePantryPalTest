import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Grid,
  RecipeCard,
  Divider,
  Button,
  Card,
  colors,
  spacing,
  borderRadius,
  animation,
  shadows
} from '../ui/KitchenStoriesDesign';
import { Search, Home, Book, ShoppingCart, User, Plus, ChevronRight, Heart, TrendingUp, Award, Zap } from 'lucide-react';

// Sample data for recipes with healthier options
const featuredRecipes = [
  {
    id: 1,
    title: 'Protein-Packed Avocado Toast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=580&q=80',
    duration: '15 min',
    difficulty: 'Easy',
    category: 'Breakfast',
    author: 'Jamie Oliver',
    rating: 4.8
  },
  {
    id: 2,
    title: 'Plant-Based Mushroom Pasta',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=580&q=80',
    duration: '25 min',
    difficulty: 'Medium',
    category: 'Dinner',
    author: 'Gordon Ramsay',
    rating: 4.7
  }
];

const popularRecipes = [
  {
    id: 3,
    title: 'Antioxidant Summer Salad',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=580&q=80',
    duration: '10 min',
    difficulty: 'Easy',
    category: 'Lunch',
    author: 'Nigella Lawson',
    rating: 4.9
  },
  {
    id: 4,
    title: 'Whole Grain Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=580&q=80',
    duration: '40 min',
    difficulty: 'Medium',
    category: 'Dinner',
    author: 'Jamie Oliver',
    rating: 4.6
  },
  {
    id: 5,
    title: 'Superfood Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&w=580&q=80',
    duration: '10 min',
    difficulty: 'Easy',
    category: 'Breakfast',
    author: 'Gordon Ramsay',
    rating: 4.8
  },
  {
    id: 6,
    title: 'Omega-3 Rich Salmon with Greens',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=580&q=80',
    duration: '25 min',
    difficulty: 'Medium',
    category: 'Dinner',
    author: 'Nigella Lawson',
    rating: 4.9
  }
];

// Categories with health-focused tags
const categories = [
  { id: 1, name: 'Breakfast', icon: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: 'High Protein', icon: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: 'Low Carb', icon: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=100&q=80' },
  { id: 4, name: 'Plant Based', icon: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80' },
  { id: 5, name: 'Quick Meals', icon: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=100&q=80' },
  { id: 6, name: 'Meal Prep', icon: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=100&q=80' }
];

// Home screen component
export default function HomeScreen() {
  const navigate = useNavigate();
  const path = window.location.pathname;

  // Navigate to recipe details
  const handleRecipeClick = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  // Navigate to category
  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category.toLowerCase().replace(' ', '-')}`);
  };

  // Navigation items - using window.location.pathname for determining active state
  const navigationItems = [
    { 
      icon: <Home size={24} />, 
      label: 'Home', 
      isActive: path === '/' || path.includes('/recipe/'),
      onClick: () => navigate('/') 
    },
    { 
      icon: <Book size={24} />, 
      label: 'Recipes', 
      isActive: path === '/recipes' || path.includes('/category/'),
      onClick: () => navigate('/recipes') 
    },
    { 
      icon: <Plus size={24} />, 
      label: 'Scan', 
      isActive: path === '/scan',
      onClick: () => navigate('/scan') 
    },
    { 
      icon: <ShoppingCart size={24} />, 
      label: 'Shopping', 
      isActive: path === '/shopping' || path.includes('/shopping/'),
      onClick: () => navigate('/shopping') 
    },
    { 
      icon: <User size={24} />, 
      label: 'Profile', 
      isActive: path === '/profile',
      onClick: () => navigate('/profile') 
    }
  ];

  return (
    <div>
      {/* App Bar with search */}
      <div style={{ 
        padding: `${spacing.md} ${spacing.md} ${spacing.sm}`,
        background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.teal} 100%)`,
        borderBottomLeftRadius: borderRadius.lg,
        borderBottomRightRadius: borderRadius.lg,
        position: 'sticky',
        top: 0,
        zIndex: 9,
        boxShadow: shadows.md,
      }}>
        <Flex justify="space-between" align="center" margin={`0 0 ${spacing.md}`}>
          <Text variant="h2" color={colors.white}>WisePantryPal</Text>
          <Heart size={24} color={colors.white} />
        </Flex>
        
        <div style={{ 
          display: 'flex',
          backgroundColor: `rgba(255, 255, 255, 0.9)`,
          borderRadius: borderRadius.lg,
          padding: `${spacing.xs} ${spacing.md}`,
          alignItems: 'center',
          boxShadow: shadows.sm,
        }}>
          <Search size={20} color={colors.secondary} style={{ marginRight: spacing.sm }} />
          <input
            type="text"
            placeholder="Search for healthy recipes..."
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '15px',
              width: '100%',
              outline: 'none',
              color: colors.onBackground,
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <Container padding="0" background={colors.surface}>
        <div style={{ padding: `${spacing.md} ${spacing.md} ${spacing.xxl}` }}>
          {/* Categories */}
          <div style={{ marginBottom: spacing.lg }}>
            <Flex justify="space-between" align="center" margin={`0 0 ${spacing.sm}`}>
              <Text variant="h3" color={colors.onBackground}>Categories</Text>
              <Button
                variant="text"
                icon={<ChevronRight size={16} />}
                onClick={() => navigate('/categories')}
              >
                View all
              </Button>
            </Flex>
            
            <div style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              gap: spacing.md,
              paddingBottom: spacing.sm,
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none'
            }}>
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  onClick={() => handleCategoryClick(category.name)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '70px',
                    cursor: 'pointer',
                    transition: `all ${animation.medium} ${animation.easing}`,
                  }}
                >
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: borderRadius.circle,
                    overflow: 'hidden',
                    marginBottom: spacing.xs,
                    border: `2px solid ${colors.primary}`,
                    boxShadow: shadows.sm,
                  }}>
                    <img 
                      src={category.icon} 
                      alt={category.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <Text 
                    variant="caption" 
                    align="center" 
                    style={{ 
                      fontSize: '12px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {category.name}
                  </Text>
                </div>
              ))}
            </div>
          </div>
          
          {/* Featured Recipes */}
          <div style={{ marginBottom: spacing.lg }}>
            <Flex justify="space-between" align="center" margin={`0 0 ${spacing.sm}`}>
              <Text variant="h3" color={colors.onBackground}>Featured</Text>
              <Button
                variant="text"
                icon={<ChevronRight size={16} />}
                onClick={() => navigate('/recipes')}
              >
                View all
              </Button>
            </Flex>
            
            <div style={{ 
              display: 'flex', 
              overflowX: 'auto',
              gap: spacing.md,
              paddingBottom: spacing.sm,
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none'
            }}>
              {featuredRecipes.map((recipe) => (
                <div 
                  key={recipe.id}
                  style={{ minWidth: '230px', maxWidth: '270px' }}
                  onClick={() => handleRecipeClick(recipe.id)}
                >
                  <RecipeCard
                    title={recipe.title}
                    image={recipe.image}
                    duration={recipe.duration}
                    difficulty={recipe.difficulty}
                    category={recipe.category}
                    author={recipe.author}
                    rating={recipe.rating}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Popular Recipes */}
          <div>
            <Flex justify="space-between" align="center" margin={`0 0 ${spacing.sm}`}>
              <Text variant="h3" color={colors.onBackground}>Popular</Text>
              <Button
                variant="text"
                icon={<ChevronRight size={16} />}
                onClick={() => navigate('/popular')}
              >
                View all
              </Button>
            </Flex>
            
            <Grid columns={2} gap={spacing.md}>
              {popularRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  duration={recipe.duration}
                  difficulty={recipe.difficulty}
                  onClick={() => handleRecipeClick(recipe.id)}
                />
              ))}
            </Grid>
          </div>
        </div>
      </Container>

      {/* Bottom Navigation removed to prevent duplication with App.tsx */}
    </div>
  );
}
