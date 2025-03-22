import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Flex, Text, Button, Card, colors, spacing } from '../ui/KitchenStoriesDesign';
import { ChevronRight, Home, ShoppingCart, Camera, BookOpen, Scan, MoreHorizontal } from 'lucide-react';
import { Progress } from '../ui/progress';

interface OnboardingProps {
  onComplete: () => void;
}

// Feature screens for the onboarding flow
const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: { title: string; description: string }[];
}> = ({ title, description, icon, color, features }) => (
  <Card
    style={{
      maxWidth: '340px',
      margin: '0 auto',
      overflow: 'hidden',
      border: 'none',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }}
  >
    <div
      style={{
        backgroundColor: color,
        padding: spacing.sm,
        color: 'white',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
    >
      <Flex align="center" gap={spacing.xs}>
        {icon}
        <Text variant="h3" color="white" style={{ margin: 0 }}>
          {title}
        </Text>
      </Flex>
      <Text variant="body2" color="white" style={{ opacity: 0.9, marginTop: spacing.xs }}>
        {description}
      </Text>
    </div>
    <div style={{ padding: spacing.sm, backgroundColor: `${color}10` }}>
      {features.map((feature, index) => (
        <div
          key={index}
          style={{
            backgroundColor: 'white',
            padding: spacing.xs,
            marginBottom: spacing.xs,
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Text variant="h3" style={{ margin: 0, fontSize: '14px' }}>
            {feature.title}
          </Text>
          <Text variant="body2" color={colors.textSecondary} style={{ margin: 0 }}>
            {feature.description}
          </Text>
        </div>
      ))}
    </div>
  </Card>
);

// Welcome screen component
const WelcomeScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    style={{
      height: '100%',
      padding: spacing.md,
      backgroundColor: colors.primary,
      color: 'white',
      textAlign: 'center',
    }}
  >
    <ShoppingCart size={48} strokeWidth={1.5} />
    <Text variant="h1" color="white" style={{ marginTop: spacing.md, marginBottom: spacing.xs }}>
      WisePantryPal
    </Text>
    <Text variant="body1" color="white" style={{ marginBottom: spacing.lg, opacity: 0.9, maxWidth: '280px' }}>
      Your smart kitchen assistant that helps you save money and reduce waste
    </Text>
    <Button
      variant="secondary"
      onClick={onNext}
      style={{ backgroundColor: 'white', color: colors.primary }}
    >
      Get Started
      <ChevronRight size={16} />
    </Button>
  </Flex>
);

// Main onboarding component
const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();
  
  // Define all steps in the onboarding process
  const steps = [
    {
      name: 'Welcome',
      component: <WelcomeScreen onNext={() => handleNext()} />,
    },
    {
      name: 'Smart Shopping',
      component: (
        <FeatureCard
          title="Smart Shopping"
          description="Create intelligent shopping lists that help you save money and reduce waste."
          icon={<ShoppingCart size={20} />}
          color={colors.success}
          features={[
            {
              title: 'Price Comparison',
              description: 'Compare prices across stores to find the best deals',
            },
            {
              title: 'Smart Lists',
              description: 'Get suggestions based on your pantry inventory',
            },
            {
              title: 'Budget Tracking',
              description: 'Set and track your grocery spending goals',
            },
          ]}
        />
      ),
    },
    {
      name: 'Pantry Management',
      component: (
        <FeatureCard
          title="Pantry Management"
          description="Keep track of what's in your pantry and get notified before items expire."
          icon={<Home size={20} />}
          color={colors.accent3}
          features={[
            {
              title: 'Expiration Tracking',
              description: 'Get alerts before your food expires',
            },
            {
              title: 'Inventory Management',
              description: 'Easily add and remove items from your pantry',
            },
            {
              title: 'Waste Reduction',
              description: 'Track and reduce your food waste with smart reminders',
            },
          ]}
        />
      ),
    },
    {
      name: 'Recipe Suggestions',
      component: (
        <FeatureCard
          title="Recipe Suggestions"
          description="Discover recipes based on what you already have in your pantry."
          icon={<BookOpen size={20} />}
          color={colors.secondary}
          features={[
            {
              title: 'Personalized Recipes',
              description: 'Get recipes tailored to your preferences and pantry',
            },
            {
              title: 'Quick Meals',
              description: 'Find recipes you can make with what you have on hand',
            },
            {
              title: 'Recipe Saving',
              description: 'Save your favorite recipes for easy access',
            },
          ]}
        />
      ),
    },
    {
      name: 'Barcode Scanning',
      component: (
        <FeatureCard
          title="Barcode Scanning"
          description="Quickly add items to your pantry or shopping list by scanning barcodes."
          icon={<Scan size={20} />}
          color={colors.accent2}
          features={[
            {
              title: 'Fast Entry',
              description: 'Add items to your pantry with a quick scan',
            },
            {
              title: 'Nutritional Info',
              description: 'View nutritional information for scanned products',
            },
            {
              title: 'Price Lookup',
              description: 'Find the best prices for scanned items',
            },
          ]}
        />
      ),
    },
  ];

  // Convert URL step parameter to number (default to 1 if invalid)
  const stepNumber = parseInt(step || '1', 10);
  const validStepIndex = Math.min(Math.max(stepNumber - 1, 0), steps.length - 1);

  // State to track current step
  const [currentStep, setCurrentStep] = React.useState(validStepIndex);

  // Update step when URL parameter changes
  React.useEffect(() => {
    setCurrentStep(validStepIndex);
  }, [step, validStepIndex]);

  // Calculate progress percentage for progress bar
  const progress = ((currentStep) / (steps.length - 1)) * 100;

  // Handle next button click
  const handleNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep < steps.length) {
      navigate(`/onboarding/${nextStep + 1}`);
    } else {
      localStorage.setItem('onboardingCompleted', 'true');
      onComplete();
    }
  };

  // Handle back button click
  const handleBack = () => {
    if (currentStep > 0) {
      navigate(`/onboarding/${currentStep}`);
    }
  };

  // Check if we're on the final step
  const isLastStep = currentStep === steps.length - 1;
  
  // Check if we're on the welcome screen (first step)
  const isWelcomeScreen = currentStep === 0;

  return (
    <Container
      style={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '812px',
        backgroundColor: isWelcomeScreen ? colors.primary : colors.background,
      }}
    >
      {/* Status bar - only shown on feature screens */}
      {!isWelcomeScreen && (
        <div
          style={{
            backgroundColor: '#000',
            color: 'white',
            padding: '10px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
          }}
        >
          <span>9:41 AM</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <span>📶</span>
            <span>100%</span>
          </div>
        </div>
      )}

      {/* Progress bar - only on feature screens */}
      {!isWelcomeScreen && (
        <div style={{ padding: '8px 16px', backgroundColor: colors.background }}>
          <Progress value={progress} className="h-1" />
          <Text
            variant="body2"
            style={{ marginTop: '4px', color: colors.primary, fontWeight: 500 }}
          >
            Step {currentStep} of {steps.length - 1}
          </Text>
        </div>
      )}

      {/* Content area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'auto',
          padding: isWelcomeScreen ? 0 : spacing.md,
        }}
      >
        {steps[currentStep].component}
      </div>

      {/* Navigation buttons - only on feature screens */}
      {!isWelcomeScreen && (
        <div
          style={{
            padding: spacing.md,
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: colors.background,
          }}
        >
          <Button
            variant="outline"
            onClick={handleBack}
            style={{ minWidth: '100px' }}
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            style={{ minWidth: '100px' }}
          >
            {isLastStep ? 'Get Started' : 'Next'}
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Onboarding;
