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
import NotificationTest from '../notifications/NotificationTest';

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
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a574?auto=format&fit=crop&w=580&q=80',
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
  { id: 1, name: 'Breakfast', icon: <img src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=100&q=80" alt="Breakfast" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} /> },
  { id: 2, name: 'High Protein', icon: <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=100&q=80" alt="High Protein" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} /> },
  { id: 3, name: 'Low Carb', icon: <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=100&q=80" alt="Low Carb" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} /> },
  { id: 4, name: 'Plant Based', icon: <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80" alt="Plant Based" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} /> },
  { id: 5, name: 'Quick Meals', icon: <img src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=100&q=80" alt="Quick Meals" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} /> },
  { id: 6, name: 'Meal Prep', icon: <img src="https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=100&q=80" alt="Meal Prep" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} /> }
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
    navigate(`/category/${category.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // Navigate to profile
  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Navigate to notifications
  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  return (
    <div>
      {/* Search Bar */}
      <div style={{ 
        padding: `0 ${spacing.md} ${spacing.md}`,
      }}>
        <div 
          onClick={() => navigate('/search')}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            padding: `${spacing.sm} ${spacing.md}`,
            backgroundColor: colors.lightGray,
            borderRadius: borderRadius.md,
            marginBottom: spacing.md,
            cursor: 'pointer',
          }}
        >
          <Search size={20} color={colors.darkGray} />
          <span style={{ marginLeft: spacing.sm, color: colors.darkGray }}>
            Search for recipes, ingredients...
          </span>
        </div>
      </div>

      {/* Main Content */}
      <Container padding="0" background={colors.background}>
        <div style={{ padding: `${spacing.md} ${spacing.md} ${spacing.xl}` }}>
          {/* Categories */}
          <div style={{ marginBottom: spacing.lg }}>
            <Flex justify="space-between" align="center" margin={`0 0 ${spacing.sm}`}>
              <Text variant="h3" color={colors.textPrimary}>Categories</Text>
              <Button
                variant="text"
                icon={<ChevronRight size={16} />}
                onClick={() => navigate('/categories')}
              >
                View all
              </Button>
            </Flex>
            <Grid 
              columns={2} 
              gap={spacing.md} 
              margin={`0 0 ${spacing.lg} 0`}
            >
              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  onClick={() => handleCategoryClick(category.name)}
                  padding={spacing.md}
                  background={colors.white}
                  shadow={shadows.sm}
                >
                  <Flex direction="column" align="center" justify="center">
                    <div style={{ 
                      fontSize: '2em', 
                      marginBottom: spacing.sm, 
                      color: colors.primary 
                    }}>{category.icon}</div>
                    <Text variant="body1" align="center">{category.name}</Text>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </div>

          {/* Featured */}
          <div style={{ marginBottom: spacing.lg }}>
            <Flex justify="space-between" align="center" margin={`0 0 ${spacing.sm}`}>
              <Text variant="h3" color={colors.textPrimary}>Featured</Text>
              <Button
                variant="text"
                icon={<ChevronRight size={16} color={colors.primary} />}
                onClick={() => navigate('/featured')}
                style={{ color: colors.primary }}
              >
                View all
              </Button>
            </Flex>
            <Container padding={`${spacing.md} ${spacing.md}`}>
              <Flex justify="space-between" align="center" margin={`0 0 ${spacing.sm}`}>
                <Text variant="h3">Featured Recipes</Text>
                <div 
                  onClick={() => navigate('/featured')}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    color: colors.primary
                  }}
                >
                  <Text variant="body2" style={{ color: 'inherit' }}>See All</Text>
                  <ChevronRight size={16} />
                </div>
              </Flex>
              {/* Test Component for Notifications - Remove in production */}
              <NotificationTest />
              <Grid columns={1} gap={spacing.md}>
                {featuredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    duration={recipe.duration}
                    difficulty={recipe.difficulty}
                    category={recipe.category || 'General'}
                    rating={recipe.rating || 4.5}
                    author={recipe.author || 'WisePantryPal'}
                    onClick={() => handleRecipeClick(recipe.id)}
                  />
                ))}
              </Grid>
            </Container>
          </div>

          {/* Popular Recipes */}
          <div>
            <Flex justify="space-between" align="center" margin={`0 0 ${spacing.sm}`}>
              <Text variant="h3" color={colors.textPrimary}>Popular</Text>
              <Button
                variant="text"
                icon={<ChevronRight size={16} color={colors.primary} />}
                onClick={() => navigate('/popular')}
                style={{ color: colors.primary }}
              >
                View all
              </Button>
            </Flex>
            <Grid columns={1} gap={spacing.md}>
              {popularRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  duration={recipe.duration}
                  difficulty={recipe.difficulty}
                  category={recipe.category || 'General'}
                  rating={recipe.rating || 4.5}
                  author={recipe.author || 'WisePantryPal'}
                  onClick={() => handleRecipeClick(recipe.id)}
                />
              ))}
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
}
