import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import './App.css';

// UI Components & Styling
import { 
  Home, 
  BookOpen as Book, 
  Camera, 
  ShoppingCart, 
  MoreHorizontal,
  Wifi,
  Battery
} from 'lucide-react';
import { colors, spacing, Text } from './components/ui/KitchenStoriesDesign';

// Main Screens
import HomeScreen from "./components/pages/HomeScreen";
import RecipesScreen from "./components/recipes/RecipesScreen";
import RecipeDetail from "./components/recipes/RecipeDetail";
import ScanScreen from "./components/scanning/ScanScreen";
import ShoppingList from "./components/shopping/ShoppingList";
import PantryInventory from "./components/pantry/PantryInventory";
import ProfileScreen from "./components/profile/ProfileScreen";

// Advanced Features
import AdvancedFeaturesScreen from "./components/advanced/AdvancedFeaturesScreen";
import PriceComparison from "./components/price-comparison/PriceComparison";
import StoreFinder from "./components/store-finder/StoreFinder";
import MealPlanningCalendar from "./components/meal-planning/MealPlanningCalendar";
import SmartCalendar from "./components/calendar/SmartCalendar";
import DietaryPreferences from "./components/dietary/DietaryPreferences";

// Onboarding & Authentication
import Onboarding from "./components/onboarding/OnboardingFlow";
import Welcome from "./components/auth/LoginForm";
import Setup from "./components/auth/SignUpForm";

// Legacy Components (using correct casing and paths)
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import TinderStyle from "./components/pages/TinderStyle";

/**
 * Main application component handling routing and navigation
 */
