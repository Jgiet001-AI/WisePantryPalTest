import React, { useState, useEffect } from 'react';
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
import { Mail, Lock, Facebook, ArrowRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import FormField from '../ui/FormField';
import BiometricAnimation from '../ui/BiometricAnimation';
import PageTransition from '../ui/PageTransition';

interface LoginError {
  email?: string;
  password?: string;
  general?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { login, socialLogin, biometricLogin, isLoading, error: authError } = useAuth();
  const { isDarkMode } = useTheme();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<LoginError>({});
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [biometricState, setBiometricState] = useState<'idle' | 'authenticating' | 'success' | 'error'>('idle');
  const [biometricType, setBiometricType] = useState<'fingerprint' | 'face'>('fingerprint');
  const [validFields, setValidFields] = useState<{email: boolean, password: boolean}>({email: false, password: false});

  // Check if biometric auth is available
  useEffect(() => {
    const checkBiometricAvailability = () => {
      // Check if browser supports WebAuthn
      if (window.PublicKeyCredential) {
        // On iOS, prefer Face ID
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
          setBiometricType('face');
        }
      }
    };
    
    checkBiometricAvailability();
  }, []);
  
  // Check for remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
      validateEmail(rememberedEmail);
    }
  }, []);

  const validateEmail = (value: string): boolean => {
    if (!value) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      setValidFields(prev => ({ ...prev, email: false }));
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      setValidFields(prev => ({ ...prev, email: false }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, email: undefined }));
    setValidFields(prev => ({ ...prev, email: true }));
    return true;
  };

  const validatePassword = (value: string): boolean => {
    if (!value) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      setValidFields(prev => ({ ...prev, password: false }));
      return false;
    }
    
    if (value.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
      setValidFields(prev => ({ ...prev, password: false }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, password: undefined }));
    setValidFields(prev => ({ ...prev, password: true }));
    return true;
  };

  const validateForm = (): boolean => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    return isEmailValid && isPasswordValid;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (errors.email) {
      validateEmail(newEmail);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (errors.password) {
      validatePassword(newPassword);
    }
  };

  const handleEmailBlur = () => {
    validateEmail(email);
  };

  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setErrors({});
    
    const success = await login(email, password);
    
    if (success) {
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      navigate('/');
    } else if (authError) {
      setErrors({
        general: authError
      });
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setErrors({});
    
    const success = await socialLogin(provider);
    
    if (success) {
      navigate('/');
    }
  };

  const handleBiometricLogin = async () => {
    setErrors({});
    setBiometricState('authenticating');
    
    try {
      const success = await biometricLogin();
      
      if (success) {
        setBiometricState('success');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setBiometricState('error');
        setTimeout(() => {
          setBiometricState('idle');
        }, 2000);
        setErrors({
          general: 'Biometric authentication failed. Please try again or use another method.'
        });
      }
    } catch (error) {
      setBiometricState('error');
      setTimeout(() => {
        setBiometricState('idle');
      }, 2000);
      setErrors({
        general: 'Biometric authentication failed. Please try again or use another method.'
      });
    }
  };

  const getBackgroundColor = () => {
    return isDarkMode ? 'var(--color-background)' : colors.white;
  };

  const getTextColor = () => {
    return isDarkMode ? 'var(--color-text-primary)' : colors.darkGray;
  };

  const getCardBackground = () => {
    return isDarkMode ? 'var(--color-surface)' : colors.white;
  };

  return (
    <PageTransition>
      <Container style={{ 
        padding: spacing.lg, 
        maxWidth: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: getBackgroundColor()
      }}>
        <Card 
          padding={spacing.lg}
          shadow={shadows.md}
          style={{ 
            width: '100%',
            backgroundColor: getCardBackground(),
            color: getTextColor()
          }}
        >
          <Text variant="h1" align="center" margin={`0 0 ${spacing.lg}`} style={{ color: getTextColor() }}>Login</Text>
          
          {(errors.general || authError) && (
            <Card 
              background={isDarkMode ? 'rgba(220, 38, 38, 0.1)' : colors.errorLight}
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
              <FormField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="your.email@example.com"
                error={errors.email}
                icon={<Mail size={16} />}
                isValid={validFields.email}
                autoComplete="email"
                required
              />
              
              <FormField
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                placeholder="••••••••"
                error={errors.password}
                icon={<Lock size={16} />}
                isValid={validFields.password}
                autoComplete="current-password"
                required
              />
              
              <Flex justify="space-between" align="center" style={{ marginTop: spacing.xs }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: getTextColor()
                }}>
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={() => setRememberMe(!rememberMe)}
                    style={{ marginRight: spacing.xs }}
                  />
                  Remember me
                </label>
                
                <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                  <Text 
                    variant="body2" 
                    color={colors.primary} 
                    style={{ cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </Text>
                </Link>
              </Flex>
              
              <Button 
                type="submit"
                fullWidth
                disabled={isLoading}
                style={{ marginTop: spacing.md }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              
              {/* Biometric Login Option */}
              {window.PublicKeyCredential && (
                <div style={{ 
                  marginTop: spacing.md, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center' 
                }}>
                  <Text 
                    variant="body2" 
                    align="center" 
                    margin={`0 0 ${spacing.sm}`}
                    style={{ color: getTextColor() }}
                  >
                    Or login with biometrics
                  </Text>
                  
                  <div 
                    onClick={handleBiometricLogin}
                    style={{ 
                      cursor: 'pointer',
                      padding: spacing.sm,
                      borderRadius: '50%',
                      backgroundColor: isDarkMode ? 'rgba(79, 70, 229, 0.1)' : colors.primaryLight,
                      display: 'inline-flex',
                      transition: 'transform 0.2s ease, background-color 0.2s ease'
                    }}
                  >
                    <BiometricAnimation 
                      type={biometricType}
                      size={48}
                      isAuthenticating={biometricState === 'authenticating'}
                      isSuccess={biometricState === 'success'}
                      isError={biometricState === 'error'}
                    />
                  </div>
                </div>
              )}
              
              {/* Social Login Options */}
              <div style={{ marginTop: spacing.lg }}>
                <Text 
                  variant="body2" 
                  align="center" 
                  margin={`0 0 ${spacing.md}`}
                  style={{ color: getTextColor() }}
                >
                  Or continue with
                </Text>
                
                <Flex justify="center" gap={spacing.md}>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('google')}
                    style={{ 
                      padding: spacing.md,
                      minWidth: '120px',
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : colors.white,
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : colors.lightGray
                    }}
                  >
                    <Flex align="center" gap={spacing.sm}>
                      <FcGoogle size={20} />
                      <span>Google</span>
                    </Flex>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('facebook')}
                    style={{ 
                      padding: spacing.md,
                      minWidth: '120px',
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : colors.white,
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : colors.lightGray
                    }}
                  >
                    <Flex align="center" gap={spacing.sm}>
                      <Facebook size={20} color="#1877F2" />
                      <span>Facebook</span>
                    </Flex>
                  </Button>
                </Flex>
              </div>
              
              {/* Sign Up Link */}
              <Flex justify="center" style={{ marginTop: spacing.lg }}>
                <Text 
                  variant="body2" 
                  style={{ color: getTextColor() }}
                >
                  Don't have an account?{' '}
                  <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <Text 
                      color={colors.primary} 
                      style={{ 
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Sign up
                      <ArrowRight size={16} />
                    </Text>
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </form>
        </Card>
      </Container>
    </PageTransition>
  );
}
