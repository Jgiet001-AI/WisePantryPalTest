import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Divider,
  colors,
  spacing,
  shadows,
  borderRadius,
  Button,
  animation,
} from '../ui/KitchenStoriesDesign';
import { 
  Home, 
  Book, 
  Plus, 
  ShoppingCart, 
  User,
  Settings,
  Bell,
  Heart,
  HelpCircle,
  LogOut,
  ChevronRight,
  Award,
  Clock,
  Calendar,
  Leaf,
  Edit3,
  Camera,
  CheckCircle,
  Utensils,
  DollarSign,
  Trash2,
  Share2,
  Github,
  AlertTriangle,
  LifeBuoy,
  Map
} from 'lucide-react';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');
  const [animateIn, setAnimateIn] = useState(false);

  // Effect for entrance animation
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Navigation items
  const navigationItems = [
    { 
      icon: <Home size={24} />, 
      label: 'Home', 
      isActive: path === '/' || path.includes('/recipe/'),
      onClick: () => navigate('/') 
    },
    { 
      icon: <Book size={24} />, 
      label: 'Recipes', 
      isActive: path === '/recipes' || path.includes('/category/'),
      onClick: () => navigate('/recipes') 
    },
    { 
      icon: <Plus size={24} />, 
      label: 'Scan', 
      isActive: path === '/scan',
      onClick: () => navigate('/scan') 
    },
    { 
      icon: <ShoppingCart size={24} />, 
      label: 'Shopping', 
      isActive: path === '/shopping' || path.includes('/shopping/'),
      onClick: () => navigate('/shopping') 
    },
    { 
      icon: <User size={24} />, 
      label: 'Profile', 
      isActive: path === '/profile',
      onClick: () => navigate('/profile') 
    }
  ];

  // Enhanced user data with more details
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    joinDate: 'Joined March 2023',
    bio: 'Passionate about healthy cooking and reducing food waste. I love trying new recipes and sharing my kitchen adventures!',
    dietPreferences: ['Vegetarian', 'Low Carb', 'High Protein', 'Gluten-Free'],
    allergies: ['Peanuts', 'Shellfish'],
    achievements: [
      { id: 1, title: 'Meal Planner', description: 'Planned meals for an entire week', icon: <Calendar size={20} color={colors.white} />, date: '2 weeks ago', progress: 100 },
      { id: 2, title: 'Zero Waste Hero', description: 'No food waste for 30 days', icon: <Leaf size={20} color={colors.white} />, date: '1 month ago', progress: 100 },
      { id: 3, title: 'Recipe Master', description: 'Created 10 original recipes', icon: <Award size={20} color={colors.white} />, date: '3 months ago', progress: 100 },
      { id: 4, title: 'Shopping Pro', description: 'Used shopping list 20 times', icon: <ShoppingCart size={20} color={colors.white} />, date: 'In progress', progress: 75 }
    ],
    stats: {
      mealsSaved: 28,
      wasteSaved: '22 lbs',
      moneySaved: '$185',
      recipesCreated: 8,
      shoppingTrips: 15
    },
    favoriteRecipes: [
      { id: 1, name: 'Avocado Toast', mealType: 'Breakfast' },
      { id: 2, name: 'Veggie Stir Fry', mealType: 'Dinner' },
      { id: 3, name: 'Berry Smoothie', mealType: 'Snack' }
    ]
  });

  // Advanced features list
  const advancedFeatures = [
    { 
      icon: <DollarSign size={20} color={colors.primary} />, 
      title: 'Price Comparison', 
      description: 'Compare prices across stores and get alerts on deals',
      onClick: () => navigate('/price-comparison') 
    },
    { 
      icon: <Map size={20} color={colors.primary} />, 
      title: 'Store Finder', 
      description: 'Find stores near you with the best prices and selection',
      onClick: () => navigate('/store-finder') 
    },
    { 
      icon: <Utensils size={20} color={colors.primary} />, 
      title: 'Meal Planning', 
      description: 'Plan your meals for the week based on your pantry',
      onClick: () => navigate('/meal-planning') 
    },
    { 
      icon: <Calendar size={20} color={colors.primary} />, 
      title: 'Smart Calendar', 
      description: 'Track expiration dates and schedule cooking times',
      onClick: () => navigate('/calendar') 
    },
    { 
      icon: <Settings size={20} color={colors.primary} />, 
      title: 'Dietary Preferences', 
      description: 'Set your diet preferences and allergies',
      onClick: () => navigate('/dietary-preferences') 
    },
  ];

  const menuItems = [
    { icon: <Bell size={22} color={colors.secondary} />, title: 'Notifications', onClick: () => {}, badge: 3 },
    { icon: <Settings size={22} color={colors.secondary} />, title: 'Settings', onClick: () => {} },
    { icon: <Heart size={22} color={colors.secondary} />, title: 'Saved Recipes', onClick: () => navigate('/recipes'), badge: 12 },
    { icon: <HelpCircle size={22} color={colors.secondary} />, title: 'Help & Support', onClick: () => {} },
    { icon: <Share2 size={22} color={colors.secondary} />, title: 'Invite Friends', onClick: () => {} },
    { icon: <LogOut size={22} color={colors.secondary} />, title: 'Logout', onClick: () => {} },
  ];

  const handleSaveEdit = () => {
    // In a real app, you would save changes to the backend here
    setIsEditing(false);
  };

  return (
    <div
      style={{
        backgroundColor: colors.background,
        minHeight: '100%',
      }}
    >
      {/* Profile Header - Card Style with Animation */}
      <div 
        style={{
          position: 'relative',
          padding: `${spacing.lg} ${spacing.md}`,
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
          color: colors.white,
          transform: animateIn ? 'translateY(0)' : 'translateY(-20px)',
          opacity: animateIn ? 1 : 0,
          transition: `all 0.5s ${animation.easing}`,
          boxShadow: shadows.lg,
          marginBottom: spacing.lg,
        }}
      >
        {/* Top Actions */}
        <Flex justify="space-between" margin={`0 0 ${spacing.xl}`}>
          <div 
            onClick={() => navigate(-1)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: spacing.xs }}
          >
            <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
            <Text variant="body2" color={colors.white}>Back</Text>
          </div>
          <div
            onClick={() => {}}
            style={{ cursor: 'pointer' }}
          >
            <Settings size={22} />
          </div>
        </Flex>
        
        {/* Profile Info */}
        <Flex direction="column" align="center" gap={spacing.md} 
          style={{
            textAlign: 'center',
            marginBottom: spacing.md
          }}
        >
          {/* Profile Photo with Floating Edit Button */}
          <div style={{ 
            position: 'relative',
            marginBottom: spacing.sm
          }}>
            <div style={{ 
              width: '110px',
              height: '110px',
              borderRadius: borderRadius.circle,
              backgroundColor: colors.surface,
              overflow: 'hidden',
              border: `4px solid ${colors.white}`,
              boxShadow: shadows.md,
            }}>
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80" 
                alt="Profile" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '5px',
                right: '0px',
                backgroundColor: colors.white,
                borderRadius: borderRadius.circle,
                width: '32px',
                height: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: shadows.md,
              }}
            >
              <Camera size={16} color={colors.primary} />
            </div>
          </div>

          {/* User Info */}
          {isEditing ? (
            <input
              defaultValue={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                border: 'none',
                borderBottom: `1px solid ${colors.white}60`,
                padding: spacing.xs,
                background: 'transparent',
                width: '100%',
                maxWidth: '250px',
                outline: 'none',
                color: colors.white,
              }}
            />
          ) : (
            <Text 
              variant="h2" 
              color={colors.white} 
              style={{
                marginBottom: 0,
                fontWeight: 700,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {userData.name}
            </Text>
          )}
          
          <Text 
            variant="body2" 
            color={colors.white} 
            style={{ 
              opacity: 0.9,
              marginTop: 0
            }}
          >
            {userData.joinDate}
          </Text>
          
          {isEditing ? (
            <Button 
              variant="filled" 
              style={{
                marginTop: spacing.sm,
                backgroundColor: colors.white,
                color: colors.primary,
              }}
              onClick={handleSaveEdit}
            >
              Save Profile
            </Button>
          ) : (
            <div 
              onClick={() => setIsEditing(true)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: spacing.xs,
                cursor: 'pointer',
                padding: `${spacing.xs} ${spacing.sm}`,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: borderRadius.xl,
                marginTop: spacing.xs,
              }}
            >
              <Edit3 size={16} />
              <Text variant="caption" color={colors.white}>Edit Profile</Text>
            </div>
          )}
        </Flex>
      </div>

      {/* Tabs Navigation */}
      <Container padding={`0 ${spacing.md} ${spacing.md}`}>
        <Flex 
          gap={spacing.md} 
          style={{
            width: '100%',
            borderBottom: `1px solid ${colors.divider}`,
            paddingBottom: spacing.xs,
            marginBottom: spacing.lg
          }}
        >
          {[
            { id: 'stats', label: 'Overview' },
            { id: 'diet', label: 'Diet' },
            { id: 'achievements', label: 'Achievements' },
            { id: 'advanced', label: 'Advanced' }
          ].map(tab => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: `${spacing.xs} ${spacing.sm}`,
                borderBottom: activeTab === tab.id ? `2px solid ${colors.primary}` : '2px solid transparent',
                color: activeTab === tab.id ? colors.primary : colors.darkGray,
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer',
                transition: `all 0.3s ${animation.easing}`,
                fontSize: '14px',
                flex: 1,
                textAlign: 'center',
              }}
            >
              {tab.label}
            </div>
          ))}
        </Flex>

        {/* Tab Content */}
        <div style={{
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
          transition: `all 0.6s ${animation.easing}`,
          transitionDelay: '0.1s',
        }}>
          {/* Overview Tab */}
          {activeTab === 'stats' && (
            <>
              {/* Bio Section */}
              <div style={{
                backgroundColor: colors.surface,
                padding: spacing.md,
                borderRadius: borderRadius.lg,
                boxShadow: shadows.sm,
                marginBottom: spacing.lg,
              }}>
                <Text variant="h3" color={colors.onBackground} margin={`0 0 ${spacing.xs}`}>
                  About Me
                </Text>
                <Text variant="body2" color={colors.darkGray}>
                  {userData.bio}
                </Text>
              </div>

              {/* Stats Cards */}
              <Text variant="h3" color={colors.onBackground} margin={`0 0 ${spacing.sm}`}>
                Your Impact
              </Text>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: spacing.md,
                marginBottom: spacing.lg,
              }}>
                <StatCard 
                  icon={<Utensils size={20} />}
                  value={userData.stats.mealsSaved}
                  label="Meals Saved"
                  color="#4CAF50"
                />
                <StatCard 
                  icon={<Trash2 size={20} />}
                  value={userData.stats.wasteSaved}
                  label="Waste Saved"
                  color="#F9A825"
                />
                <StatCard 
                  icon={<DollarSign size={20} />}
                  value={userData.stats.moneySaved}
                  label="Money Saved"
                  color="#03A9F4"
                />
                <StatCard 
                  icon={<Book size={20} />}
                  value={userData.stats.recipesCreated}
                  label="Recipes Created"
                  color="#9C27B0"
                />
              </div>

              {/* Favorite Recipes */}
              <Flex justify="space-between" align="center" margin={`0 0 ${spacing.sm}`}>
                <Text variant="h3" color={colors.onBackground}>
                  Favorite Recipes
                </Text>
                <div 
                  onClick={() => navigate('/recipes')}
                  style={{ cursor: 'pointer' }}
                >
                  <Text 
                    variant="caption" 
                    color={colors.primary}
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    View All
                  </Text>
                </div>
              </Flex>
              
              <div style={{
                backgroundColor: colors.surface,
                borderRadius: borderRadius.lg,
                boxShadow: shadows.sm,
                overflow: 'hidden',
                marginBottom: spacing.lg,
              }}>
                {userData.favoriteRecipes.map((recipe, idx) => (
                  <React.Fragment key={recipe.id}>
                    {idx > 0 && <Divider margin="0" />}
                    <div
                      style={{
                        padding: spacing.md,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      <div>
                        <Text variant="body1" color={colors.onBackground} margin="0">
                          {recipe.name}
                        </Text>
                        <Text variant="caption" color={colors.darkGray}>
                          {recipe.mealType}
                        </Text>
                      </div>
                      <Heart size={18} color={colors.secondary} fill={colors.secondary} />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </>
          )}

          {/* Diet Tab */}
          {activeTab === 'diet' && (
            <>
              {/* Dietary Preferences */}
              <div style={{
                backgroundColor: colors.surface,
                padding: spacing.md,
                borderRadius: borderRadius.lg,
                boxShadow: shadows.sm,
                marginBottom: spacing.lg,
              }}>
                <Flex justify="space-between" align="center" margin={`0 0 ${spacing.sm}`}>
                  <Text variant="h3" color={colors.onBackground}>Dietary Preferences</Text>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: borderRadius.circle,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      backgroundColor: `${colors.primary}10`,
                    }}
                  >
                    <Edit3 size={16} color={colors.primary} />
                  </div>
                </Flex>

                <Flex gap={spacing.xs} wrap="wrap" margin={`0 0 ${spacing.md}`}>
                  {userData.dietPreferences.map((pref, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: `${colors.primary}15`,
                        color: colors.primary,
                        padding: `${spacing.xs} ${spacing.sm}`,
                        borderRadius: borderRadius.xl,
                        fontSize: '14px',
                        marginBottom: spacing.xs,
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.xs,
                      }}
                    >
                      <CheckCircle size={14} />
                      {pref}
                    </div>
                  ))}
                </Flex>

                <div style={{
                  backgroundColor: `${colors.error}10`,
                  padding: spacing.md,
                  borderRadius: borderRadius.md,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing.sm,
                }}>
                  <AlertTriangle size={20} color={colors.error} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <Text 
                      variant="body2" 
                      color={colors.error} 
                      style={{ fontWeight: 600, marginBottom: '2px' }}
                    >
                      Allergies
                    </Text>
                    <Text variant="body2" color={colors.darkGray}>
                      {userData.allergies.join(', ')}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Diet Tips */}
              <div style={{
                backgroundColor: colors.surface,
                padding: spacing.md,
                borderRadius: borderRadius.lg,
                boxShadow: shadows.sm,
              }}>
                <Text variant="h3" color={colors.onBackground} margin={`0 0 ${spacing.sm}`}>
                  Diet Tips
                </Text>
                <Text variant="body2" color={colors.darkGray} margin={`0 0 ${spacing.md}`}>
                  Based on your preferences, here are some personalized tips:
                </Text>
                <div style={{
                  backgroundColor: `${colors.primary}10`,
                  padding: spacing.md,
                  borderRadius: borderRadius.md,
                  marginBottom: spacing.sm,
                }}>
                  <Text variant="body2" color={colors.primary} style={{ fontWeight: 600 }}>
                    Vegetarian Protein Sources
                  </Text>
                  <Text variant="body2" color={colors.darkGray}>
                    Try adding lentils, chickpeas, and tofu to your meals for protein.
                  </Text>
                </div>
                <div style={{
                  backgroundColor: `${colors.secondary}10`,
                  padding: spacing.md,
                  borderRadius: borderRadius.md,
                }}>
                  <Text variant="body2" color={colors.secondary} style={{ fontWeight: 600 }}>
                    Low Carb Alternatives
                  </Text>
                  <Text variant="body2" color={colors.darkGray}>
                    Swap rice for cauliflower rice and pasta for zucchini noodles.
                  </Text>
                </div>
              </div>
            </>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <>
              <Text variant="h3" color={colors.onBackground} margin={`0 0 ${spacing.md}`}>
                Your Achievements
              </Text>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.md,
              }}>
                {userData.achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    style={{
                      backgroundColor: colors.surface,
                      borderRadius: borderRadius.lg,
                      boxShadow: shadows.sm,
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      padding: spacing.md,
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.md,
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: borderRadius.circle,
                        backgroundColor: achievement.progress === 100 ? colors.secondary : colors.darkGray,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {achievement.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <Flex justify="space-between" align="center">
                          <Text variant="body1" color={colors.onBackground} style={{ fontWeight: 600 }}>
                            {achievement.title}
                          </Text>
                          <Text variant="caption" color={colors.darkGray}>
                            {achievement.date}
                          </Text>
                        </Flex>
                        <Text variant="caption" color={colors.darkGray}>
                          {achievement.description}
                        </Text>
                        
                        {/* Progress bar for incomplete achievements */}
                        {achievement.progress < 100 && (
                          <div style={{
                            height: '4px',
                            backgroundColor: `${colors.primary}30`,
                            borderRadius: borderRadius.md,
                            marginTop: spacing.xs,
                            overflow: 'hidden',
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${achievement.progress}%`,
                              backgroundColor: colors.primary,
                              borderRadius: borderRadius.md,
                            }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Advanced Tab */}
          {activeTab === 'advanced' && (
            <>
              <Text variant="h3" color={colors.onBackground} margin={`0 0 ${spacing.md}`}>
                Advanced Features
              </Text>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: spacing.md,
              }}>
                {advancedFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: colors.surface,
                      padding: spacing.md,
                      borderRadius: borderRadius.lg,
                      boxShadow: shadows.sm,
                    }}
                  >
                    <Flex align="center" gap={spacing.md}>
                      {feature.icon}
                      <Text variant="body1" color={colors.onBackground}>{feature.title}</Text>
                    </Flex>
                    <Text variant="body2" color={colors.darkGray} margin={`0 0 ${spacing.md}`}>
                      {feature.description}
                    </Text>
                    <Button 
                      variant="filled" 
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.white,
                      }}
                      onClick={feature.onClick}
                    >
                      Get Started
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>

      {/* Menu Options */}
      <Container padding={`0 ${spacing.md} ${spacing.xxl}`} background={colors.background}>
        <div style={{
          backgroundColor: colors.surface,
          borderRadius: borderRadius.lg,
          boxShadow: shadows.sm,
          overflow: 'hidden',
          marginTop: spacing.md,
        }}>
          {menuItems.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <Divider margin="0" />}
              <div
                style={{
                  padding: spacing.md,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={item.onClick}
              >
                <Flex align="center" gap={spacing.md}>
                  {item.icon}
                  <Text variant="body1" color={colors.onBackground}>{item.title}</Text>
                </Flex>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {item.badge && (
                    <div style={{
                      backgroundColor: colors.primary,
                      color: colors.white,
                      borderRadius: borderRadius.circle,
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      marginRight: spacing.sm,
                    }}>
                      {item.badge}
                    </div>
                  )}
                  <ChevronRight size={18} color={colors.darkGray} />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* App credits */}
        <Flex justify="center" align="center" gap={spacing.xs} margin={`${spacing.xl} 0 0`}>
          <Text variant="caption" color={colors.darkGray} align="center">
            WisePantryPal v1.0
          </Text>
        </Flex>
      </Container>
    </div>
  );
}

// Stat card component
const StatCard = ({ 
  icon, 
  value, 
  label, 
  color = colors.primary 
}: { 
  icon: React.ReactNode, 
  value: string | number, 
  label: string, 
  color?: string 
}) => {
  return (
    <div style={{
      backgroundColor: colors.surface,
      padding: spacing.md,
      borderRadius: borderRadius.lg,
      boxShadow: shadows.sm,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: spacing.xs,
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: borderRadius.circle,
        backgroundColor: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
        marginBottom: spacing.xs,
      }}>
        {icon}
      </div>
      <Text 
        variant="h3" 
        color={color} 
        align="center" 
        style={{ 
          marginBottom: 0, 
          fontSize: '24px',
          fontWeight: 700,
        }}
      >
        {value}
      </Text>
      <Text 
        variant="caption" 
        color={colors.darkGray} 
        align="center" 
        style={{ 
          marginTop: 0,
          fontSize: '12px',
        }}
      >
        {label}
      </Text>
    </div>
  );
};
