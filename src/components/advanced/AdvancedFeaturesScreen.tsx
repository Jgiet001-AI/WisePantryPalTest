import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Card,
  Flex,
  colors,
  spacing,
  shadows,
  borderRadius,
} from '../ui/KitchenStoriesDesign';
import {
  DollarSign,
  Map,
  Calendar,
  Utensils,
  FileBadge,
  ChevronRight,
  User,
} from 'lucide-react';

export default function AdvancedFeaturesScreen() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Advanced feature items
  const advancedFeatures = [
    {
      icon: <DollarSign size={24} color={colors.primary} />,
      title: 'Price Comparison',
      description: 'Compare prices across different stores to find the best deals on your grocery items.',
      path: '/price-comparison',
    },
    {
      icon: <Map size={24} color={colors.primary} />,
      title: 'Store Finder',
      description: 'Find stores near you that have the items you need at the best prices.',
      path: '/store-finder',
    },
    {
      icon: <Utensils size={24} color={colors.primary} />,
      title: 'Meal Planning',
      description: 'Plan your meals for the week ahead, with automatic grocery list generation.',
      path: '/meal-planning',
    },
    {
      icon: <Calendar size={24} color={colors.primary} />,
      title: 'Smart Calendar',
      description: 'A calendar that helps you track food expiration dates and plan meals accordingly.',
      path: '/smart-calendar',
    },
    {
      icon: <FileBadge size={24} color={colors.primary} />,
      title: 'Dietary Preferences',
      description: 'Set your dietary preferences and allergies to receive personalized recommendations.',
      path: '/dietary-preferences',
    },
    {
      icon: <User size={24} color={colors.primary} />,
      title: 'Profile',
      description: 'Manage your account settings, preferences, and personal information.',
      path: '/profile',
    },
  ];

  return (
    <Container style={{ 
      padding: `${spacing.lg} ${spacing.md}`,
      paddingBottom: '90px' // Ensure content isn't cut off by bottom nav
    }}>
      {/* Header */}
      <Text variant="h1" color={colors.onBackground} margin={`0 0 ${spacing.lg}`}>
        More Features
      </Text>
      
      {/* Advanced Features */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.md,
      }}>
        {advancedFeatures.map((feature, index) => (
          <div 
            key={index}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: hoveredCard === index ? 'translateY(-2px)' : 'none',
            }}
          >
            <Card 
              background={colors.white}
              shadow={hoveredCard === index ? shadows.md : shadows.sm}
              padding={spacing.md}
              onClick={() => navigate(feature.path)}
            >
              <Flex justify="space-between" align="center">
                <Flex gap={spacing.md} align="center">
                  <div style={{
                    backgroundColor: `${colors.primary}15`,
                    padding: spacing.sm,
                    borderRadius: borderRadius.circle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <Text variant="h3" color={colors.onBackground} margin={`0 0 ${spacing.xs}`}>
                      {feature.title}
                    </Text>
                    <Text variant="body2" color={colors.darkGray}>
                      {feature.description}
                    </Text>
                  </div>
                </Flex>
                <ChevronRight size={20} color={colors.darkGray} />
              </Flex>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}
