import React from 'react';
import { motion } from 'framer-motion';
import { RobotAnimated } from './robot-animated';

interface LoadingScreenProps {
  text?: string;
  showProgress?: boolean;
  progress?: number;
  className?: string;
}

export function LoadingScreen({
  text = 'Loading...',
  showProgress = false,
  progress = 0,
  className,
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 z-50">
      <div className="flex flex-col items-center max-w-sm mx-auto px-4">
        <div className="mb-8">
          <RobotAnimated size="xl" />
        </div>
        
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          WisePantryPal
        </motion.h1>
        
        <motion.p
          className="text-amber-700 mb-6 text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {text}
        </motion.p>
        
        {showProgress && (
          <motion.div 
            className="w-full max-w-xs bg-white/50 rounded-full h-3 overflow-hidden shadow-inner"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        )}
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M20,60 Q20,20 60,20 Q100,20 100,60 Q100,100 60,100 Q20,100 20,60" 
                  stroke="#F97316" strokeWidth="2" fill="none" />
          </svg>
        </div>
        
        <div className="absolute bottom-10 right-10 opacity-20">
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
            <circle cx="75" cy="75" r="50" stroke="#F97316" strokeWidth="2" fill="none" />
            <circle cx="75" cy="75" r="30" stroke="#F97316" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
}
