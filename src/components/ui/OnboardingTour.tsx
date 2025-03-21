import React, { useState, useEffect, createContext, useContext } from 'react';
import { colors, spacing, borderRadius, Text } from './KitchenStoriesDesign';
import { Animated } from './Animations';
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react';

// Types
interface TourStep {
  target: string; // CSS selector for the target element
  title: string;
  content: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  spotlightRadius?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface TourContextType {
  startTour: (tourId: string, steps: TourStep[]) => void;
  endTour: () => void;
  isTourActive: boolean;
  currentTourId: string | null;
}

// Context
const TourContext = createContext<TourContextType>({
  startTour: () => {},
  endTour: () => {},
  isTourActive: false,
  currentTourId: null
});

// Provider
export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [currentTourId, setCurrentTourId] = useState<string | null>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const startTour = (tourId: string, tourSteps: TourStep[]) => {
    if (tourSteps.length === 0) return;
    
    setSteps(tourSteps);
    setCurrentStep(0);
    setIsTourActive(true);
    setCurrentTourId(tourId);
    
    // Add overlay to prevent interactions with the rest of the page
    document.body.style.overflow = 'hidden';
    
    // Create and add spotlight styles
    const style = document.createElement('style');
    style.id = 'tour-spotlight-styles';
    style.textContent = `
      .tour-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9998;
        pointer-events: none;
      }
      
      .tour-spotlight {
        position: absolute;
        border-radius: 50%;
        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
        pointer-events: none;
        z-index: 9999;
      }
    `;
    document.head.appendChild(style);
  };

  const endTour = () => {
    setIsTourActive(false);
    setCurrentTourId(null);
    document.body.style.overflow = '';
    
    // Remove spotlight styles
    const style = document.getElementById('tour-spotlight-styles');
    if (style) {
      document.head.removeChild(style);
    }
    
    // Remove any localStorage flags if needed
    localStorage.setItem(`tour-${currentTourId}-completed`, 'true');
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    endTour();
  };

  // Update target element and position when step changes
  useEffect(() => {
    if (!isTourActive || steps.length === 0) return;
    
    const step = steps[currentStep];
    const element = document.querySelector(step.target) as HTMLElement;
    
    if (element) {
      setTargetElement(element);
      
      // Calculate position for tooltip
      const rect = element.getBoundingClientRect();
      const placement = step.placement || 'bottom';
      
      let top = 0;
      let left = 0;
      
      switch (placement) {
        case 'top':
          top = rect.top - 10 - 150; // 150px is approximate tooltip height
          left = rect.left + rect.width / 2 - 150; // 150px is half of tooltip width
          break;
        case 'right':
          top = rect.top + rect.height / 2 - 75;
          left = rect.right + 10;
          break;
        case 'bottom':
          top = rect.bottom + 10;
          left = rect.left + rect.width / 2 - 150;
          break;
        case 'left':
          top = rect.top + rect.height / 2 - 75;
          left = rect.left - 10 - 300; // 300px is approximate tooltip width
          break;
      }
      
      // Ensure tooltip stays within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      if (left < 20) left = 20;
      if (left + 300 > viewportWidth - 20) left = viewportWidth - 320;
      if (top < 20) top = 20;
      if (top + 150 > viewportHeight - 20) top = viewportHeight - 170;
      
      setTooltipPosition({ top, left });
      
      // Add spotlight effect
      const spotlight = document.createElement('div');
      spotlight.className = 'tour-spotlight';
      const radius = step.spotlightRadius || Math.max(rect.width, rect.height) / 2 + 10;
      
      spotlight.style.width = `${radius * 2}px`;
      spotlight.style.height = `${radius * 2}px`;
      spotlight.style.left = `${rect.left + rect.width / 2 - radius}px`;
      spotlight.style.top = `${rect.top + rect.height / 2 - radius}px`;
      
      // Add overlay
      const overlay = document.createElement('div');
      overlay.className = 'tour-overlay';
      document.body.appendChild(overlay);
      document.body.appendChild(spotlight);
      
      // Scroll element into view
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      return () => {
        document.body.removeChild(spotlight);
        document.body.removeChild(overlay);
      };
    }
  }, [currentStep, isTourActive, steps]);

