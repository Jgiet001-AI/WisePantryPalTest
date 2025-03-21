import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Grid,
  Card,
  Button,
  colors,
  spacing,
  shadows,
  borderRadius
} from '../ui/KitchenStoriesDesign';
import { ArrowLeft } from 'lucide-react';

export default function CategoriesScreen() {
  const navigate = useNavigate();

  // All categories with images
  const allCategories = [
    { id: 1, name: 'Breakfast', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'High Protein', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Low Carb', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=100&q=80' },
    { id: 4, name: 'Plant Based', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80' },
    { id: 5, name: 'Quick Meals', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=100&q=80' },
    { id: 6, name: 'Meal Prep', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=100&q=80' },
    { id: 7, name: 'Dinner', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=100&q=80' },
    { id: 8, name: 'Lunch', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80' },
    { id: 9, name: 'Snacks', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=100&q=80' },
    { id: 10, name: 'Desserts', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=100&q=80' },
    { id: 11, name: 'Smoothies', image: 'https://images.unsplash.com/photo-1553530666-ba11a90bb0ae?auto=format&fit=crop&w=100&q=80' },
    { id: 12, name: 'Soups', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=100&q=80' }
  ];

  // Navigate to category detail
  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category.toLowerCase().replace(/\s+/g, '-')}`);
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
            All Categories
          </Text>
        </Flex>
      </div>

      {/* Categories grid */}
      <div style={{ padding: spacing.md }}>
        <Grid 
          columns={2} 
          gap={spacing.md} 
          margin={`0 0 ${spacing.lg} 0`}
        >
          {allCategories.map((category) => (
            <Card 
              key={category.id} 
              onClick={() => handleCategoryClick(category.name)}
              padding={spacing.md}
              background={colors.white}
              shadow={shadows.sm}
              margin="0"
            >
              <Flex direction="column" align="center" justify="center">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    marginBottom: spacing.sm
                  }} 
                />
                <Text variant="body1" align="center" style={{ fontWeight: 'medium' }}>
                  {category.name}
                </Text>
              </Flex>
            </Card>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
