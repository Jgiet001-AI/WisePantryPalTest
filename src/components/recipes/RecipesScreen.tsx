import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Grid,
  Card,
  Badge,
  RecipeCard,
  colors,
  spacing,
  shadows,
  borderRadius,
} from '../ui/KitchenStoriesDesign';
import { 
  Home, 
  Book, 
  Plus, 
  ShoppingCart, 
  User, 
  Search, 
  ChevronRight, 
  Filter, 
  Clock, 
  Heart,
  Star,
  Award,
  TrendingUp,
  Leaf,
  Flame
} from 'lucide-react';

// Sample recipe data with health-focused content
const healthyRecipes = [
  {
    id: 1,
    title: 'Protein-Packed Avocado Toast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=580&q=80',
    duration: '15 min',
    difficulty: 'Easy',
    category: 'Breakfast',
    author: 'Jamie Oliver',
    rating: 4.8,
    healthTags: ['High Protein', 'Whole Grain', 'Plant-Based']
  },
  {
    id: 2,
    title: 'Rainbow Grain Bowl',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=580&q=80',
    duration: '20 min',
    difficulty: 'Easy',
    category: 'Lunch',
    author: 'Ella Mills',
    rating: 4.7,
    healthTags: ['Antioxidants', 'Vitamin-Rich', 'Gluten-Free']
  },
  {
    id: 3,
    title: 'Mediterranean Salmon',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=580&q=80',
    duration: '25 min',
    difficulty: 'Medium',
    category: 'Dinner',
    author: 'Gordon Ramsay',
    rating: 4.9,
    healthTags: ['Omega-3', 'Heart-Healthy', 'High Protein']
  },
  {
    id: 4,
    title: 'Green Detox Smoothie',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=580&q=80',
    duration: '5 min',
    difficulty: 'Easy',
    category: 'Breakfast',
    author: 'Deliciously Ella',
    rating: 4.5,
    healthTags: ['Detox', 'Vitamin-Rich', 'Plant-Based']
  },
  {
    id: 5,
    title: 'Quinoa Stuffed Bell Peppers',
    image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=580&q=80',
    duration: '35 min',
    difficulty: 'Medium',
    category: 'Dinner',
    author: 'Ottolenghi',
    rating: 4.6,
    healthTags: ['Complete Protein', 'Fiber-Rich', 'Gluten-Free']
  },
  {
    id: 6,
    title: 'Berry Chia Pudding',
    image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=580&q=80',
    duration: '5 min + overnight',
    difficulty: 'Easy',
    category: 'Breakfast',
    author: 'Deliciously Ella',
    rating: 4.7,
    healthTags: ['Omega-3', 'Antioxidants', 'Plant-Based']
  }
];

const categories = [
  { id: 1, name: 'Breakfast', icon: '🍳' },
  { id: 2, name: 'Lunch', icon: '🥗' },
  { id: 3, name: 'Dinner', icon: '🍽️' },
  { id: 4, name: 'Snacks', icon: '🥨' },
  { id: 5, name: 'Desserts', icon: '🍰' },
  { id: 6, name: 'Drinks', icon: '🥤' }
];

const dietaryFilters = [
  { id: 1, name: 'Vegetarian', icon: <Leaf size={14} /> },
  { id: 2, name: 'High Protein', icon: <Flame size={14} /> },
  { id: 3, name: 'Low Carb', icon: <Award size={14} /> },
  { id: 4, name: 'Gluten Free', icon: <Star size={14} /> }
];