  // Render tooltip
  const renderTooltip = () => {
    if (!isTourActive || steps.length === 0 || !targetElement) return null;
    
    const step = steps[currentStep];
    
    return (
      <Animated
        animation="fadeIn"
        duration={300}
        style={{
          position: 'fixed',
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          width: '300px',
          backgroundColor: 'white',
          borderRadius: borderRadius.md,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          zIndex: 10000,
          padding: spacing.md,
          pointerEvents: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
          <Text variant="h3" color={colors.textPrimary}>
            {step.title}
          </Text>
          <button
            onClick={skipTour}
            style={{ 
              padding: spacing.xs,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>
        
        <Text variant="body1" color={colors.textSecondary} style={{ marginBottom: spacing.md }}>
          {step.content}
        </Text>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              style={{ 
                marginRight: spacing.sm,
                padding: `${spacing.xs} ${spacing.sm}`,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'transparent',
                color: colors.textSecondary,
                border: 'none',
                borderRadius: borderRadius.sm,
                cursor: currentStep === 0 ? 'default' : 'pointer',
                opacity: currentStep === 0 ? 0.5 : 1
              }}
            >
              <ArrowLeft size={16} style={{ marginRight: spacing.xs }} />
              Previous
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Text variant="caption" color={colors.textSecondary}>
              {currentStep + 1} of {steps.length}
            </Text>
          </div>
          
          <div>
            {currentStep < steps.length - 1 ? (
              <button 
                onClick={nextStep}
                style={{ 
                  padding: `${spacing.xs} ${spacing.md}`,
                  backgroundColor: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: borderRadius.sm,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Next
                <ArrowRight size={16} style={{ marginLeft: spacing.xs }} />
              </button>
            ) : (
              <button 
                onClick={endTour}
                style={{ 
                  padding: `${spacing.xs} ${spacing.md}`,
                  backgroundColor: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: borderRadius.sm,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Finish
                <Check size={16} style={{ marginLeft: spacing.xs }} />
              </button>
            )}
          </div>
        </div>
      </Animated>
    );
  };

  return (
    <TourContext.Provider value={{ startTour, endTour, isTourActive, currentTourId }}>
      {children}
      {isTourActive && renderTooltip()}
    </TourContext.Provider>
  );
};

// Hook
export const useTour = () => useContext(TourContext);

// Example tour steps for the app
export const homeScreenTourSteps: TourStep[] = [
  {
    target: '.home-screen-header',
    title: 'Welcome to WisePantryPal',
    content: 'This is your home screen where you can access all the features of the app.',
    placement: 'bottom',
  },
  {
    target: '.bottom-navigation',
    title: 'Navigation',
    content: 'Use these tabs to navigate between different sections of the app.',
    placement: 'top',
  },
  {
    target: '.scan-button',
    title: 'Scan Products',
    content: 'Tap here to scan product barcodes and add them to your pantry.',
    placement: 'top',
    spotlightRadius: 40,
  },
  {
    target: '.shopping-list-preview',
    title: 'Shopping List',
    content: 'View your current shopping list and quickly add items you need.',
    placement: 'right',
  },
  {
    target: '.more-tab',
    title: 'Advanced Features',
    content: 'Access advanced features like price comparison, meal planning, and more.',
    placement: 'top',
  }
];

export const recipeScreenTourSteps: TourStep[] = [
  {
    target: '.recipe-search',
    title: 'Search Recipes',
    content: 'Search for recipes by name, ingredient, or dietary preference.',
    placement: 'bottom',
  },
  {
    target: '.recipe-filters',
    title: 'Filter Recipes',
    content: 'Use these filters to find recipes that match your preferences.',
    placement: 'bottom',
  },
  {
    target: '.recipe-card:first-child',
    title: 'Recipe Cards',
    content: 'Tap on a recipe card to view details and cooking instructions.',
    placement: 'right',
  }
];

export const shoppingListTourSteps: TourStep[] = [
  {
    target: '.add-item-button',
    title: 'Add Items',
    content: 'Tap here to add new items to your shopping list.',
    placement: 'left',
  },
  {
    target: '.shopping-list-item:first-child',
    title: 'Shopping List Items',
    content: 'Tap the checkbox to mark items as purchased. Swipe left to delete items.',
    placement: 'right',
  },
  {
    target: '.sort-filter-options',
    title: 'Sort and Filter',
    content: 'Organize your shopping list by category, priority, or store.',
    placement: 'bottom',
  }
];
