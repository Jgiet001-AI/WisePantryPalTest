import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Card,
  Button,
  colors,
  spacing,
  shadows
} from '../ui/KitchenStoriesDesign';
import { ArrowLeft, Check } from 'lucide-react';

const DietaryPreferences: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<string[]>([]);

  const dietaryOptions = [
    { id: 'vegetarian', name: 'Vegetarian', description: 'No meat, poultry, or seafood' },
    { id: 'vegan', name: 'Vegan', description: 'No animal products or byproducts' },
    { id: 'glutenFree', name: 'Gluten Free', description: 'No wheat, barley, or rye' },
    { id: 'dairyFree', name: 'Dairy Free', description: 'No milk, cheese, or dairy products' },
    { id: 'nutFree', name: 'Nut Free', description: 'No nuts or nut derivatives' },
    { id: 'lowCarb', name: 'Low Carb', description: 'Reduced carbohydrate content' },
    { id: 'keto', name: 'Keto', description: 'High fat, adequate protein, low carb' },
    { id: 'paleo', name: 'Paleo', description: 'Based on foods presumed to be available to paleolithic humans' },
  ];

  const togglePreference = (id: string) => {
    if (preferences.includes(id)) {
      setPreferences(preferences.filter(p => p !== id));
    } else {
      setPreferences([...preferences, id]);
    }
  };

  const savePreferences = () => {
    // In a real app, save to user profile
    // For demo, just navigate back
    navigate('/advanced');
  };

  return (
    <Container padding="0" background={colors.background}>
      {/* Header */}
      <div style={{ 
        padding: spacing.md,
        background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        position: 'sticky',
        top: 0,
        zIndex: 9,
        boxShadow: shadows.md,
      }}>
        <Flex align="center">
          <Button 
            variant="text" 
            onClick={() => navigate('/advanced')}
            style={{ marginRight: spacing.sm, color: colors.white }}
            icon={<ArrowLeft size={24} />}
          >
            Back
          </Button>
          <Text variant="h2" style={{ color: colors.white, margin: 0, fontWeight: 'bold' }}>
            Dietary Preferences
          </Text>
        </Flex>
      </div>

      {/* Content */}
      <div style={{ padding: spacing.md }}>
        <Text variant="body1" style={{ marginBottom: spacing.lg }}>
          Select your dietary preferences to personalize your recipe recommendations.
        </Text>

        <div style={{ marginBottom: spacing.xl }}>
          {dietaryOptions.map(option => (
            <Card 
              key={option.id}
              padding={spacing.md}
              margin={`0 0 ${spacing.sm} 0`}
              background={colors.white}
              shadow={shadows.sm}
              onClick={() => togglePreference(option.id)}
            >
              <Flex justify="space-between" align="center">
                <div>
                  <Text variant="body1" style={{ fontWeight: 'bold', marginBottom: spacing.xs }}>
                    {option.name}
                  </Text>
                  <Text variant="body2" style={{ color: colors.midGray }}>
                    {option.description}
                  </Text>
                </div>
                {preferences.includes(option.id) && (
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    backgroundColor: colors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check size={16} color={colors.white} />
                  </div>
                )}
              </Flex>
            </Card>
          ))}
        </div>

        <Button 
          variant="primary" 
          onClick={savePreferences}
          style={{ width: '100%' }}
        >
          Save Preferences
        </Button>
      </div>
    </Container>
  );
};

export default DietaryPreferences;
