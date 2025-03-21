import { useRef, useEffect, useState } from 'react';

interface GestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  threshold?: number;
  longPressDelay?: number;
  doubleTapDelay?: number;
}

interface Position {
  x: number;
  y: number;
}

/**
 * A custom hook for handling touch and mouse gestures
 */
export const useGestures = (options: GestureOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onDoubleTap,
    onLongPress,
    threshold = 50,
    longPressDelay = 500,
    doubleTapDelay = 300
  } = options;

  const elementRef = useRef<HTMLElement | null>(null);
  const startPos = useRef<Position | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const lastTapTime = useRef<number>(0);
  const [isActive, setIsActive] = useState(false);

  // Clear any timers when component unmounts
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  const handleGestureStart = (clientX: number, clientY: number) => {
    startPos.current = { x: clientX, y: clientY };
    setIsActive(true);

    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress();
        // Prevent other gestures after long press
        startPos.current = null;
      }, longPressDelay);
    }
  };

  const handleGestureMove = (clientX: number, clientY: number) => {
    if (!startPos.current || !isActive) return;

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    
    // If moved significantly, cancel long press
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    }
  };

  const handleGestureEnd = (clientX: number, clientY: number) => {
    if (!startPos.current || !isActive) return;
    
    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Handle swipes if moved beyond threshold
    if (distance > threshold) {
      // Determine direction of swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    } else if (distance < 10) {
      // Handle taps
      const now = Date.now();
      const timeSinceLastTap = now - lastTapTime.current;
      
      if (onDoubleTap && timeSinceLastTap < doubleTapDelay) {
        onDoubleTap();
        // Reset to prevent triple tap being counted as another double tap
        lastTapTime.current = 0;
      } else {
        if (onTap) onTap();
        lastTapTime.current = now;
      }
    }

    startPos.current = null;
    setIsActive(false);
  };

  const handleGestureCancel = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    startPos.current = null;
    setIsActive(false);
  };

  // Touch event handlers
  const touchHandlers = {
    onTouchStart: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleGestureStart(touch.clientX, touch.clientY);
    },
    onTouchMove: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleGestureMove(touch.clientX, touch.clientY);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        handleGestureEnd(touch.clientX, touch.clientY);
      } else {
        handleGestureCancel();
      }
    },
    onTouchCancel: () => {
      handleGestureCancel();
    }
  };

  // Mouse event handlers (for desktop testing)
  const mouseHandlers = {
    onMouseDown: (e: React.MouseEvent) => {
      handleGestureStart(e.clientX, e.clientY);
    },
    onMouseMove: (e: React.MouseEvent) => {
      handleGestureMove(e.clientX, e.clientY);
    },
    onMouseUp: (e: React.MouseEvent) => {
      handleGestureEnd(e.clientX, e.clientY);
    },
    onMouseLeave: () => {
      handleGestureCancel();
    }
  };

  // Combined handlers
  const handlers = {
    ...touchHandlers,
    ...mouseHandlers
  };

  return { ref: elementRef, handlers, isActive };
};

// Example usage for a swipeable list item
export const useSwipeableListItem = (
  onDelete: () => void,
  onComplete?: () => void,
  onFavorite?: () => void
) => {
  return useGestures({
    onSwipeLeft: onDelete,
    onSwipeRight: onComplete,
    threshold: 80
  });
};

// Example usage for a swipeable card
export const useSwipeableCard = (
  onDismiss: () => void,
  onLike?: () => void
) => {
  return useGestures({
    onSwipeLeft: onDismiss,
    onSwipeRight: onLike,
    threshold: 100
  });
};
