import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, Text, Button } from '../ui/KitchenStoriesDesign';

interface RecipeCard {
  id: string;
  title: string;
  image: string;
  description: string;
}

/**
 * TinderStyle component for swiping through recipe suggestions
 */
const TinderStyle: React.FC = () => {
  const navigate = useNavigate();
  
  // Sample recipe cards
  const [recipeCards, setRecipeCards] = useState<RecipeCard[]>([
    {
      id: '1',
      title: 'Vegetable Stir Fry',
      image: 'https://via.placeholder.com/300x200',
      description: 'A quick and healthy vegetable stir fry with tofu and rice.'
    },
    {
      id: '2',
      title: 'Pasta Primavera',
      image: 'https://via.placeholder.com/300x200',
      description: 'Fresh spring vegetables with pasta in a light cream sauce.'
    },
    {
      id: '3',
      title: 'Chicken Curry',
      image: 'https://via.placeholder.com/300x200',
      description: 'Spicy chicken curry with potatoes and carrots.'
    }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleLike = () => {
    if (currentIndex < recipeCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of cards
      navigate('/recipes');
    }
  };
  
  const handleDislike = () => {
    if (currentIndex < recipeCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of cards
      navigate('/recipes');
    }
  };
  
  return (
    <div style={{ 
      padding: spacing.md,
      backgroundColor: colors.background,
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Text variant="h2" style={{ marginBottom: spacing.md }}>
        Recipe Suggestions
      </Text>
      
      {currentIndex < recipeCards.length ? (
        <>
          <div 
            style={{
              width: '100%',
              maxWidth: '350px',
              height: '400px',
              backgroundImage: `url(${recipeCards[currentIndex].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              margin: `${spacing.md} 0`,
              padding: spacing.md
            }}
          >
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: spacing.md,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: colors.white,
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px'
            }}>
              <Text variant="h3" style={{ color: colors.white }}>
                {recipeCards[currentIndex].title}
              </Text>
              <Text variant="body1" style={{ color: colors.white }}>
                {recipeCards[currentIndex].description}
              </Text>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '350px',
            marginTop: spacing.md
          }}>
            <Button 
              variant="secondary"
              onClick={handleDislike}
              style={{ 
                width: '48%',
                backgroundColor: colors.error
              }}
            >
              Dislike
            </Button>
            <Button 
              variant="primary"
              onClick={handleLike}
              style={{ width: '48%' }}
            >
              Like
            </Button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: spacing.xl }}>
          <Text variant="h3">
            No more recipes to show!
          </Text>
          <Button 
            variant="primary"
            onClick={() => navigate('/recipes')}
            style={{ marginTop: spacing.md }}
          >
            Browse All Recipes
          </Button>
        </div>
      )}
      
      <Button 
        variant="text"
        onClick={() => navigate('/')}
        style={{ marginTop: spacing.xl }}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default TinderStyle;
