import React from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import './App.css';
import HomeScreen from "./components/pages/HomeScreen";
import RecipeDetail from "./components/recipes/RecipeDetail";
import PantryInventory from "./components/pantry/PantryInventory";
import ShoppingList from "./components/shopping/ShoppingList";
import RecipesScreen from "./components/recipes/RecipesScreen";
import ScanScreen from "./components/scanning/ScanScreen";
import ProfileScreen from "./components/profile/ProfileScreen";
import { colors, spacing } from './components/ui/KitchenStoriesDesign';
import { Home as HomeIcon, BookOpen, Camera, ShoppingCart, User } from 'lucide-react';
import Home from "./components/pages/home";
import OnboardingFlow from "./components/onboarding/OnboardingFlow";
import MobileAppPreview from "./components/mobile/MobileAppPreview";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import TinderStyle from "./components/pages/TinderStyle";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Helper to check current route
  const isRoute = (path: string) => location.pathname === path;
  const isRecipeRouteActive = () => location.pathname === '/recipes' || location.pathname.startsWith('/recipe/');
  
  // Determine if this is a mobile app route (Kitchen Stories style pages)
  const isMobileAppRoute = () => [
    '/', '/recipe', '/pantry', '/shopping', '/recipes', '/profile', '/scan', 
    '/categories', '/popular', '/search', '/shopping/add'
  ].some(path => 
    path === '/' ? location.pathname === path : location.pathname.startsWith(path)
  );

  // Navigation items
  const navigationItems = [
    {
      icon: <HomeIcon />,
      label: 'Home',
      isActive: isRoute('/'),
      onClick: () => navigate('/'),
    },
    {
      icon: <BookOpen />,
      label: 'Recipes',
      isActive: isRecipeRouteActive(),
      onClick: () => navigate('/recipes'),
    },
    {
      icon: <Camera />,
      label: 'Scan',
      isActive: isRoute('/scan'),
      onClick: () => navigate('/scan'),
    },
    {
      icon: <ShoppingCart />,
      label: 'Shopping',
      isActive: isRoute('/shopping'),
      onClick: () => navigate('/shopping'),
    },
    {
      icon: <User />,
      label: 'Profile',
      isActive: isRoute('/profile'),
      onClick: () => navigate('/profile'),
    },
  ];

  return (
    <>
      {/* Mobile App Container with fixed bottom navigation */}
      {isMobileAppRoute() && (
        <div
          style={{
            width: '100%',
            maxWidth: '375px',
            height: '812px', 
            margin: '0 auto',
            border: '10px solid #222',
            borderRadius: '36px',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: colors.background,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Status Bar */}
          <div style={{ 
            height: '44px', 
            backgroundColor: '#222', 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px',
            color: 'white',
            fontSize: '14px',
            flexShrink: 0,
          }}>
            <div>9:41</div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '4px',
            }}>
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>
          
          {/* Main Content - Scrollable */}
          <div className="hide-scrollbar" style={{ 
            flex: 1,
            overflowY: 'auto',
            paddingBottom: '70px',
          }}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/pantry" element={<PantryInventory />} />
              <Route path="/shopping" element={<ShoppingList />} />
              <Route path="/recipes" element={<RecipesScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/scan" element={<ScanScreen />} />
              <Route path="/categories" element={<Navigate to="/" />} />
              <Route path="/popular" element={<Navigate to="/" />} />
              <Route path="/category/:name" element={<Navigate to="/" />} />
              <Route path="/search" element={<Navigate to="/" />} />
              <Route path="/shopping/add" element={<ShoppingList />} />
            </Routes>
          </div>
          
          {/* Fixed Bottom Navigation */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70px',
            backgroundColor: colors.white,
            borderTop: `1px solid ${colors.divider}`,
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            zIndex: 100,
          }}>
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  height: '100%',
                  padding: `${spacing.xs} ${spacing.sm}`,
                  flex: 1,
                  transition: 'all 0.2s ease',
                  transform: item.isActive ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: spacing.xs,
                  color: item.isActive ? colors.primary : colors.darkGray,
                  transition: 'all 0.2s ease',
                  transform: item.isActive ? 'scale(1.1)' : 'scale(1)',
                }}>
                  {React.cloneElement(item.icon as React.ReactElement, { 
                    size: 24
                  })}
                </div>
                
                <div
                  style={{
                    color: item.isActive ? colors.primary : colors.darkGray,
                    fontWeight: item.isActive ? 600 : 400,
                    fontSize: '12px',
                    textAlign: 'center',
                  }}
                >
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Original routes (for non-mobile routes) */}
      {!isMobileAppRoute() && (
        <Routes>
          <Route path="/mobile" element={<MobileAppPreview />} />
          <Route path="/tinder" element={<TinderStyle />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/onboarding"
            element={
              <OnboardingFlow onComplete={() => {
                localStorage.setItem("hasCompletedOnboarding", "true");
                window.location.href = "/";
              }} />
            }
          />
          <Route path="/app" element={<MobileAppPreview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      )}
    </>
  );
}

export default App;
