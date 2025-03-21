import { useState } from "react";
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
    <div className="bg-emerald-500 text-white p-5 flex flex-col items-center justify-center h-full">
      <ShoppingCart className="h-12 w-12 mb-4" />
      <h3 className="text-2xl font-bold mb-2">WisePantryPal</h3>
      <p className="text-base mb-8 text-center">Your smart kitchen assistant that helps you save money and reduce waste</p>
      <button 
        onClick={onNext}
        className="bg-white text-emerald-600 px-6 py-3 rounded-full font-medium flex items-center shadow-md"
      >
        Get Started
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  </div>
);

export interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({
  onComplete,
}: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { title: "Welcome", component: <WelcomeScreen onNext={() => setCurrentStep(1)} /> },
    { title: "Price Comparison", component: <PriceComparisonScreen /> },
    { title: "Social Hub", component: <SocialHubScreen /> },
    { title: "Store Finder", component: <StoreFinderScreen /> },
    { title: "Waste & Budget", component: <BudgetTrackingScreen /> },
    { title: "Smart Calendar", component: <SmartCalendarScreen /> },
    { title: "Shopping List", component: <ShoppingListScreen /> },
  ];
  
  const currentProgress = ((currentStep) / (steps.length - 1)) * 100;
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("hasCompletedOnboarding", "true");
      onComplete();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-50 p-4">
      {/* Phone container with design more like the actual screenshot */}
      <div className="relative w-[375px] h-[667px] rounded-[28px] shadow-xl overflow-hidden border-8 border-gray-900">
        {/* Status bar with time, etc */}
        <div className="bg-gray-900 text-white flex justify-between items-center px-5 pt-4 pb-2 text-xs">
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
          <div className="px-4 pt-3 pb-2 bg-emerald-50">
            <Progress value={currentProgress} className="h-2 bg-gray-200" indicatorClassName="bg-emerald-500" />
            <p className="mt-1 text-xs text-emerald-700 font-medium">
              Step {currentStep} of {steps.length - 1}
            </p>
          </div>
        )}
        
        {/* Content area */}
        <div className="h-[575px] overflow-hidden bg-emerald-50">
          {steps[currentStep].component}
        </div>
        
        {/* Navigation */}
        {currentStep > 0 && (
          <div className="absolute bottom-0 inset-x-0 flex justify-between p-4 bg-white border-t border-gray-200">
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
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        )}
        
        {/* Tab navigation at bottom (only shown on final screen for preview) */}
        {currentStep === steps.length - 1 && (
          <div className="absolute bottom-0 inset-x-0 flex justify-between p-2 bg-white border-t border-gray-200 text-xs text-gray-600">
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
        )}
      </div>
    </div>
  );
}