export default function RecipesScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeDietary, setActiveDietary] = useState<string | null>(null);

  const handleRecipeClick = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div>
      {/* Header with search */}
      <div style={{ 
        padding: `${spacing.md} ${spacing.md} 0`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: colors.background,
      }}>
        <Flex justify="space-between" align="center" margin={`0 0 ${spacing.md}`}>
          <Text variant="h2" color={colors.onBackground}>Recipes</Text>
          <Heart size={24} color={colors.primary} />
        </Flex>
        
        <div style={{ 
          display: 'flex',
          backgroundColor: colors.surface,
          borderRadius: borderRadius.lg,
          padding: `${spacing.xs} ${spacing.md}`,
          alignItems: 'center',
          boxShadow: shadows.sm,
          marginBottom: spacing.md,
          border: `1px solid ${colors.divider}`
        }}>
          <Search size={20} color={colors.secondary} style={{ marginRight: spacing.sm }} />
          <input
            type="text"
            placeholder="Search healthy recipes..."
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '15px',
              width: '100%',
              outline: 'none',
              color: colors.onBackground,
            }}
          />
          <Filter size={20} color={colors.secondary} />
        </div>

        {/* Category Pills */}
        <div style={{ 
          display: 'flex',
          overflowX: 'auto',
          gap: spacing.sm,
          paddingBottom: spacing.md,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setActiveFilter(activeFilter === category.name ? null : category.name)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '60px',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: borderRadius.circle,
                backgroundColor: activeFilter === category.name ? colors.primary : colors.surface,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.xs,
                boxShadow: activeFilter === category.name ? shadows.md : shadows.sm,
                border: `1px solid ${activeFilter === category.name ? colors.primary : colors.divider}`,
                fontSize: '24px',
                transition: 'all 0.2s ease',
              }}>
                {category.icon}
              </div>
              <Text 
                variant="caption" 
                color={activeFilter === category.name ? colors.primary : colors.onBackground}
                align="center"
              >
                {category.name}
              </Text>
            </div>
          ))}
        </div>

        {/* Dietary Filters */}
        <div style={{ 
          display: 'flex',
          overflowX: 'auto',
          gap: spacing.sm,
          paddingBottom: spacing.md,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {dietaryFilters.map((filter) => (
            <div
              key={filter.id}
              onClick={() => setActiveDietary(activeDietary === filter.name ? null : filter.name)}
              style={{
                padding: `${spacing.xs} ${spacing.sm}`,
                backgroundColor: activeDietary === filter.name ? colors.primary : colors.surface,
                color: activeDietary === filter.name ? colors.white : colors.darkGray,
                borderRadius: borderRadius.xl,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
                cursor: 'pointer',
                boxShadow: activeDietary === filter.name ? shadows.md : shadows.sm,
                border: `1px solid ${activeDietary === filter.name ? colors.primary : colors.divider}`,
                transition: 'all 0.2s ease',
              }}
            >
              {filter.icon}
              <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>{filter.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <Container padding={`0 ${spacing.md} ${spacing.xxl}`} background={colors.background}>
        {/* Featured Recipe */}
        <div style={{ marginBottom: spacing.xl }}>
          <Flex justify="space-between" align="center" margin={`${spacing.md} 0`}>
            <Flex align="center" gap={spacing.xs}>
              <Star size={18} color={colors.accent} />
              <Text variant="h3" color={colors.onBackground}>Featured Recipe</Text>
            </Flex>
          </Flex>
          
          <Card 
            padding="0" 
            margin={`0 0 ${spacing.lg}`}
            borderRadiusSize={borderRadius.lg}
            shadow={shadows.lg}
            onClick={() => handleRecipeClick(healthyRecipes[2].id)}
          >
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <img 
                src={healthyRecipes[2].image} 
                alt={healthyRecipes[2].title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderTopLeftRadius: borderRadius.lg,
                  borderTopRightRadius: borderRadius.lg
                }}
              />
              <div style={{
                position: 'absolute',
                top: spacing.sm,
                left: spacing.sm,
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: colors.white,
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: borderRadius.xl,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs
              }}>
                <Clock size={14} />
                {healthyRecipes[2].duration}
              </div>
              <Badge
                color={colors.white}
                background={colors.primary}
                style={{
                  position: 'absolute',
                  top: spacing.sm,
                  right: spacing.sm,
                }}
              >
                Trending
              </Badge>
            </div>
            <div style={{ padding: spacing.md }}>
              <Text variant="h3" color={colors.onBackground} margin={`0 0 ${spacing.xs}`}>
                {healthyRecipes[2].title}
              </Text>
              <Flex justify="space-between" align="center" margin={`0 0 ${spacing.xs}`}>
                <Text variant="body2" color={colors.darkGray}>
                  by {healthyRecipes[2].author}
                </Text>
                <Flex align="center" gap="4px">
                  <Star size={16} color={colors.accent} fill={colors.accent} />
                  <Text variant="body2" color={colors.darkGray}>
                    {healthyRecipes[2].rating}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={spacing.xs} wrap="wrap" margin={`${spacing.sm} 0 0`}>
                {healthyRecipes[2].healthTags.map((tag, index) => (
                  <Badge
                    key={index}
                    color={colors.white}
                    background={`${colors.secondary}CC`}
                  >
                    {tag}
                  </Badge>
                ))}
              </Flex>
            </div>
          </Card>
        </div>

        {/* Recipe Grid */}
        <div>
          <Flex justify="space-between" align="center" margin={`${spacing.md} 0`}>
            <Flex align="center" gap={spacing.xs}>
              <Leaf size={18} color={colors.primary} />
              <Text variant="h3" color={colors.onBackground}>Healthy Recipes</Text>
            </Flex>
            <Flex align="center" gap={spacing.xs} style={{ cursor: 'pointer' }}>
              <Text variant="body2" color={colors.secondary}>Sort</Text>
              <Filter size={16} color={colors.secondary} />
            </Flex>
          </Flex>
          
          <Grid columns={2} gap={spacing.md}>
            {healthyRecipes.filter(recipe => recipe.id !== 3).map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                {...recipe} 
                onClick={() => handleRecipeClick(recipe.id)}
              />
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
}
