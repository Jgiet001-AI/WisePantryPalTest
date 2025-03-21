import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Store, Share2, MapPin, PiggyBank, Calendar, ListChecks, ShoppingCart, Scan, Home, Utensils, MessageCircle } from "lucide-react";
import { Progress } from "../ui/progress";

// Individual feature screens as separate components for better organization
const PriceComparisonScreen = () => (
  <div className="h-full flex flex-col">
    <div className="bg-emerald-500 text-white p-5 rounded-t-xl">
      <ShoppingCart className="h-8 w-8 mb-2" />
      <h3 className="text-xl font-bold mb-1">Price Comparison</h3>
      <p className="text-sm opacity-90">Compare prices across stores to find the best deals for your groceries.</p>
    </div>
    <div className="bg-emerald-50 flex-1 p-5 space-y-4">
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Price Alerts</h4>
        <p className="text-sm text-gray-600">Get notified when items on your list drop in price</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Store Comparison</h4>
        <p className="text-sm text-gray-600">View side-by-side price comparisons from local stores</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Historical Price Tracking</h4>
        <p className="text-sm text-gray-600">Track price changes over time to find the best deals</p>
      </div>
    </div>
  </div>
);

const SocialHubScreen = () => (
  <div className="h-full flex flex-col">
    <div className="bg-emerald-500 text-white p-5 rounded-t-xl">
      <Share2 className="h-8 w-8 mb-2" />
      <h3 className="text-xl font-bold mb-1">Social Hub</h3>
      <p className="text-sm opacity-90">Connect with friends and family to share recipes, shopping lists, and pantry items.</p>
    </div>
    <div className="bg-emerald-50 flex-1 p-5 space-y-4">
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Recipe Sharing</h4>
        <p className="text-sm text-gray-600">Share and discover new recipes with friends</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Collaborative Lists</h4>
        <p className="text-sm text-gray-600">Create shopping lists that multiple people can edit</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Community Challenges</h4>
        <p className="text-sm text-gray-600">Join challenges to reduce waste and save money</p>
      </div>
    </div>
  </div>
);

const StoreFinderScreen = () => (
  <div className="h-full flex flex-col">
    <div className="bg-emerald-500 text-white p-5 rounded-t-xl">
      <MapPin className="h-8 w-8 mb-2" />
      <h3 className="text-xl font-bold mb-1">Store Finder</h3>
      <p className="text-sm opacity-90">Locate stores near you with the best prices for your shopping list.</p>
    </div>
    <div className="bg-emerald-50 flex-1 p-5 space-y-4">
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Map Integration</h4>
        <p className="text-sm text-gray-600">Find stores with available items near you</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Store Hours & Details</h4>
        <p className="text-sm text-gray-600">View open hours, contact info, and features</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Route Planning</h4>
        <p className="text-sm text-gray-600">Create efficient shopping routes across multiple stores</p>
      </div>
    </div>
  </div>
);

const BudgetTrackingScreen = () => (
  <div className="h-full flex flex-col">
    <div className="bg-emerald-500 text-white p-5 rounded-t-xl">
      <PiggyBank className="h-8 w-8 mb-2" />
      <h3 className="text-xl font-bold mb-1">Waste & Budget Tracking</h3>
      <p className="text-sm opacity-90">Track your food waste and grocery spending to make smarter decisions.</p>
    </div>
    <div className="bg-emerald-50 flex-1 p-5 space-y-4">
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Waste Analytics</h4>
        <p className="text-sm text-gray-600">Track and visualize your food waste over time</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Budget Dashboard</h4>
        <p className="text-sm text-gray-600">Set grocery budgets and monitor your spending</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Savings Calculator</h4>
        <p className="text-sm text-gray-600">See how much you've saved with smart shopping</p>
      </div>
    </div>
  </div>
);

const SmartCalendarScreen = () => (
  <div className="h-full flex flex-col">
    <div className="bg-emerald-500 text-white p-5 rounded-t-xl">
      <Calendar className="h-8 w-8 mb-2" />
      <h3 className="text-xl font-bold mb-1">Smart Calendar</h3>
      <p className="text-sm opacity-90">Plan your meals in advance and get reminders for ingredient preparation.</p>
    </div>
    <div className="bg-emerald-50 flex-1 p-5 space-y-4">
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Meal Planning</h4>
        <p className="text-sm text-gray-600">Schedule meals for the week based on your pantry</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Prep Reminders</h4>
        <p className="text-sm text-gray-600">Get notifications when it's time to prepare ingredients</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Smart Scheduling</h4>
        <p className="text-sm text-gray-600">Optimize meal planning based on ingredient expiration dates</p>
      </div>
    </div>
  </div>
);

const ShoppingListScreen = () => (
  <div className="h-full flex flex-col">
    <div className="bg-emerald-500 text-white p-5 rounded-t-xl">
      <ListChecks className="h-8 w-8 mb-2" />
      <h3 className="text-xl font-bold mb-1">Smart Shopping List</h3>
      <p className="text-sm opacity-90">Create intelligent shopping lists that learn from your habits and pantry inventory.</p>
    </div>
    <div className="bg-emerald-50 flex-1 p-5 space-y-4">
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Automatic Suggestions</h4>
        <p className="text-sm text-gray-600">Get recommendations based on your pantry needs</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Category Organization</h4>
        <p className="text-sm text-gray-600">Lists organized by store sections for efficient shopping</p>
      </div>
      <div className="rounded-lg bg-white p-4 border border-emerald-100 shadow-sm">
        <h4 className="font-medium text-emerald-800 text-base">Voice Input</h4>
        <p className="text-sm text-gray-600">Add items to your list using voice commands</p>
      </div>
    </div>
  </div>
);

