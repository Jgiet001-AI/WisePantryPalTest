import React, { useState, useEffect } from 'react';
import { Fingerprint, Scan } from 'lucide-react';
import { colors, spacing } from './KitchenStoriesDesign';

interface BiometricAnimationProps {
  type: 'fingerprint' | 'face';
  size?: number;
  color?: string;
  onAnimationComplete?: () => void;
  isAuthenticating?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

const BiometricAnimation: React.FC<BiometricAnimationProps> = ({
  type,
  size = 64,
  color = colors.primary,
  onAnimationComplete,
  isAuthenticating = false,
  isSuccess = false,
  isError = false
}) => {
  const [animationState, setAnimationState] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    if (isAuthenticating) {
      setAnimationState('scanning');
    } else if (isSuccess) {
      setAnimationState('success');
      const timer = setTimeout(() => {
        if (onAnimationComplete) onAnimationComplete();
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isError) {
      setAnimationState('error');
    } else {
      setAnimationState('idle');
    }
  }, [isAuthenticating, isSuccess, isError, onAnimationComplete]);

  const getColor = () => {
    switch (animationState) {
      case 'scanning':
        return colors.primary;
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      default:
        return color;
    }
  };

  const renderFingerprintAnimation = () => {
    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        <Fingerprint 
          size={size} 
          color={getColor()} 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: animationState === 'idle' ? 0.7 : 1,
            transition: 'color 0.3s ease, opacity 0.3s ease',
          }} 
        />
        
        {animationState === 'scanning' && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: `2px solid ${colors.primary}`,
            animation: 'pulse 1.5s infinite'
          }} />
        )}
        
        <style>
          {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
        `}
        </style>
      </div>
    );
  };

  const renderFaceAnimation = () => {
    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        <Scan 
          size={size} 
          color={getColor()} 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: animationState === 'idle' ? 0.7 : 1,
            transition: 'color 0.3s ease, opacity 0.3s ease',
          }} 
        />
        
        {animationState === 'scanning' && (
          <>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '2px',
              backgroundColor: colors.primary,
              animation: 'scanVertical 2s infinite'
            }} />
            
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '2px',
              height: '100%',
              backgroundColor: colors.primary,
              animation: 'scanHorizontal 2s infinite'
            }} />
          </>
        )}
        
        <style>
          {`
          @keyframes scanVertical {
            0% {
              transform: translateY(0);
              opacity: 0.8;
            }
            50% {
              transform: translateY(${size}px);
              opacity: 0.8;
            }
            51% {
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 0;
            }
          }
          
          @keyframes scanHorizontal {
            0% {
              transform: translateX(0);
              opacity: 0.8;
            }
            50% {
              transform: translateX(${size}px);
              opacity: 0.8;
            }
            51% {
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 0;
            }
          }
        `}
        </style>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: spacing.md }}>
      {type === 'fingerprint' ? renderFingerprintAnimation() : renderFaceAnimation()}
    </div>
  );
};

export default BiometricAnimation;
