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
import { Search, ArrowLeft } from 'lucide-react';

export default function SearchScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // In a real app, we would perform search as user types
    // For demo purposes, we'll just simulate some results
    if (e.target.value.length > 2) {
      setSearchResults([
        { id: 1, name: 'Avocado Toast', type: 'recipe' },
        { id: 2, name: 'Avocado', type: 'ingredient' },
        { id: 3, name: 'Avocado Salad', type: 'recipe' },
        { id: 4, name: 'Avocado Smoothie', type: 'recipe' }
      ]);
    } else {
      setSearchResults([]);
    }
  };

  // Handle result click
  const handleResultClick = (id: number, type: string) => {
    if (type === 'recipe') {
      navigate(`/recipe/${id}`);
    } else if (type === 'ingredient') {
      navigate(`/ingredient/${id}`);
    }
  };

  return (
    <Container padding="0" background={colors.background}>
      {/* Header with search bar */}
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
          >
            <ArrowLeft size={24} />
          </Button>
          <div style={{ 
            flex: 1,
            display: 'flex',
            backgroundColor: colors.white,
            borderRadius: borderRadius.lg,
            padding: `${spacing.xs} ${spacing.md}`,
            alignItems: 'center',
            boxShadow: shadows.sm,
          }}>
            <Search size={20} color={colors.primary} style={{ marginRight: spacing.sm }} />
            <input
              type="text"
              placeholder="Search for recipes, ingredients..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '15px',
                width: '100%',
                outline: 'none',
                color: colors.textPrimary,
              }}
            />
          </div>
        </Flex>
      </div>

      {/* Search results */}
      <div style={{ padding: spacing.md }}>
        {searchResults.length > 0 ? (
          <>
            <Text variant="h3" style={{ marginBottom: spacing.md }}>Search Results</Text>
            <Grid columns={1} gap={spacing.sm}>
              {searchResults.map((result: any) => (
                <div key={result.id} style={{ cursor: 'pointer' }} onClick={() => handleResultClick(result.id, result.type)}>
                  <Card 
                    padding={spacing.md}
                  >
                    <Flex justify="space-between" align="center">
                      <div>
                        <Text variant="body1" style={{ fontWeight: 'bold' }}>{result.name}</Text>
                        <Text variant="body2" style={{ color: colors.textSecondary }}>
                          {result.type === 'recipe' ? 'Recipe' : 'Ingredient'}
                        </Text>
                      </div>
                      <div style={{ 
                        backgroundColor: result.type === 'recipe' ? colors.primary : colors.accent1,
                        color: colors.white,
                        padding: `${spacing.xs} ${spacing.sm}`,
                        borderRadius: borderRadius.md,
                        fontSize: '12px'
                      }}>
                        {result.type === 'recipe' ? 'Recipe' : 'Ingredient'}
                      </div>
                    </Flex>
                  </Card>
                </div>
              ))}
            </Grid>
          </>
        ) : searchQuery.length > 0 ? (
          <Flex direction="column" align="center" justify="center" style={{ marginTop: spacing.xl }}>
            <Text variant="h3">No results found</Text>
            <Text variant="body1" style={{ color: colors.textSecondary, marginTop: spacing.sm }}>
              Try a different search term
            </Text>
          </Flex>
        ) : (
          <Flex direction="column" align="center" justify="center" style={{ marginTop: spacing.xl }}>
            <Text variant="h3">Search for recipes or ingredients</Text>
            <Text variant="body1" style={{ color: colors.textSecondary, marginTop: spacing.sm }}>
              Type at least 3 characters to start searching
            </Text>
          </Flex>
        )}
      </div>
    </Container>
  );
}
