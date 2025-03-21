import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { colors, spacing } from "./components/ui/KitchenStoriesDesign";
import { Home, BookOpen, Camera, ShoppingCart, MoreHorizontal } from "lucide-react";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { OfflineProvider } from "./contexts/OfflineContext";
import { AnimationProvider, ToastProvider } from "./components/ui/Animations";
import { TourProvider } from "./components/ui/OnboardingTour";

// Authentication & Onboarding
import Onboarding from "./components/onboarding/OnboardingFlow";
import Welcome from "./components/auth/Welcome";
import Setup from "./components/auth/Setup";

// Main App Screens
import HomeScreen from "./components/pages/HomeScreen";
import RecipesScreen from "./components/recipes/RecipesScreen";
import RecipeDetail from "./components/recipes/RecipeDetail";
import ScanScreen from "./components/scanning/ScanScreen";
import Dashboard from "./components/dashboard/Dashboard";
import Success from "./components/auth/Success";
import TinderStyle from "./components/tinder/TinderStyle";
import ShoppingList from "./components/shopping/ShoppingList";
import PantryInventory from "./components/pantry/PantryInventory";
import ProfileScreen from "./components/profile/ProfileScreen";

// Advanced Features
import AdvancedFeaturesScreen from "./components/advanced/AdvancedFeaturesScreen";
import PriceComparison from "./components/price-comparison/PriceComparison";
import StoreFinder from "./components/store-finder/StoreFinder";
import MealPlanning from "./components/meal-planning/MealPlanningCalendar";
import SmartCalendar from "./components/smart-calendar/SmartCalendar";
import DietaryPreferences from "./components/dietary-preferences/DietaryPreferences";
// Temporarily comment out Profile import until component exists
// import Profile from "./components/user/Profile";
import UIEnhancementsDemo from "./components/demo/UIEnhancementsDemo";
import BasicDemo from "./components/demo/BasicDemo";
import MealPlanningCalendar from "./components/meal-planning/MealPlanningCalendar";

// New components for clickable elements
import SearchScreen from "./components/search/SearchScreen";
import CategoriesScreen from "./components/categories/CategoriesScreen";
import CategoryDetail from "./components/categories/CategoryDetail";
import FeaturedScreen from "./components/featured/FeaturedScreen";
import PopularScreen from "./components/popular/PopularScreen";
import NotificationsScreen from "./components/notifications/NotificationsScreen";

/**
 * Main application component handling routing and navigation
 */
const AppContent: React.FC = () => {
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
    { path: '/', label: 'Home', icon: () => <Home size={24} /> },
    { path: '/recipes', label: 'Recipes', icon: () => <BookOpen size={24} /> },
    { path: '/scan', label: 'Scan', icon: () => <Camera size={24} /> },
    { path: '/shopping-list', label: 'Shopping', icon: () => <ShoppingCart size={24} /> },
    { path: '/advanced', label: 'More', icon: () => <MoreHorizontal size={24} /> }
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
        <div>Loading...</div>
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
            <div>{new Date().toLocaleTimeString()}</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div>Wifi Icon</div>
              <div>Battery Icon</div>
            </div>
          </div>
        )}
        
        {/* Main Content Area - Add consistent bottom padding for navigation */}
        <div style={{
          flex: 1,
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          paddingBottom: isAuthenticated ? '90px' : '0', // Only add padding when authenticated (not during onboarding)
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.darkGray} transparent`,
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
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/categories" element={<CategoriesScreen />} />
            <Route path="/category/:categoryName" element={<CategoryDetail />} />
            <Route path="/featured" element={<FeaturedScreen />} />
            <Route path="/popular" element={<PopularScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            
            {/* Advanced features */}
            <Route path="/advanced" element={<AdvancedFeaturesScreen />} />
            <Route path="/price-comparison" element={<PriceComparison />} />
            <Route path="/store-finder" element={<StoreFinder />} />
            <Route path="/meal-planning" element={<MealPlanningCalendar />} />
            <Route path="/smart-calendar" element={<SmartCalendar />} />
            <Route path="/dietary-preferences" element={<DietaryPreferences />} />
            <Route path="/ui-demo" element={<UIEnhancementsDemo />} />
            <Route path="/basic-demo" element={<BasicDemo />} />
            
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
                <div>Page Not Found</div>
                <div>
                  Sorry, the page you are looking for doesn't exist or has been moved.
                </div>
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
            paddingBottom: '8px', 
          }}>
            {primaryNavItems.map((item, index) => {
              const isActive = location.pathname === item.path || 
                              (item.path === '/advanced' && isAdvancedFeature(location.pathname));
              return (
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
                    color: isActive ? colors.primary : colors.darkGray,
                    position: 'relative',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: colors.primary,
                    }} />
                  )}
                  <div style={{
                    opacity: isActive ? 1 : 0.7,
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                  }}>
                    {item.icon()}
                  </div>
                  <span style={{ 
                    fontSize: '12px', 
                    marginTop: '4px',
                    fontWeight: isActive ? '600' : '400',
                    opacity: isActive ? 1 : 0.8,
                  }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Wrap the app with all providers
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <OfflineProvider>
          <AnimationProvider>
            <ToastProvider>
              <TourProvider>
                <AppContent />
              </TourProvider>
            </ToastProvider>
          </AnimationProvider>
        </OfflineProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export { App };