const WelcomeScreen = ({ onNext }: { onNext: () => void }) => (
  <div className="h-full flex flex-col">
    <div 
      className="bg-emerald-500 text-white flex flex-col items-center justify-center h-full"
      style={{ padding: '2rem' }}
    >
      <div className="flex-1"></div>
      <ShoppingCart 
        className="h-20 w-20 mb-6 text-white" 
        strokeWidth={1.5} 
        fill="transparent"
      />
      <h1 className="text-3xl font-bold mb-2 text-center">WisePantryPal</h1>
      <p className="text-base mb-12 text-center max-w-xs mx-auto opacity-95">
        Your smart kitchen assistant that helps you save money and reduce waste
      </p>
      <button 
        onClick={onNext}
        className="bg-white text-emerald-600 px-8 py-3 rounded-full font-medium flex items-center justify-center"
        style={{ minWidth: "180px" }}
      >
        Get Started
        <ArrowRight className="ml-2 h-5 w-5" />
      </button>
      <div className="flex-1"></div>
    </div>
  </div>
);

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();
  
  // Define all steps in the onboarding process
  const steps = [
    { name: "Welcome", component: <WelcomeScreen onNext={() => handleNext()} /> },
    { name: "Price Comparison", component: <PriceComparisonScreen /> },
    { name: "Store Finder", component: <StoreFinderScreen /> },
    { name: "Smart Calendar", component: <SmartCalendarScreen /> },
    { name: "Shopping List", component: <ShoppingListScreen /> },
    { name: "Pantry Management", component: <BudgetTrackingScreen /> }
  ];
  
  // Convert URL step parameter to number (default to 1 if invalid)
  const stepNumber = parseInt(step || "1", 10);
  const validStepIndex = Math.min(Math.max(stepNumber - 1, 0), steps.length - 1);
  
  // State to track current step
  const [currentStep, setCurrentStep] = useState(validStepIndex);
  
  // Update step when URL parameter changes
  useEffect(() => {
    setCurrentStep(validStepIndex);
  }, [step, validStepIndex]);
  
  // Calculate progress percentage for progress bar
  const currentProgress = ((currentStep) / (steps.length - 1)) * 100;
  
  // Handle next button click
  const handleNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep < steps.length) {
      navigate(`/onboarding/${nextStep + 1}`);
    } else {
      localStorage.setItem("hasCompletedOnboarding", "true");
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

  return (
    <div className="flex h-full w-full items-center justify-center bg-emerald-50">
      {/* Phone simulation container */}
      <div className="w-full h-full max-w-md max-h-[667px] overflow-hidden flex flex-col">
        {/* Status bar - maintained for consistency with the screenshot */}
        <div className="bg-gray-900 text-white flex justify-between items-center px-5 pt-2 pb-2 text-xs">
          <span>04:09 PM</span>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-0.5">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <span className="ml-2">100%</span>
          </div>
        </div>
        
        {/* Only show progress bar on feature screens, not on welcome */}
        {currentStep > 0 && (
          <div className="px-4 pt-2 pb-1 bg-emerald-50">
            <Progress value={currentProgress} className="h-2 bg-gray-200" indicatorClassName="bg-emerald-500" />
            <p className="mt-1 text-xs text-emerald-700 font-medium">
              Step {currentStep} of {steps.length - 1}
            </p>
          </div>
        )}
        
        {/* Content area - fixed height to prevent overflow */}
        <div className="bg-emerald-50 flex-1 overflow-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
          {steps[currentStep].component}
        </div>
        
        {/* Bottom navigation area - conditional rendering */}
        {currentStep === 0 ? (
          // Empty div for welcome screen (navigation handled inside WelcomeScreen)
          <div></div>
        ) : isLastStep ? (
          // Final step - show tab navigation + finish button
          <div className="mt-auto">
            {/* Finish button placed above the tabs */}
            <div className="w-full flex justify-center py-2 bg-emerald-50">
              <button 
                onClick={onComplete}
                className="px-6 py-2 rounded-full bg-emerald-500 text-white font-medium flex items-center"
              >
                Finish
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            
            {/* Tab navigation preview */}
            <div className="flex justify-between p-2 bg-white border-t border-gray-200 text-xs text-gray-600">
              <div className="flex flex-col items-center">
                <Home className="h-5 w-5 text-emerald-600" />
                <span>Home</span>
              </div>
              <div className="flex flex-col items-center">
                <ShoppingCart className="h-5 w-5" />
                <span>Pantry</span>
              </div>
              <div className="flex flex-col items-center">
                <Scan className="h-5 w-5" />
                <span>Scan</span>
              </div>
              <div className="flex flex-col items-center">
                <Utensils className="h-5 w-5" />
                <span>Meals</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageCircle className="h-5 w-5" />
                <span>Chat</span>
              </div>
            </div>
          </div>
        ) : (
          // Steps 1-5 - show back/next navigation
          <div className="flex justify-between p-3 bg-white border-t border-gray-200 mt-auto">
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-full border border-emerald-500 text-emerald-600 font-medium"
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              className="px-4 py-2 rounded-full bg-emerald-500 text-white font-medium flex items-center"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
