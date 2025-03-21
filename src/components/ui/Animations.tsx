import React, { useState, useEffect } from 'react';
import { animation } from './KitchenStoriesDesign';

// Animation keyframes
const setupAnimations = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    @keyframes slideInUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInDown {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInLeft {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
      from { transform: translateX(20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes success {
      0% { transform: scale(0.8); opacity: 0; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes likeAnimation {
      0% { transform: scale(1); }
      25% { transform: scale(1.2); }
      50% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
    
    .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }
    .animate-fadeOut { animation: fadeOut 0.3s ease forwards; }
    .animate-slideInUp { animation: slideInUp 0.3s ease forwards; }
    .animate-slideInDown { animation: slideInDown 0.3s ease forwards; }
    .animate-slideInLeft { animation: slideInLeft 0.3s ease forwards; }
    .animate-slideInRight { animation: slideInRight 0.3s ease forwards; }
    .animate-pulse { animation: pulse 1s ease infinite; }
    .animate-bounce { animation: bounce 1s ease infinite; }
    .animate-shake { animation: shake 0.5s ease; }
    .animate-rotate { animation: rotate 1s linear infinite; }
    .animate-success { animation: success 0.5s ease forwards; }
    .animate-like { animation: likeAnimation 0.5s ease forwards; }
  `;
  document.head.appendChild(style);
};

// Initialize animations when component mounts
export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    setupAnimations();
  }, []);
  
  return <>{children}</>;
};

// Animated component wrapper
interface AnimatedProps {
  children: React.ReactNode;
  animation: 'fadeIn' | 'fadeOut' | 'slideInUp' | 'slideInDown' | 'slideInLeft' | 'slideInRight' | 'pulse' | 'bounce' | 'shake' | 'rotate' | 'success' | 'like';
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  onAnimationEnd?: () => void;
}

export const Animated: React.FC<AnimatedProps> = ({
  children,
  animation: animationType,
  duration = 300,
  delay = 0,
  className = '',
  style = {},
  onAnimationEnd
}) => {
  return (
    <div
      className={`animate-${animationType} ${className}`}
      style={{
        ...style,
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`
      }}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </div>
  );
};

// Toast notification component
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#10b981', color: '#ffffff' };
      case 'error':
        return { backgroundColor: '#ef4444', color: '#ffffff' };
      case 'warning':
        return { backgroundColor: '#f59e0b', color: '#ffffff' };
      case 'info':
      default:
        return { backgroundColor: '#3b82f6', color: '#ffffff' };
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  return (
    <Animated
      animation={isVisible ? 'slideInUp' : 'fadeOut'}
      duration={300}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        ...getTypeStyles()
      }}
    >
      {message}
    </Animated>
  );
};

// Toast container and manager
interface ToastManagerProps {
  children: React.ReactNode;
}

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number;
}

export const ToastContext = React.createContext<{
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;
}>({
  showToast: () => {}
});

export const ToastProvider: React.FC<ToastManagerProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  
  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration: number = 3000
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };
  
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => React.useContext(ToastContext);

// Animated button with feedback
interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  feedback?: 'ripple' | 'pulse' | 'none';
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  feedback = 'ripple',
  className = '',
  style = {}
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = () => {
    if (feedback !== 'none') {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
    onClick();
  };
  
  return (
    <button
      className={`${isAnimating ? `animate-${feedback === 'ripple' ? 'pulse' : feedback}` : ''} ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transition: `all ${animation.fast} ${animation.easing}`,
        ...style
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
