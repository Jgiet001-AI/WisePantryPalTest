import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

export default function CategoryDetail() {
  const navigate = useNavigate();
  const { categoryName } = useParams<{ categoryName: string }>();
  
  // Format category name for display
  const formattedCategoryName = categoryName
    ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  // Sample recipes for this category
  const categoryRecipes = [
    {
      id: 1,
      title: 'Protein-Packed Avocado Toast',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=580&q=80',
      duration: '15 min',
      difficulty: 'Easy',
      category: formattedCategoryName,
      author: 'Jamie Oliver',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Plant-Based Mushroom Pasta',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=580&q=80',
      duration: '25 min',
      difficulty: 'Medium',
      category: formattedCategoryName,
      author: 'Gordon Ramsay',
      rating: 4.7
    },
    {
      id: 3,
      title: 'Antioxidant Summer Salad',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=580&q=80',
      duration: '10 min',
      difficulty: 'Easy',
      category: formattedCategoryName,
      author: 'Nigella Lawson',
      rating: 4.6
    },
    {
      id: 4,
      title: 'Whole Grain Margherita Pizza',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a574?auto=format&fit=crop&w=580&q=80',
      duration: '40 min',
      difficulty: 'Medium',
      category: formattedCategoryName,
      author: 'Nigella Lawson',
      rating: 4.9
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
            {formattedCategoryName}
          </Text>
        </Flex>
      </div>

      {/* Recipes grid */}
      <div style={{ padding: spacing.md }}>
        <Text variant="h3" style={{ marginBottom: spacing.md }}>
          {formattedCategoryName} Recipes
        </Text>
        
        <Grid 
          columns={1} 
          gap={spacing.md} 
          margin={`0 0 ${spacing.lg} 0`}
        >
          {categoryRecipes.map((recipe) => (
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
