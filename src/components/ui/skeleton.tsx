import React from 'react';
import { colors, borderRadius, spacing } from './KitchenStoriesDesign';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'list-item';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

function Skeleton({
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  style,
  ...props
}: SkeletonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return {
          width: width || '100%',
          height: height || '1em',
          borderRadius: borderRadius.sm,
        };
      case 'circular':
        return {
          width: width || '40px',
          height: height || '40px',
          borderRadius: '50%',
        };
      case 'card':
        return {
          width: width || '100%',
          height: height || '200px',
          borderRadius: borderRadius.md,
        };
      case 'list-item':
        return {
          width: width || '100%',
          height: height || '60px',
          borderRadius: borderRadius.sm,
          display: 'flex',
          alignItems: 'center',
          padding: spacing.sm,
        };
      case 'rectangular':
      default:
        return {
          width: width || '100%',
          height: height || '100px',
          borderRadius: borderRadius.sm,
        };
    }
  };

  const getAnimationKeyframes = () => {
    if (animation === 'pulse') {
      return `
        @keyframes skeleton-pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.8; }
          100% { opacity: 0.6; }
        }
      `;
    }
    return '';
  };

  const getAnimationStyles = () => {
    switch (animation) {
      case 'pulse':
        return {
          animation: 'skeleton-pulse 1.5s ease-in-out 0.5s infinite',
        };
      case 'wave':
        return {
          position: 'relative' as const,
          overflow: 'hidden',
        };
      case 'none':
      default:
        return {};
    }
  };

  // Add wave animation with pseudo-element
  React.useEffect(() => {
    if (animation === 'wave') {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes skeleton-wave {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        
        .skeleton-wave::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(90deg, transparent, ${colors.lightGray}, transparent);
          animation: skeleton-wave 1.6s linear 0.5s infinite;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [animation]);

  // Add pulse animation
  React.useEffect(() => {
    if (animation === 'pulse') {
      const style = document.createElement('style');
      style.textContent = getAnimationKeyframes();
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [animation]);

  return (
    <div
      className={animation === 'wave' ? 'skeleton-wave' : ''}
      style={{
        backgroundColor: `${colors.lightGray}`,
        ...getVariantStyles(),
        ...getAnimationStyles(),
        ...style,
      }}
      {...props}
    />
  );
}

export { Skeleton };
