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
import { User, Mail, Lock, Eye, EyeOff, Fingerprint, Check } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface SignupError {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const { signup, socialLogin, isLoading, error: authError } = useAuth();
  
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<SignupError>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: SignupError = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when user starts typing
    if (errors[name as keyof SignupError]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const success = await signup(formData.name, formData.email, formData.password);
    
    if (success) {
      // Redirect to onboarding flow for new users
      navigate('/onboarding/1');
    }
  };

  const handleSocialSignup = async (provider: string) => {
    const success = await socialLogin(provider);
    
    if (success) {
      // Redirect to onboarding flow for new users
      navigate('/onboarding/1');
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
        <Text variant="h1" align="center" margin={`0 0 ${spacing.lg}`}>Sign Up</Text>
        
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
        
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={spacing.md}>
            <div>
              <Text variant="body1" margin={`0 0 ${spacing.xs}`}>Full Name</Text>
              <div style={{ 
                position: 'relative',
                border: `1px solid ${errors.name ? colors.error : colors.border}`,
                borderRadius: borderRadius.sm,
                padding: `${spacing.sm} ${spacing.md}`,
                paddingLeft: '40px',
                background: colors.white
              }}>
                <User 
                  size={16} 
                  style={{ 
                    position: 'absolute',
                    left: spacing.sm,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: errors.name ? colors.error : colors.darkGray
                  }} 
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '16px'
                  }}
                />
              </div>
              {errors.name && (
                <Text variant="caption" color={colors.error} margin={`${spacing.xs} 0 0`}>
                  {errors.name}
                </Text>
              )}
            </div>
            
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
                  value={formData.email}
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
            
            <div>
              <Text variant="body1" margin={`0 0 ${spacing.xs}`}>Password</Text>
              <div style={{ 
                position: 'relative',
                border: `1px solid ${errors.password ? colors.error : colors.border}`,
                borderRadius: borderRadius.sm,
                padding: `${spacing.sm} ${spacing.md}`,
                paddingLeft: '40px',
                paddingRight: '40px',
                background: colors.white
              }}>
                <Lock 
                  size={16} 
                  style={{ 
                    position: 'absolute',
                    left: spacing.sm,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: errors.password ? colors.error : colors.darkGray
                  }} 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '16px'
                  }}
                />
                <div 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    position: 'absolute',
                    right: spacing.sm,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: colors.darkGray
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              </div>
              {errors.password && (
                <Text variant="caption" color={colors.error} margin={`${spacing.xs} 0 0`}>
                  {errors.password}
                </Text>
              )}
            </div>
            
            <div>
              <Text variant="body1" margin={`0 0 ${spacing.xs}`}>Confirm Password</Text>
              <div style={{ 
                position: 'relative',
                border: `1px solid ${errors.confirmPassword ? colors.error : colors.border}`,
                borderRadius: borderRadius.sm,
                padding: `${spacing.sm} ${spacing.md}`,
                paddingLeft: '40px',
                paddingRight: '40px',
                background: colors.white
              }}>
                <Lock 
                  size={16} 
                  style={{ 
                    position: 'absolute',
                    left: spacing.sm,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: errors.confirmPassword ? colors.error : colors.darkGray
                  }} 
                />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '16px'
                  }}
                />
                <div 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ 
                    position: 'absolute',
                    right: spacing.sm,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: colors.darkGray
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              </div>
              {errors.confirmPassword && (
                <Text variant="caption" color={colors.error} margin={`${spacing.xs} 0 0`}>
                  {errors.confirmPassword}
                </Text>
              )}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.sm }}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                style={{ 
                  marginTop: '4px',
                  accentColor: colors.primary
                }}
              />
              <Text variant="body2">
                I agree to the <span style={{ color: colors.primary, cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: colors.primary, cursor: 'pointer' }}>Privacy Policy</span>
              </Text>
            </div>
            {errors.agreeToTerms && (
              <Text variant="caption" color={colors.error} margin={`${spacing.xs} 0 0`}>
                {errors.agreeToTerms}
              </Text>
            )}
            
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
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </Flex>
        </form>
        
        <div style={{ 
          margin: `${spacing.lg} 0`, 
          position: 'relative', 
          textAlign: 'center' 
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: 0, 
            right: 0, 
            height: '1px', 
            backgroundColor: colors.lightGray 
          }} />
          <Text 
            variant="body2" 
            style={{ 
              display: 'inline-block', 
              padding: `0 ${spacing.sm}`, 
              backgroundColor: colors.white, 
              position: 'relative' 
            }}
          >
            OR
          </Text>
        </div>
        
        <Flex direction="column" gap={spacing.md}>
          <Button 
            variant="outline"
            fullWidth
            onClick={() => handleSocialSignup('google')}
            icon={<FcGoogle size={20} />}
            style={{ 
              borderColor: colors.border,
              color: colors.textPrimary,
              borderRadius: borderRadius.sm
            }}
          >
            Continue with Google
          </Button>
          
          <Button 
            variant="outline"
            fullWidth
            onClick={() => handleSocialSignup('facebook')}
            icon={<FaFacebook size={20} color="#1877F2" />}
            style={{ 
              borderColor: colors.border,
              color: colors.textPrimary,
              borderRadius: borderRadius.sm
            }}
          >
            Continue with Facebook
          </Button>
        </Flex>
        
        <Flex justify="center" style={{ marginTop: spacing.lg }}>
          <Text variant="body1">
            Already have an account?{' '}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Text 
                variant="body1" 
                color={colors.primary} 
                style={{ display: 'inline', cursor: 'pointer' }}
              >
                Login
              </Text>
            </Link>
          </Text>
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
        `}
      </style>
    </Container>
  );
}
