import React, { useState, useEffect } from 'react';
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
  animation,
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
  Flame,
  ScanLine,
  X
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
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState<number[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleRecipeClick = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteRecipes(prev => 
      prev.includes(id) 
        ? prev.filter(recipeId => recipeId !== id)
        : [...prev, id]
    );
  };

  // Filter recipes based on active filters
  const filteredRecipes = healthyRecipes.filter(recipe => {
    const matchesCategory = !activeFilter || recipe.category === activeFilter;
    const matchesDietary = !activeDietary || recipe.healthTags.some(tag => tag.includes(activeDietary));
    const matchesSearch = !searchTerm || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.healthTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesDietary && matchesSearch;
  });

  return (
    <Container 
      style={{ 
        padding: 0, 
        maxWidth: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflowY: 'hidden',
        background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.secondaryLight})`,
      }}
    >
      {/* Header with search */}
      <div style={{ 
        padding: `${spacing.md} ${spacing.md} 0`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: isSearchFocused ? 'none' : `1px solid rgba(230, 235, 245, 0.8)`,
        boxShadow: shadows.sm
      }}>
        <Flex justify="space-between" align="center" margin={`0 0 ${spacing.md}`}>
          <Text variant="h2" style={{ color: colors.textPrimary }}>Recipes</Text>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.sm
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: borderRadius.full,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(5px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: `all ${animation.fast} ${animation.easing}`,
              boxShadow: shadows.sm
            }}>
              <Heart 
                size={20} 
                color={colors.primary} 
                fill={favoriteRecipes.length > 0 ? colors.primary : 'none'}
                onClick={() => navigate('/favorites')}
              />
            </div>
          </div>
        </Flex>

        {/* Search bar */}
        <div 
          className="search-bar"
          style={{ 
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: borderRadius.md,
            padding: `${spacing.xs} ${spacing.md}`,
            marginBottom: spacing.md,
            boxShadow: shadows.sm,
            border: '1px solid rgba(230, 235, 245, 0.8)',
            transition: `all ${animation.fast} ${animation.easing}`
          }}
        >
          <Search size={20} color={colors.primary} style={{ marginRight: spacing.sm }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search healthy recipes..."
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '15px',
              width: '100%',
              outline: 'none',
              padding: `${spacing.xs} 0`,
              color: colors.textPrimary
            }}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchTerm && (
            <X 
              size={18} 
              color={colors.textSecondary} 
              className="clear-button"
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: 0.7
              }}
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            />
          )}
        </div>

        {/* Category filters with glass effect */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: spacing.sm,
          paddingBottom: spacing.sm,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}>
          {categories.map(category => (
            <div 
              key={category.id}
              className="category-filter"
              onClick={() => setActiveFilter(activeFilter === category.name ? null : category.name)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: spacing.sm,
                minWidth: '60px',
                backgroundColor: activeFilter === category.name 
                  ? 'rgba(67, 97, 238, 0.15)' 
                  : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(5px)',
                borderRadius: borderRadius.lg,
                cursor: 'pointer',
                border: `1px solid ${activeFilter === category.name 
                  ? colors.primary + '30' 
                  : 'rgba(230, 235, 245, 0.8)'}`,
                boxShadow: activeFilter === category.name ? shadows.sm : 'none',
                transition: `all ${animation.fast} ${animation.easing}`
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{category.icon}</div>
              <Text 
                variant="caption" 
                style={{ 
                  color: activeFilter === category.name ? colors.primary : colors.textSecondary,
                  fontWeight: activeFilter === category.name ? 600 : 400
                }}
              >
                {category.name}
              </Text>
            </div>
          ))}
        </div>

        {/* Dietary filters with glass effect */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: spacing.sm,
          paddingBottom: spacing.md,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}>
          {dietaryFilters.map(filter => (
            <div 
              key={filter.id}
              className="dietary-filter"
              onClick={() => setActiveDietary(activeDietary === filter.name ? null : filter.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: `${spacing.xs} ${spacing.sm}`,
                backgroundColor: activeDietary === filter.name 
                  ? 'rgba(67, 97, 238, 0.15)' 
                  : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(5px)',
                borderRadius: borderRadius.full,
                cursor: 'pointer',
                border: `1px solid ${activeDietary === filter.name 
                  ? colors.primary + '30' 
                  : 'rgba(230, 235, 245, 0.8)'}`,
                boxShadow: activeDietary === filter.name ? shadows.sm : 'none',
                transition: `all ${animation.fast} ${animation.easing}`
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {filter.icon}
              </div>
              <Text 
                variant="caption" 
                style={{ 
                  color: activeDietary === filter.name ? colors.primary : colors.textSecondary,
                  fontWeight: activeDietary === filter.name ? 600 : 400
                }}
              >
                {filter.name}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe grid with glass effect cards */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: spacing.md,
        paddingTop: 0
      }}>
        {filteredRecipes.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(5px)',
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            textAlign: 'center',
            margin: `${spacing.lg} 0`,
            border: `1px solid rgba(230, 235, 245, 0.8)`,
          }}>
            <Text variant="body1" style={{ color: colors.textSecondary, marginBottom: spacing.sm }}>
              No recipes found matching your criteria
            </Text>
            <Text variant="caption" style={{ color: colors.textSecondary }}>
              Try adjusting your filters or search term
            </Text>
          </div>
        ) : (
          <Grid columns={1} gap={spacing.md}>
            {filteredRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="recipe-card"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: borderRadius.lg,
                  overflow: 'hidden',
                  boxShadow: shadows.sm,
                  transition: `all ${animation.medium}`,
                  cursor: 'pointer',
                  transform: 'translateY(0)',
                  border: '1px solid rgba(230, 235, 245, 0.8)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover'
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      top: spacing.sm,
                      right: spacing.sm,
                      width: '36px',
                      height: '36px',
                      borderRadius: borderRadius.full,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(5px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 1
                    }}
                    onClick={(e) => toggleFavorite(recipe.id, e)}
                  >
                    <Heart 
                      size={20} 
                      color={colors.primary} 
                      fill={favoriteRecipes.includes(recipe.id) ? colors.primary : 'none'}
                    />
                  </div>
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: spacing.sm,
                      left: spacing.sm,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(5px)',
                      borderRadius: borderRadius.md,
                      padding: `${spacing.xs} ${spacing.sm}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Clock size={14} color={colors.white} />
                    <Text variant="caption" style={{ color: colors.white }}>
                      {recipe.duration}
                    </Text>
                  </div>
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: spacing.sm,
                      right: spacing.sm,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(5px)',
                      borderRadius: borderRadius.md,
                      padding: `${spacing.xs} ${spacing.sm}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Star size={14} color={colors.warning} fill={colors.warning} />
                    <Text variant="caption" style={{ color: colors.textPrimary, fontWeight: 600 }}>
                      {recipe.rating}
                    </Text>
                  </div>
                </div>
                <div style={{ padding: spacing.md }}>
                  <Text variant="h3" style={{ marginBottom: spacing.xs }}>{recipe.title}</Text>
                  <Text variant="caption" style={{ color: colors.textSecondary, marginBottom: spacing.sm }}>
                    by {recipe.author}
                  </Text>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginTop: spacing.xs
                  }}>
                    {recipe.healthTags.map((tag, index) => (
                      <div 
                        key={index}
                        style={{
                          backgroundColor: 'rgba(67, 97, 238, 0.1)',
                          borderRadius: borderRadius.sm,
                          padding: `2px ${spacing.xs}`,
                          fontSize: '12px',
                          color: colors.primary,
                          fontWeight: 500
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Grid>
        )}
      </div>
      <style>
        {`
          .recipe-card {
            transition: all 0.3s ease;
          }
          
          .recipe-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          }
          
          .category-filter {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          
          .category-filter:hover {
            transform: scale(1.05);
          }
          
          .dietary-filter {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          
          .dietary-filter:hover {
            transform: scale(1.05);
          }
          
          .search-bar:focus-within {
            box-shadow: 0 0 0 2px ${colors.primary}40;
          }
          .clear-button {
            cursor: pointer;
            transition: all 0.2s ease;
            opacity: 0.7;
          }
          .clear-button:hover {
            opacity: 1;
            transform: scale(1.1);
          }
        `}
      </style>
    </Container>
  );
}
