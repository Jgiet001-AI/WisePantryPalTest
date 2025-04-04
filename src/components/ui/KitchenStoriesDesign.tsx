import React, { ReactNode, useState } from 'react';
import {
  TextProps,
  ButtonProps,
  CardProps,
  ContainerProps,
  FlexProps
} from './KitchenStoriesDesignTypes';

// Modern colors inspired by Price Comparison screen with improved contrast
export const colors = {
  primary: '#4361ee', // Enhanced Indigo
  primaryLight: '#eef2ff',
  primaryDark: '#3730a3',
  primaryGradient: 'linear-gradient(135deg, #4361ee, #3a0ca3)',
  
  secondary: '#7209b7', // Enhanced Purple
  secondaryLight: '#f5f3ff',
  secondaryDark: '#5b0e91',
  secondaryGradient: 'linear-gradient(135deg, #7209b7, #560bad)',
  
  // Accent colors
  accent1: '#f72585', // Enhanced Pink
  accent2: '#06b6d4', // Teal
  accent3: '#fb8500', // Enhanced Orange
  
  // Status colors
  success: '#10b981',
  successLight: '#dcfce7',
  successDark: '#059669',
  error: '#ef4444',
  errorLight: '#fee2e2',
  errorDark: '#dc2626',
  warning: '#f59e0b',
  warningLight: '#fef9c3',
  warningDark: '#d97706',
  
  // Neutral colors
  white: '#ffffff',
  background: '#f9fafb',
  surface: '#ffffff',
  textPrimary: '#111827', // Darker for better contrast
  textSecondary: '#4b5563', // Darker for better contrast
  lightGray: '#e5e7eb',
  midGray: '#9ca3af',
  darkGray: '#4b5563',
  black: '#1A202C',
  divider: '#e5e7eb', // Border color for inputs and cards
  onPrimary: '#FFFFFF', // White text on primary
  onSecondary: '#FFFFFF', // White text on secondary
  onBackground: '#111827', // Dark text on background
  onSurface: '#1f2937', // Dark text on surface
  border: '#e5e7eb', // Border color for inputs and cards
};

// Color semantic meanings for consistent application
export const colorUsage = {
  // UI Elements
  primaryAction: colors.primary,
  secondaryAction: colors.secondary,
  tertiaryAction: colors.accent1,
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.accent2,
  
  // Backgrounds
  cardBackground: colors.white,
  pageBackground: colors.background,
  highlightBackground: `${colors.primary}15`,
  secondaryHighlight: `${colors.secondary}15`,
  accentHighlight: `${colors.accent1}15`,
  
  // Text
  primaryText: colors.textPrimary,
  secondaryText: colors.textSecondary,
  contrastText: colors.white,
  
  // Icons
  primaryIcon: colors.primary,
  secondaryIcon: colors.secondary,
  accentIcon: colors.accent1,
  infoIcon: colors.accent2,
};

// Typography settings with improved hierarchy and modern fonts
export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  h1: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h2: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
  },
  body1: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  body2: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  button: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
};

// Spacing system
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

// Shadows with more depth and subtlety
export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  card: '0 4px 12px rgba(0, 0, 0, 0.08)',
  cardHover: '0 8px 16px rgba(0, 0, 0, 0.12)',
  button: '0 2px 4px rgba(0, 0, 0, 0.1)',
  active: '0 1px 2px rgba(0, 0, 0, 0.05)',
  focus: '0 0 0 3px rgba(79, 70, 229, 0.45)',
};

// Border radius settings
export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
};

// Animation durations
export const animation = {
  fast: '0.15s',
  medium: '0.3s',
  slow: '0.5s',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

// Common components
export const Container: React.FC<ContainerProps> = ({ 
  children, 
  padding = spacing.md,
  margin = '0',
  background = colors.surface,
  style = {} 
}) => {
  return (
    <div 
      style={{ 
        padding, 
        margin,
        background,
        ...style 
      }}>
      {children}
    </div>
  );
};

// Card component with enhanced styling and hover effects
export const Card: React.FC<CardProps> = ({ 
  children, 
  padding = spacing.md, 
  margin = '0', 
  background = colors.white, 
  borderRadiusSize = borderRadius.md,
  shadow = shadows.card,
  onClick = null,
  style = {}
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => onClick && setIsHovered(true)}
      onMouseLeave={() => onClick && setIsHovered(false)}
      style={{
        padding,
        margin,
        background,
        borderRadius: borderRadiusSize,
        boxShadow: isHovered && onClick ? shadows.cardHover : shadow,
        transition: `all ${animation.medium} ${animation.easing}`,
        cursor: onClick ? 'pointer' : 'default',
        transform: isHovered && onClick ? 'translateY(-2px)' : 'translateY(0)',
        ...style
      }}
    >
      {children}
    </div>
  );
};

