import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RobotAnimatedProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showShadow?: boolean;
  pulse?: boolean;
  float?: boolean;
}

export function RobotAnimated({
  size = 'lg',
  className,
  showShadow = true,
  pulse = true,
  float = true,
}: RobotAnimatedProps) {
  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
    xl: 'h-40 w-40',
  };

  return (
    <div className={cn('relative flex flex-col items-center justify-center', className)}>
      {showShadow && (
        <motion.div
          className="absolute bottom-0 bg-orange-900/20 rounded-full blur-md z-0"
          style={{ width: '70%', height: '10%' }}
          animate={{
            width: ['70%', '60%', '70%'],
            opacity: [0.2, 0.15, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
      
      <motion.div
        className="z-10"
        animate={
          float
            ? {
                y: [0, -10, 0],
              }
            : undefined
        }
        transition={
          float
            ? {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
      >
        <motion.div
          className={cn(sizeClasses[size], 'relative')}
          animate={
            pulse
              ? {
                  scale: [1, 1.05, 1],
                }
              : undefined
          }
          transition={
            pulse
              ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : undefined
          }
        >
          <img 
            src="/wise-pantry-pal-logo.svg" 
            alt="WisePantryPal Robot" 
            className="w-full h-full"
            style={{
              filter: 'drop-shadow(0 4px 6px rgba(249, 115, 22, 0.3))',
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Animated rays around the robot */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-orange-200 rounded-full origin-bottom"
            style={{
              height: '40%',
              rotate: `${i * 45}deg`,
              transformOrigin: 'center 140%',
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              height: ['40%', '45%', '40%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