const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Check if current route is an advanced feature
   */
  const isAdvancedFeature = (path: string): boolean => {
    return [
      '/advanced', 
      '/price-comparison', 
      '/store-finder', 
      '/meal-planning', 
      '/smart-calendar', 
      '/dietary-preferences'
    ].includes(path);
  };

  /**
   * Handle onboarding completion
   */
  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setIsAuthenticated(true);
    navigate('/');
  };

  // Navigation Items Configuration
  const primaryNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/recipes', label: 'Recipes', icon: Book },
    { path: '/scan', label: 'Scan', icon: Camera },
    { path: '/shopping-list', label: 'Shopping', icon: ShoppingCart },
    { path: '/advanced', label: 'More', icon: MoreHorizontal }
  ];

  // Simulate authentication check
  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    
    // If not authenticated and not on onboarding/auth routes, redirect to welcome
    if (!hasCompletedOnboarding && 
        !location.pathname.includes('/onboarding') && 
        !location.pathname.includes('/welcome') &&
        !location.pathname.includes('/setup')) {
      navigate('/onboarding/1');
    } else {
      // For demo, set authenticated to true if onboarding is complete
      setIsAuthenticated(hasCompletedOnboarding);
    }
    
    setIsLoading(false);
  }, [location.pathname, navigate]);

  // Redirect to onboarding if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Only redirect if not already on onboarding, welcome or setup pages
      if (!location.pathname.includes('/onboarding') && 
          !location.pathname.includes('/welcome') && 
          !location.pathname.includes('/setup')) {
        navigate('/onboarding/1');
      }
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="h3">Loading...</Text>
      </div>
    );
  }

  // Check if we're on the onboarding screen - different layout
  const isOnboarding = location.pathname.includes('/onboarding');

  return (
    <div className="app-container" style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.background, // Soft background for the outer frame
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      margin: 0,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Phone Frame with proper mobile proportions */}
      <div className="phone-frame" style={{
        width: '100%',
        maxWidth: '414px', // Standard mobile width
        height: '100%',
        maxHeight: '736px', // Standard mobile height (iPhone 8 Plus dimensions)
        backgroundColor: colors.surface,
        borderRadius: isOnboarding ? '0' : '24px',
        overflow: 'hidden',
        position: 'relative',
        border: isOnboarding ? 'none' : '10px solid #151515',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        {/* Status Bar - Only show for authenticated app */}
        {!isOnboarding && (
          <div style={{
            height: '30px',
            backgroundColor: colors.white,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px',
            borderBottom: `1px solid ${colors.lightGray}`
          }}>
            <Text variant="caption">{new Date().toLocaleTimeString()}</Text>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Wifi size={12} />
              <Battery size={12} />
            </div>
          </div>
        )}
        
        {/* Main Content Area - with proper scrolling */}
        <div style={{ 
          flex: 1, 
          overflowY: isOnboarding ? 'hidden' : 'auto',
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
          msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
          scrollbarWidth: 'none', // Hide scrollbar in Firefox
          position: 'relative',
          height: '100%'
        }}>
          {/* Hide scrollbar for Chrome/Safari/Opera */}
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {/* Scrollable content wrapper */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            height: '100%',
            paddingBottom: !isOnboarding && isAuthenticated ? '160px' : '0'
          }}>
            <Routes>
              {/* Authentication & Onboarding routes */}
              <Route path="/onboarding/:step" element={<Onboarding onComplete={handleOnboardingComplete} />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/setup" element={<Setup />} />
              
              {/* Main app routes */}
              <Route path="/" element={<HomeScreen />} />
              <Route path="/pantry" element={<PantryInventory />} />
              <Route path="/recipes" element={<RecipesScreen />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/scan" element={<ScanScreen />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
              <Route path="/profile" element={<ProfileScreen />} />
              
              {/* Advanced features */}
              <Route path="/advanced" element={<AdvancedFeaturesScreen />} />
              <Route path="/price-comparison" element={<PriceComparison />} />
              <Route path="/store-finder" element={<StoreFinder />} />
              <Route path="/meal-planning" element={<MealPlanningCalendar />} />
              <Route path="/smart-calendar" element={<SmartCalendar />} />
              <Route path="/dietary-preferences" element={<DietaryPreferences />} />
              
              {/* Legacy routes for backward compatibility */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/success" element={<Success />} />
              <Route path="/tinder-style" element={<TinderStyle />} />
              
              {/* Fallback - 404 with more user-friendly message */}
              <Route path="*" element={
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: spacing.lg
                }}>
                  <Text variant="h2" style={{ marginBottom: spacing.md }}>Page Not Found</Text>
                  <Text variant="body1" style={{ marginBottom: spacing.lg, textAlign: 'center' }}>
                    Sorry, the page you are looking for doesn't exist or has been moved.
                  </Text>
                  <button 
                    onClick={() => navigate('/')}
                    style={{
                      padding: `${spacing.sm} ${spacing.lg}`,
                      backgroundColor: colors.primary,
                      color: colors.white,
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Return to Home
                  </button>
                </div>
              } />
            </Routes>
          </div>
        </div>
        
        {/* Bottom Navigation - Only show for authenticated app (not onboarding) */}
        {!isOnboarding && isAuthenticated && (
          <div style={{
            height: '70px',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.white,
            borderTop: `1px solid ${colors.lightGray}`,
            boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            zIndex: 100,
          }}>
            {primaryNavItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  height: '100%',
                  padding: '8px 12px',
                  flex: 1,
                  color: location.pathname === item.path || 
                        (item.path === '/advanced' && isAdvancedFeature(location.pathname)) ? 
                        colors.primary : colors.darkGray
                }}
              >
                {React.createElement(item.icon, { 
                  size: 24,
                  color: location.pathname === item.path || 
                        (item.path === '/advanced' && isAdvancedFeature(location.pathname)) ? 
                        colors.primary : colors.darkGray
                })}
                <span style={{ 
                  fontSize: '12px', 
                  marginTop: '4px',
                  fontWeight: location.pathname === item.path || 
                              (item.path === '/advanced' && isAdvancedFeature(location.pathname)) ? 
                              600 : 400
                }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
