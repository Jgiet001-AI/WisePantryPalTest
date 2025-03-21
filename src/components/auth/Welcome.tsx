import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Text, Button, Flex, colors, spacing } from '../ui/KitchenStoriesDesign';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container padding={spacing.lg} background={colors.white}>
      <Flex direction="column" align="center" justify="center" style={{ minHeight: '80vh' }}>
        <div style={{ marginBottom: spacing.xl }}>
          <Text variant="h1" align="center" style={{ marginBottom: spacing.md }}>
            Welcome to WisePantryPal
          </Text>
          <Text variant="body1" align="center" style={{ marginBottom: spacing.xl }}>
            Your smart kitchen assistant for meal planning, recipe discovery, and pantry management.
          </Text>
        </div>

        <img 
          src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=300&q=80" 
          alt="Kitchen" 
          style={{ 
            width: '100%', 
            maxWidth: '300px', 
            borderRadius: '12px', 
            marginBottom: spacing.xl 
          }} 
        />

        <Flex direction="column" style={{ width: '100%', maxWidth: '300px', gap: spacing.md }}>
          <Button 
            variant="primary" 
            onClick={() => navigate('/onboarding/1')}
            style={{ width: '100%' }}
          >
            Get Started
          </Button>
          <Button 
            variant="text" 
            onClick={() => navigate('/setup')}
            style={{ width: '100%' }}
          >
            I already have an account
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Welcome;
