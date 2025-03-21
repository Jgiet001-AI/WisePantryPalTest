import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Text, Button, Flex, Input, colors, spacing } from '../ui/KitchenStoriesDesign';

const Setup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // In a real app, you would handle authentication here
    // For now, we'll just navigate to the home screen
    navigate('/');
  };

  return (
    <Container padding={spacing.lg} background={colors.white}>
      <Flex direction="column" align="center" justify="center" style={{ minHeight: '80vh' }}>
        <Text variant="h2" align="center" style={{ marginBottom: spacing.lg }}>
          Create Your Account
        </Text>
        
        {error && (
          <Text variant="body2" style={{ color: colors.accent1, marginBottom: spacing.md }}>
            {error}
          </Text>
        )}
        
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
          <Flex direction="column" style={{ gap: spacing.md, marginBottom: spacing.lg }}>
            <div>
              <Text variant="body2" style={{ marginBottom: spacing.xs }}>Email</Text>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ width: '100%' }}
              />
            </div>
            
            <div>
              <Text variant="body2" style={{ marginBottom: spacing.xs }}>Password</Text>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                style={{ width: '100%' }}
              />
            </div>
            
            <div>
              <Text variant="body2" style={{ marginBottom: spacing.xs }}>Confirm Password</Text>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                style={{ width: '100%' }}
              />
            </div>
          </Flex>
          
          <Button 
            variant="primary" 
            onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
            style={{ width: '100%', marginBottom: spacing.md }}
            icon={null}
          >
            Create Account
          </Button>
          
          <Button 
            variant="text" 
            onClick={() => navigate('/welcome')}
            style={{ width: '100%' }}
            icon={null}
          >
            Back to Welcome
          </Button>
        </form>
      </Flex>
    </Container>
  );
};

export default Setup;
