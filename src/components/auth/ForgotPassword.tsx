import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Button,
  Card,
  colors,
  spacing,
  shadows,
  borderRadius
} from '../ui/KitchenStoriesDesign';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ForgotPasswordError {
  email?: string;
  general?: string;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword, isLoading, error: authError } = useAuth();
  
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<ForgotPasswordError>({});
  const [success, setSuccess] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: ForgotPasswordError = {};
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({
        ...errors,
        email: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const success = await resetPassword(email);
    
    if (success) {
      setSuccess(true);
    }
  };

  return (
    <Container style={{ 
      padding: spacing.lg, 
      maxWidth: '100%', 
      height: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <Card 
        padding={spacing.lg}
        shadow={shadows.md}
        style={{ width: '100%' }}
      >
        <Text variant="h1" align="center" margin={`0 0 ${spacing.lg}`}>Forgot Password</Text>
        
        {!success ? (
          <>
            {(errors.general || authError) && (
              <Card 
                background={colors.errorLight}
                padding={spacing.md}
                margin={`0 0 ${spacing.md}`}
                borderRadiusSize={borderRadius.md}
              >
                <Flex align="center" gap={spacing.sm}>
                  <Text color={colors.error}>{errors.general || authError}</Text>
                </Flex>
              </Card>
            )}
            
            <Text variant="body1" align="center" margin={`0 0 ${spacing.md}`}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
            
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap={spacing.md}>
                <div>
                  <Text variant="body1" margin={`0 0 ${spacing.xs}`}>Email</Text>
                  <div style={{ 
                    position: 'relative',
                    border: `1px solid ${errors.email ? colors.error : colors.border}`,
                    borderRadius: borderRadius.sm,
                    padding: `${spacing.sm} ${spacing.md}`,
                    paddingLeft: '40px',
                    background: colors.white
                  }}>
                    <Mail 
                      size={16} 
                      style={{ 
                        position: 'absolute',
                        left: spacing.sm,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: errors.email ? colors.error : colors.darkGray
                      }} 
                    />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  {errors.email && (
                    <Text variant="caption" color={colors.error} margin={`${spacing.xs} 0 0`}>
                      {errors.email}
                    </Text>
                  )}
                </div>
                
                <Button 
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  style={{ 
                    background: colors.primary,
                    color: colors.white,
                    marginTop: spacing.sm,
                    borderRadius: borderRadius.sm
                  }}
                >
                  {isLoading ? 'Sending...' : 'Reset Password'}
                </Button>
              </Flex>
            </form>
          </>
        ) : (
          <Card 
            background={colors.successLight}
            padding={spacing.md}
            margin={`0 0 ${spacing.md}`}
            borderRadiusSize={borderRadius.md}
          >
            <Flex direction="column" align="center" gap={spacing.md}>
              <CheckCircle size={48} color={colors.success} />
              <Text variant="h3" align="center" color={colors.success}>
                Password Reset Email Sent
              </Text>
              <Text variant="body1" align="center">
                We've sent an email to <strong>{email}</strong> with instructions to reset your password.
              </Text>
            </Flex>
          </Card>
        )}
        
        <Flex justify="center" style={{ marginTop: spacing.lg }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Flex align="center" gap={spacing.xs}>
              <ArrowLeft size={16} color={colors.primary} />
              <Text 
                variant="body1" 
                color={colors.primary} 
                style={{ cursor: 'pointer' }}
              >
                Back to Login
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Card>
      
      <style>
        {`
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        `}
      </style>
    </Container>
  );
}
