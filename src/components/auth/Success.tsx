import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Text, Button, Flex, colors, spacing } from '../ui/KitchenStoriesDesign';
import { CheckCircle } from 'lucide-react';

const Success: React.FC = () => {
  const navigate = useNavigate();

  // Auto-redirect to home after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container padding={spacing.lg} background={colors.white}>
      <Flex direction="column" align="center" justify="center" style={{ minHeight: '80vh' }}>
        <CheckCircle size={80} color={colors.primary} style={{ marginBottom: spacing.lg }} />
        
        <Text variant="h2" align="center" style={{ marginBottom: spacing.md }}>
          Success!
        </Text>
        
        <Text variant="body1" align="center" style={{ marginBottom: spacing.xl }}>
          Your account has been created successfully. You'll be redirected to the home screen in a few seconds.
        </Text>
        
        <Button 
          variant="primary" 
          onClick={() => navigate('/')}
          style={{ width: '100%', maxWidth: '300px' }}
        >
          Go to Home Screen
        </Button>
      </Flex>
    </Container>
  );
};

export default Success;