// Button component with enhanced accessibility and feedback states
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  onClick, 
  disabled = false,
  icon = null,
  size = 'medium',
  style = {},
  type = 'button'
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  // Size configurations
  const sizeStyles = {
    small: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: '14px',
      borderRadius: borderRadius.sm,
      height: '32px',
      minWidth: '80px',
    },
    medium: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: '15px',
      borderRadius: borderRadius.md,
      height: '40px',
      minWidth: '100px',
    },
    large: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '16px',
      borderRadius: borderRadius.md,
      height: '48px',
      minWidth: '120px',
    }
  };
  
  // Variant configurations with improved focus and active states
  const variantStyles = {
    primary: {
      background: disabled ? `${colors.primary}80` : colors.primaryGradient,
      color: colors.onPrimary,
      border: 'none',
      boxShadow: disabled ? 'none' : isPressed ? shadows.active : shadows.button,
      transform: isPressed ? 'scale(0.98)' : 'scale(1)',
    },
    secondary: {
      background: colors.white,
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
      boxShadow: disabled ? 'none' : isPressed ? shadows.active : shadows.sm,
      transform: isPressed ? 'scale(0.98)' : 'scale(1)',
    },
    text: {
      background: 'transparent',
      color: colors.primary,
      border: 'none',
      boxShadow: 'none',
      padding: sizeStyles[size].padding,
      transform: isPressed ? 'scale(0.98)' : 'scale(1)',
    },
    success: {
      background: disabled ? `${colors.success}80` : colors.success,
      color: colors.white,
      border: 'none',
      boxShadow: disabled ? 'none' : isPressed ? shadows.active : shadows.button,
      transform: isPressed ? 'scale(0.98)' : 'scale(1)',
    },
    error: {
      background: disabled ? `${colors.error}80` : colors.error,
      color: colors.white,
      border: 'none',
      boxShadow: disabled ? 'none' : isPressed ? shadows.active : shadows.button,
      transform: isPressed ? 'scale(0.98)' : 'scale(1)',
    },
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: icon ? spacing.sm : '0',
        width: fullWidth ? '100%' : 'auto',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: `all ${animation.fast} ${animation.easing}`,
        fontWeight: 600,
        outline: 'none',
        position: 'relative',
        overflow: 'hidden',
        ...style,
        type
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};

// Badge component
export const Badge: React.FC<{
  children: ReactNode;
  color?: string;
  background?: string;
  style?: React.CSSProperties;
}> = ({ children, color = colors.onPrimary, background = colors.primary, style = {} }) => {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: `${spacing.xs} ${spacing.sm}`,
        backgroundColor: background,
        color,
        borderRadius: borderRadius.xl,
        fontSize: '12px',
        fontWeight: 600,
        ...style
      }}
    >
      {children}
    </span>
  );
};

// Divider component
export const Divider: React.FC<{
  margin?: string;
  color?: string;
}> = ({ 
  margin = `${spacing.md} 0`, 
  color = colors.divider 
}) => {
  return (
    <div 
      style={{ 
        height: '1px', 
        background: color, 
        margin, 
        width: '100%' 
      }}
    />
  );
};

// Text component
export const Text: React.FC<TextProps> = ({ 
  children, 
  variant = 'body1', 
  color = colors.onBackground, 
  align = 'left',
  margin = '0',
  style = {},
  onClick
}) => {
  const getStyles = () => {
    const baseStyle = {
      color,
      textAlign: align,
      margin,
      ...style
    };

    switch(variant) {
      case 'h1':
        return { 
          ...baseStyle,
          ...typography.h1,
        };
      case 'h2':
        return {
          ...baseStyle,
          ...typography.h2,
        };
      case 'h3':
        return {
          ...baseStyle,
          ...typography.h3,
        };
      case 'body1':
        return {
          ...baseStyle,
          ...typography.body1,
        };
      case 'body2':
        return {
          ...baseStyle,
          ...typography.body2,
        };
      case 'caption':
        return {
          ...baseStyle,
          ...typography.caption,
        };
      case 'button':
        return {
          ...baseStyle,
          ...typography.button,
          textTransform: 'none' as const,
        };
      default:
        return {
          ...baseStyle,
          ...typography.body1,
        };
    }
  };

  return (
    <div style={getStyles()} onClick={onClick}>
      {children}
    </div>
  );
};

