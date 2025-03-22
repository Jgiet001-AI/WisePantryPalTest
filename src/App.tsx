import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { colors, spacing } from "./components/ui/KitchenStoriesDesign";
import { Home, BookOpen, Camera, ShoppingCart, MoreHorizontal } from "lucide-react";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { OfflineProvider } from "./contexts/OfflineContext";
import { AnimationProvider, ToastProvider } from "./components/ui/Animations";
import { TourProvider } from "./components/ui/OnboardingTour";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import AppHeader from "./components/layout/AppHeader";

// Authentication & Onboarding
import Onboarding from "./components/onboarding/OnboardingFlow";
import Welcome from "./components/auth/Welcome";
import Setup from "./components/auth/Setup";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";

// Main App Screens
import HomeScreen from "./components/pages/HomeScreen";
import RecipesScreen from "./components/recipes/RecipesScreen";
import RecipeDetail from "./components/recipes/RecipeDetail";
import ScanScreen from "./components/scanning/ScanScreen";
import Dashboard from "./components/dashboard/Dashboard";
import Success from "./components/auth/Success";
import TinderStyle from "./components/tinder/TinderStyle";
import ShoppingScreen from "./components/shopping/ShoppingScreen";
import ShoppingListAutomation from "./components/shopping/ShoppingListAutomation";
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
import NotificationTestPage from "./components/test/NotificationTestPage";

/**
 * Protected route component that redirects to login if not authenticated
 */
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated, isOnboardingCompleted } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated && !isOnboardingCompleted && !location.pathname.includes('/onboarding')) {
    return <Navigate to="/onboarding/1" replace />;
  }

  return <>{element}</>;
};

/**
 * Main application component handling routing and navigation
 */
const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isOnboardingCompleted, completeOnboarding } = useAuth();

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
    completeOnboarding();
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

  // Determine if bottom navigation should be shown
  const shouldShowBottomNav = () => {
    return (
      isAuthenticated && 
      isOnboardingCompleted && 
      !location.pathname.includes('/onboarding') && 
      !location.pathname.includes('/welcome') &&
      !location.pathname.includes('/setup') &&
      !location.pathname.includes('/login') &&
      !location.pathname.includes('/signup') &&
      !location.pathname.includes('/forgot-password')
    );
  };

  const getScreenTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Home';
      case '/recipes':
        return 'Recipes';
      case '/scan':
        return 'Scan';
      case '/shopping-list':
        return 'Shopping';
      case '/advanced':
        return 'More';
      default:
        return '';
    }
  };

  return (
    <div style={{
      width: '393px', // iPhone 16 Pro width
      height: '852px', // iPhone 16 Pro height
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: colors.background,
      borderRadius: '44px', // iPhone 16 Pro corner radius
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      border: '10px solid #000' // Simulate device frame
    }}>
      <div style={{ 
        height: '100%', 
        overflowY: 'auto',
        paddingBottom: shouldShowBottomNav() ? '60px' : '0'
      }}>
        {/* Global App Header with Notification Bell */}
        {isAuthenticated && isOnboardingCompleted && !location.pathname.includes('/welcome') && 
         !location.pathname.includes('/setup') && !location.pathname.includes('/login') && 
         !location.pathname.includes('/signup') && !location.pathname.includes('/forgot-password') && (
          <AppHeader title={getScreenTitle(location.pathname)} />
        )}
        
        <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Onboarding Routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/onboarding/:step" element={<Onboarding onComplete={handleOnboardingComplete} />} />
        <Route path="/success" element={<Success />} />
        
        {/* Protected App Routes */}
        <Route path="/" element={<ProtectedRoute element={<HomeScreen />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/recipes" element={<ProtectedRoute element={<RecipesScreen />} />} />
        <Route path="/recipes/:id" element={<ProtectedRoute element={<RecipeDetail />} />} />
        <Route path="/scan" element={<ProtectedRoute element={<ScanScreen />} />} />
        <Route path="/shopping-list" element={<ProtectedRoute element={<ShoppingScreen />} />} />
        <Route path="/shopping-list-automation" element={<ProtectedRoute element={<ShoppingListAutomation />} />} />
        <Route path="/pantry" element={<ProtectedRoute element={<PantryInventory />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfileScreen />} />} />
        <Route path="/tinder" element={<ProtectedRoute element={<TinderStyle />} />} />
        
        {/* Advanced Features */}
        <Route path="/advanced" element={<ProtectedRoute element={<AdvancedFeaturesScreen />} />} />
        <Route path="/price-comparison" element={<ProtectedRoute element={<PriceComparison />} />} />
        <Route path="/store-finder" element={<ProtectedRoute element={<StoreFinder />} />} />
        <Route path="/meal-planning" element={<ProtectedRoute element={<MealPlanningCalendar />} />} />
        <Route path="/smart-calendar" element={<ProtectedRoute element={<SmartCalendar />} />} />
        <Route path="/dietary-preferences" element={<ProtectedRoute element={<DietaryPreferences />} />} />
        
        {/* Demo Routes */}
        <Route path="/ui-enhancements" element={<ProtectedRoute element={<UIEnhancementsDemo />} />} />
        <Route path="/basic-demo" element={<ProtectedRoute element={<BasicDemo />} />} />
        <Route path="/notification-test" element={<ProtectedRoute element={<NotificationTestPage />} />} />
        
        {/* Additional Routes */}
        <Route path="/search" element={<ProtectedRoute element={<SearchScreen />} />} />
        <Route path="/categories" element={<ProtectedRoute element={<CategoriesScreen />} />} />
        <Route path="/categories/:id" element={<ProtectedRoute element={<CategoryDetail />} />} />
        <Route path="/featured" element={<ProtectedRoute element={<FeaturedScreen />} />} />
        <Route path="/popular" element={<ProtectedRoute element={<PopularScreen />} />} />
        <Route path="/notifications" element={<ProtectedRoute element={<NotificationsScreen />} />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>

      {/* Bottom Navigation */}
      {shouldShowBottomNav() && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          width: '373px', // iPhone 16 Pro width minus border (393px - 20px)
          margin: '0 auto',
          backgroundColor: colors.white,
          display: 'flex',
          justifyContent: 'space-around',
          padding: `${spacing.sm} 0`,
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 100,
          borderRadius: '0 0 34px 34px' // Match iPhone 16 Pro corner radius minus border
        }}>
          {primaryNavItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: spacing.sm,
                cursor: 'pointer',
                color: location.pathname === item.path ? colors.primary : colors.darkGray,
                transition: 'color 0.2s ease'
              }}
            >
              {item.icon()}
              <span style={{ fontSize: '12px', marginTop: '4px' }}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Root application component with all providers
 */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <ThemeProvider>
          <OfflineProvider>
            <AnimationProvider>
              <ToastProvider>
                <TourProvider>
                  <NotificationProvider>
                    <AppContent />
                  </NotificationProvider>
                </TourProvider>
              </ToastProvider>
            </AnimationProvider>
          </OfflineProvider>
        </ThemeProvider>
      </LoadingProvider>
    </AuthProvider>
  );
};

export { App };
