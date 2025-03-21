import React, { ReactNode } from 'react';

// Modern colors representing health, trust, and well-being
export const colors = {
  primary: '#2AC28E', // Fresh mint green (health & well-being)
  secondary: '#4E67EB', // Vibrant blue (trust)
  accent: '#FFC857', // Sunshine yellow (vitality & well-being)
  success: '#38B259', // Green success (health)
  error: '#FF5C5C', // Soft red error
  warning: '#FFB347', // Soft orange warning
  info: '#6CBEE7', // Light blue info (trust)
  background: '#FFFFFF', // White background
  surface: '#F8FBFD', // Very light blue-tinted surface
  onPrimary: '#FFFFFF', // White text on primary
  onSecondary: '#FFFFFF', // White text on secondary
  onBackground: '#2F3E56', // Dark blue-gray text on background
  onSurface: '#2F3E56', // Dark blue-gray text on surface
  divider: '#EDF2F7', // Light blue-gray divider
  // Additional colors
  lightGray: '#F0F7FF',
  midGray: '#A0AEC0',
  darkGray: '#4A5568',
  black: '#1A202C',
  white: '#FFFFFF',
  purple: '#9F7AEA', // Purple for accent elements
  teal: '#38B2AC', // Teal for accent elements
  coral: '#FF6B81', // Coral for energy and vibrance
};

// Typography styles with more modern proportions
export const typography = {
  h1: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: '36px',
    letterSpacing: '-0.5px',
  },
  h2: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '32px',
    letterSpacing: '-0.3px',
  },
  h3: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '28px',
    letterSpacing: '-0.2px',
  },
  body1: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
  },
  body2: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
  },
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0.2px',
  },
  button: {
    fontSize: '15px',
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: '0.2px',
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

// Border radius - more rounded corners for a friendlier look
export const borderRadius = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  circle: '50%',
};

// Shadows with softer edges
export const shadows = {
  sm: '0 2px 8px rgba(0,0,0,0.05)',
  md: '0 4px 12px rgba(0,0,0,0.07)',
  lg: '0 8px 20px rgba(0,0,0,0.08)',
  xl: '0 12px 28px rgba(0,0,0,0.09)',
  xxl: '0 20px 32px rgba(0,0,0,0.1)',
  hover: '0 6px 16px rgba(46, 105, 255, 0.15)',
  card: '0 4px 16px rgba(17, 34, 64, 0.07)',
};

// Animation durations
export const animation = {
  fast: '0.15s',
  medium: '0.3s',
  slow: '0.5s',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

// Common components
export const Container: React.FC<{
  children: ReactNode;
  padding?: string;
  maxWidth?: string;
  background?: string;
  style?: React.CSSProperties;
}> = ({ children, padding = spacing.md, maxWidth = '100%', background = colors.background, style = {} }) => {
  return (
    <div 
      style={{ 
        padding, 
        maxWidth, 
        margin: '0 auto', 
        background,
        height: '100%',
        boxSizing: 'border-box',
        transition: `all ${animation.medium} ${animation.easing}`,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export const Card: React.FC<{
  children: ReactNode;
  padding?: string;
  margin?: string;
  background?: string;
  borderRadiusSize?: string;
  shadow?: string;
  onClick?: () => void;
}> = ({ 
  children, 
  padding = spacing.md, 
  margin = '0', 
  background = colors.background, 
  borderRadiusSize = borderRadius.md,
  shadow = shadows.card,
  onClick
}) => {
  return (
    <div 
      style={{ 
        padding, 
        margin, 
        background, 
        borderRadius: borderRadiusSize,
        boxShadow: shadow,
        cursor: onClick ? 'pointer' : 'default',
        transition: `all ${animation.medium} ${animation.easing}`,
        border: `1px solid ${colors.divider}`,
        overflow: 'hidden',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const Button: React.FC<{
  children: ReactNode;
  variant?: 'text' | 'primary' | 'secondary' | 'outlined' | 'filled';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  onClick, 
  disabled = false,
  icon,
  size = 'medium',
  style = {}
}) => {
  const getStyles = () => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      width: fullWidth ? '100%' : 'auto',
      border: 'none',
      borderRadius: borderRadius.md,
      fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.7 : 1,
      transition: `all ${animation.fast} ${animation.easing}`,
      ...style
    };

    const sizeStyles = {
      small: {
        padding: `${spacing.xs} ${spacing.sm}`,
        fontSize: '14px',
        borderRadius: borderRadius.sm,
      },
      medium: {
        padding: `${spacing.sm} ${spacing.md}`,
        fontSize: '15px',
        borderRadius: borderRadius.md,
      },
      large: {
        padding: `${spacing.md} ${spacing.lg}`,
        fontSize: '16px',
        borderRadius: borderRadius.md,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: colors.primary,
        color: colors.onPrimary,
      },
      secondary: {
        backgroundColor: colors.secondary,
        color: colors.onSecondary,
      },
      outlined: {
        backgroundColor: 'transparent',
        color: colors.primary,
        border: `1px solid ${colors.primary}`,
      },
      text: {
        backgroundColor: 'transparent',
        color: colors.primary,
        padding: `${spacing.xs} ${spacing.sm}`,
      },
      filled: {
        backgroundColor: colors.primary,
        color: colors.onPrimary,
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <button 
      style={getStyles()} 
      onClick={onClick} 
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

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

export const Text: React.FC<{
  children: ReactNode;
  variant?: keyof typeof typography;
  color?: string;
  align?: 'left' | 'center' | 'right';
  margin?: string;
  style?: React.CSSProperties;
}> = ({ 
  children, 
  variant = 'body1', 
  color = colors.onBackground, 
  align = 'left',
  margin = '0',
  style = {}
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
    <div style={getStyles()}>
      {children}
    </div>
  );
};

export const Flex: React.FC<{
  children: ReactNode;
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  gap?: string;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  style?: React.CSSProperties;
}> = ({ 
  children, 
  direction = 'row', 
  justify = 'flex-start', 
  align = 'center',
  gap = '0',
  wrap = 'nowrap',
  width = 'auto',
  height = 'auto',
  padding = '0',
  margin = '0',
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
        width,
        height,
        padding,
        margin,
        ...style
      }}
    >
      {children}
    </div>
  );
};

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
        borderRadius: borderRadius.circle,
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
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '375px',
        height: '812px', 
        margin: '0 auto',
        border: '10px solid #222',
        borderRadius: '36px',
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
        backgroundColor: '#222', 
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
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ color: i < Math.round(rating) ? colors.accent : colors.lightGray }}>★</div>
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
        ...style,
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