// Flex component
export const Flex: React.FC<FlexProps> = ({ 
  children, 
  direction = 'row', 
  justify = 'flex-start', 
  align = 'center',
  gap = '0',
  wrap = 'nowrap',
  margin = '0',
  padding = '0',
  style = {}
}) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: direction, 
        justifyContent: justify, 
        alignItems: align,
        gap,
        flexWrap: wrap,
        margin,
        padding,
        ...style
      }}
    >
      {children}
    </div>
  );
};

// Grid component
export const Grid: React.FC<{
  children: ReactNode;
  columns?: number;
  gap?: string;
  padding?: string;
  margin?: string;
}> = ({ 
  children, 
  columns = 2, 
  gap = spacing.md,
  padding = '0',
  margin = '0'
}) => {
  return (
    <div 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${columns}, 1fr)`, 
        gap,
        padding,
        margin,
      }}
    >
      {children}
    </div>
  );
};

// TextField component
export const TextField: React.FC<{
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  fullWidth?: boolean;
}> = ({ 
  label, 
  placeholder = '', 
  value, 
  onChange, 
  type = 'text',
  error,
  fullWidth = false
}) => {
  return (
    <div style={{ width: fullWidth ? '100%' : 'auto', marginBottom: spacing.md }}>
      {label && (
        <label style={{ 
          display: 'block', 
          marginBottom: spacing.xs,
          ...typography.body2,
          color: colors.onBackground,
        }}>
          {label}
        </label>
      )}
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: spacing.md,
          border: `1px solid ${error ? colors.error : colors.divider}`,
          borderRadius: borderRadius.md,
          fontSize: '16px',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      {error && (
        <div style={{ 
          color: colors.error, 
          fontSize: '12px',
          marginTop: spacing.xs 
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

// Avatar component
export const Avatar: React.FC<{
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  initials?: string;
}> = ({ 
  src, 
  alt = '', 
  size = 'medium',
  initials
}) => {
  const sizeMap = {
    small: '32px',
    medium: '48px',
    large: '64px',
  };

  const sizeValue = sizeMap[size];

  return (
    <div
      style={{
        width: sizeValue,
        height: sizeValue,
        borderRadius: borderRadius.full,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: src ? 'transparent' : colors.secondary,
        color: colors.onSecondary,
        fontSize: size === 'small' ? '14px' : size === 'medium' ? '18px' : '24px',
        fontWeight: 600,
      }}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        initials || '?'
      )}
    </div>
  );
};

// Mobile app container that looks like a phone
export const MobileContainer: React.FC<{
  children: ReactNode;
  withBottomNav?: boolean;
}> = ({ children, withBottomNav = true }) => {
  console.log("RENDERING MOBILE CONTAINER", new Date().toISOString());
  
  // Prevent nesting of MobileContainer components
  const childrenArray = React.Children.toArray(children);
  const hasMobileContainerChild = childrenArray.some(child => 
    React.isValidElement(child) && 
    (child.type === MobileContainer || 
     (typeof child.type === 'function' && 
      child.type.name === 'MobileContainer'))
  );
  
  if (hasMobileContainerChild) {
    console.error("Nested MobileContainer detected! This will cause layout issues.");
    // Return children without wrapping in another MobileContainer
    return <>{children}</>;
  }
  
  return (
    <div
      style={{
        width: '393px', // iPhone 16 Pro width - exact dimension
        height: '852px', // iPhone 16 Pro height - exact dimension
        margin: '0 auto',
        border: '10px solid #000',
        borderRadius: borderRadius.xl, // iPhone 16 Pro corner radius
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: colors.background,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Status Bar */}
      <div style={{ 
        height: '44px', 
        backgroundColor: '#000', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        color: 'white',
        fontSize: '14px',
        flexShrink: 0,
        zIndex: 20
      }}>
        <div>9:41</div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '4px',
        }}>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* App Content - Scrollable Area */}
      <div style={{ 
        flex: 1,
        overflowY: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Scrollable Content */}
        <div className="hide-scrollbar" style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: withBottomNav ? '70px' : 0
        }}>
          {children}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      {withBottomNav && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '70px',
          backgroundColor: 'transparent',
          zIndex: 1000
        }} id="bottom-nav-container" />
      )}
    </div>
  );
};

// Bottom navigation bar component
export const BottomNavigation: React.FC<{
  items: {
    icon: JSX.Element;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }[];
  style?: React.CSSProperties;
}> = ({ items, style = {} }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '355px',
        height: '70px',
        backgroundColor: colors.white,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
        borderTop: `1px solid ${colors.divider}`,
        ...style
      }}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            height: '100%',
            padding: `${spacing.xs} ${spacing.sm}`,
            flex: 1,
            transition: `all ${animation.fast} ${animation.easing}`,
            transform: item.isActive ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.xs,
            color: item.isActive ? colors.primary : colors.darkGray,
            transition: `all ${animation.fast} ${animation.easing}`,
            transform: item.isActive ? 'scale(1.1)' : 'scale(1)',
          }}>
            {React.cloneElement(item.icon as React.ReactElement, { 
              size: 24
            })}
          </div>
          
          <Text 
            variant="caption" 
            color={item.isActive ? colors.primary : colors.darkGray}
            align="center"
            style={{
              fontWeight: item.isActive ? 600 : 400,
              fontSize: '12px',
            }}
          >
            {item.label}
          </Text>
        </button>
      ))}
    </div>
  );
};

// Recipe card component (Kitchen Stories style)
export const RecipeCard: React.FC<{
  title: string;
  image: string;
  duration: string;
  difficulty: string;
  category: string;
  rating: number;
  author: string;
  onClick?: () => void;
}> = ({ 
  title, 
  image, 
  duration, 
  difficulty, 
  category,
  rating,
  author,
  onClick,
}) => {
  return (
    <Card 
      padding="0" 
      onClick={onClick} 
      borderRadiusSize={borderRadius.md}
      shadow={shadows.card}
    >
      <div style={{ position: 'relative' }}>
        <img 
          src={image} 
          alt={title}
          style={{ 
            width: '100%', 
            height: '180px', 
            objectFit: 'cover',
            borderTopLeftRadius: borderRadius.md,
            borderTopRightRadius: borderRadius.md,
          }}
        />
        <div style={{ 
          position: 'absolute', 
          bottom: spacing.sm, 
          left: spacing.sm, 
          display: 'flex', 
          gap: spacing.xs
        }}>
          <Badge background="rgba(0,0,0,0.7)">{duration}</Badge>
          <Badge background="rgba(0,0,0,0.7)">{difficulty}</Badge>
          <Badge background="rgba(0,0,0,0.7)">{category}</Badge>
        </div>
      </div>
      <div style={{ padding: spacing.md }}>
        <Text variant="h3" style={{ marginBottom: spacing.xs }}>{title}</Text>
        <Flex justify="space-between" align="center">
          <Text variant="body2" style={{ color: colors.darkGray }}>{author}</Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ color: i < Math.round(rating) ? colors.accent1 : colors.lightGray }}>★</div>
            ))}
          </div>
        </Flex>
      </div>
    </Card>
  );
};

// Input component
export const Input: React.FC<{
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}> = ({
  placeholder = '',
  value,
  onChange,
  type = 'text',
  icon,
  fullWidth = false,
  disabled = false,
  style = {},
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: `${spacing.xs} ${spacing.sm}`,
        backgroundColor: colors.surface,
        border: `1px solid ${colors.divider}`,
        borderRadius: borderRadius.md,
        width: fullWidth ? '100%' : 'auto',
        boxSizing: 'border-box',
        transition: `all ${animation.fast} ${animation.easing}`,
        ...style
      }}
    >
      {icon && <span style={{ display: 'flex', marginRight: spacing.xs }}>{icon}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          width: '100%',
          padding: spacing.xs,
          color: colors.onBackground,
          fontSize: typography.body1.fontSize,
          lineHeight: typography.body1.lineHeight,
        }}
      />
    </div>
  );
};

// CardContent component
export const CardContent: React.FC<{
  children: ReactNode;
  padding?: string;
  style?: React.CSSProperties;
}> = ({
  children,
  padding = spacing.md,
  style = {},
}) => {
  return (
    <div
      style={{
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Tabs and TabsContent components
export const Tabs: React.FC<{
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}> = ({
  children,
  style = {},
}) => {
  return (
    <div
      style={{
        width: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const TabsList: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
}> = ({
  children,
  style = {},
}) => {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: `1px solid ${colors.divider}`,
        marginBottom: spacing.md,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<{
  children: ReactNode;
  value: string;
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}> = ({
  children,
  active = false,
  onClick,
  style = {},
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: `${spacing.sm} ${spacing.md}`,
        background: 'transparent',
        border: 'none',
        borderBottom: active ? `2px solid ${colors.primary}` : '2px solid transparent',
        color: active ? colors.primary : colors.darkGray,
        fontWeight: active ? 600 : 400,
        cursor: 'pointer',
        transition: `all ${animation.fast} ${animation.easing}`,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{
  children: ReactNode;
  value: string;
  active?: boolean;
  style?: React.CSSProperties;
}> = ({
  children,
  active = false,
  style = {},
}) => {
  if (!active) return null;
  
  return (
    <div
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// CardHeader component
export const CardHeader: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
}> = ({
  children,
  style = {},
}) => {
  return (
    <div
      style={{
        padding: `${spacing.md} ${spacing.md} 0 ${spacing.md}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// CardTitle component
export const CardTitle: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
}> = ({
  children,
  style = {},
}) => {
  return (
    <Text 
      variant="h3" 
      color={colors.textPrimary}
      style={{
        marginBottom: spacing.xs,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

// Checkbox component
export const Checkbox: React.FC<{
  checked?: boolean;
  onChange?: () => void;
  style?: React.CSSProperties;
}> = ({
  checked = false,
  onChange,
  style = {},
}) => {
  return (
    <div
      onClick={onChange}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: borderRadius.sm,
        background: checked ? colors.primary : colors.white,
        border: `1px solid ${checked ? colors.primary : colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: `all ${animation.fast} ${animation.easing}`,
        ...style,
      }}
    >
      {checked && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke={colors.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
};

// Dialog components
export const Dialog: React.FC<{
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}> = ({
  children,
  open = false,
  onOpenChange,
}) => {
  if (!open) return null;
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onOpenChange?.(false);
        }
      }}
    >
      {children}
    </div>
  );
};

export const DialogContent: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
}> = ({
  children,
  style = {},
}) => {
  return (
    <div
      style={{
        background: colors.white,
        borderRadius: borderRadius.lg,
        boxShadow: shadows.lg,
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const DialogHeader: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
}> = ({
  children,
  style = {},
}) => {
  return (
    <div
      style={{
        padding: spacing.md,
        borderBottom: `1px solid ${colors.border}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const DialogTitle: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
}> = ({
  children,
  style = {},
}) => {
  return (
    <Text 
      variant="h3" 
      color={colors.textPrimary}
      style={{
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

// Select components
export const Select: React.FC<{
  children: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}> = ({
  children,
  value,
  onChange,
  style = {},
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  
  return (
    <div
      style={{
        position: 'relative',
        ...style,
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            value: selectedValue,
            onChange: (newValue: string) => {
              setSelectedValue(newValue);
              onChange?.(newValue);
              setOpen(false);
            },
            open,
            setOpen,
          });
        }
        return child;
      })}
    </div>
  );
};

export const SelectTrigger: React.FC<{
  children: ReactNode;
  value?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  style?: React.CSSProperties;
}> = ({
  children,
  open,
  setOpen,
  style = {},
}) => {
  return (
    <div
      onClick={() => setOpen?.(!open)}
      style={{
        padding: `${spacing.sm} ${spacing.md}`,
        background: colors.white,
        border: `1px solid ${colors.border}`,
        borderRadius: borderRadius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={open ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"} stroke={colors.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export const SelectContent: React.FC<{
  children: ReactNode;
  open?: boolean;
  style?: React.CSSProperties;
}> = ({
  children,
  open,
  style = {},
}) => {
  if (!open) return null;
  
  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: spacing.xs,
        background: colors.white,
        border: `1px solid ${colors.border}`,
        borderRadius: borderRadius.md,
        boxShadow: shadows.md,
        zIndex: 10,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const SelectValue: React.FC<{
  placeholder?: string;
  value?: string;
}> = ({
  placeholder,
  value,
}) => {
  return (
    <div>
      {value || placeholder}
    </div>
  );
};

export const SelectItem: React.FC<{
  children: ReactNode;
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}> = ({
  children,
  value,
  onChange,
  style = {},
}) => {
  return (
    <div
      onClick={() => onChange?.(value)}
      style={{
        padding: `${spacing.sm} ${spacing.md}`,
        cursor: 'pointer',
        transition: `background ${animation.fast} ${animation.easing}`,
        '&:hover': {
          background: colors.backgroundLight,
        },
        ...style,
      }}
    >
      {children}
    </div>
  );
};
