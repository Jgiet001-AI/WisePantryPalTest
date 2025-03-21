import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Grid,
  RecipeCard,
  Button,
  colors,
  spacing,
  shadows,
  borderRadius
} from '../ui/KitchenStoriesDesign';
import { ArrowLeft } from 'lucide-react';

export default function FeaturedScreen() {
  const navigate = useNavigate();

  // Sample featured recipes
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
    },
    {
      id: 3,
      title: 'Antioxidant Summer Salad',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=580&q=80',
      duration: '10 min',
      difficulty: 'Easy',
      category: 'Lunch',
      author: 'Nigella Lawson',
      rating: 4.6
    },
    {
      id: 4,
      title: 'Whole Grain Margherita Pizza',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a574?auto=format&fit=crop&w=580&q=80',
      duration: '40 min',
      difficulty: 'Medium',
      category: 'Dinner',
      author: 'Nigella Lawson',
      rating: 4.9
    },
    {
      id: 5,
      title: 'Mediterranean Quinoa Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=580&q=80',
      duration: '20 min',
      difficulty: 'Easy',
      category: 'Lunch',
      author: 'Jamie Oliver',
      rating: 4.8
    },
    {
      id: 6,
      title: 'Berry Protein Smoothie',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a90bb0ae?auto=format&fit=crop&w=580&q=80',
      duration: '5 min',
      difficulty: 'Easy',
      category: 'Breakfast',
      author: 'Gordon Ramsay',
      rating: 4.5
    }
  ];

  // Navigate to recipe details
  const handleRecipeClick = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <Container padding="0" background={colors.background}>
      {/* Header */}
      <div style={{ 
        padding: spacing.md,
        background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        borderBottomLeftRadius: borderRadius.lg,
        borderBottomRightRadius: borderRadius.lg,
        position: 'sticky',
        top: 0,
        zIndex: 9,
        boxShadow: shadows.md,
      }}>
        <Flex align="center">
          <Button 
            variant="text" 
            onClick={() => navigate(-1)}
            style={{ marginRight: spacing.sm, color: colors.white }}
            icon={<ArrowLeft size={24} />}
          >
            Back
          </Button>
          <Text variant="h2" style={{ color: colors.white, margin: 0, fontWeight: 'bold' }}>
            Featured Recipes
          </Text>
        </Flex>
      </div>

      {/* Featured recipes grid */}
      <div style={{ padding: spacing.md }}>
        <Text variant="body1" style={{ marginBottom: spacing.md, color: colors.textSecondary }}>
          Our editors' picks for healthy and delicious meals
        </Text>
        
        <Grid 
          columns={1} 
          gap={spacing.md} 
          margin={`0 0 ${spacing.lg} 0`}
        >
          {featuredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              duration={recipe.duration}
              difficulty={recipe.difficulty}
              category={recipe.category}
              rating={recipe.rating}
              author={recipe.author}
              onClick={() => handleRecipeClick(recipe.id)}
            />
          ))}
        </Grid>
      </div>
    </Container>
  );
}
