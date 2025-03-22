import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Text,
  Flex,
  Button,
  Card,
  colors,
  spacing,
  shadows,
  borderRadius,
  Divider,
  Badge,
  animation,
  BottomNavigation
} from "../ui/KitchenStoriesDesign";
import { 
  ArrowLeft, 
  Clock, 
  Heart, 
  Share2, 
  BookmarkPlus, 
  Star, 
  User, 
  Plus, 
  ArrowRight, 
  ChevronRight, 
  AlertTriangle, 
  Award, 
  Zap, 
  Check,
  Home,
  Book,
  ShoppingCart
} from 'lucide-react';

// Sample recipe data
const recipeData = {
  id: 1,
  title: 'Super-Nutrient Avocado Toast',
  image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=580&q=80',
  duration: '20 min',
  difficulty: 'Easy',
  category: 'Breakfast',
  author: 'Jamie Oliver',
  rating: 4.8,
  reviews: 243,
  description: 'Start your day with this nutrient-packed breakfast that offers antioxidants, healthy fats, and complete proteins. It\'s the perfect energy boost for a productive morning!',
  ingredients: [
    { name: 'Whole Grain Bread', amount: '2 slices', inPantry: true, benefit: 'Fiber & Sustained Energy' },
    { name: 'Organic Avocado', amount: '1 ripe', inPantry: true, benefit: 'Healthy Fats' },
    { name: 'Free-Range Eggs', amount: '2 large', inPantry: true, benefit: 'Protein & Nutrients' },
    { name: 'Extra Virgin Olive Oil', amount: '1 tbsp', inPantry: true, benefit: 'Antioxidants' },
    { name: 'Himalayan Pink Salt', amount: 'to taste', inPantry: true, benefit: 'Minerals' },
    { name: 'Freshly Ground Black Pepper', amount: 'to taste', inPantry: true, benefit: 'Digestive Aid' },
    { name: 'Organic Red Pepper Flakes', amount: 'a pinch', inPantry: false, benefit: 'Metabolism Boost' },
    { name: 'Fresh Lemon Juice', amount: '1 tsp', inPantry: false, benefit: 'Vitamin C' }
  ],
  steps: [
    {
      id: 1,
      description: 'Toast the whole grain bread slices until golden brown and crispy.',
      image: 'https://images.unsplash.com/photo-1619535860434-ba883a342993?auto=format&fit=crop&w=580&q=80'
    },
    {
      id: 2,
      description: 'Cut the avocado in half, remove the pit, and scoop the flesh into a bowl. Mash with a fork and season with salt, pepper, and lemon juice.',
      image: 'https://images.unsplash.com/photo-1592921550468-78783c7c5659?auto=format&fit=crop&w=580&q=80'
    },
    {
      id: 3,
      description: 'Spread the mashed avocado evenly on the toast slices.',
      image: 'https://images.unsplash.com/photo-1603046891744-9ad15ced084a?auto=format&fit=crop&w=580&q=80'
    },
    {
      id: 4,
      description: 'Bring a pot of water to a simmer. Add a splash of vinegar. Crack an egg into a small dish, then gently slide it into the simmering water. Poach for 3-4 minutes.',
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=580&q=80'
    },
    {
      id: 5,
      description: 'Using a slotted spoon, remove the poached egg and place it on top of the avocado toast. Repeat with the second egg.',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=580&q=80'
    },
    {
      id: 6,
      description: 'Season with salt, pepper, and red pepper flakes if desired. Serve immediately and enjoy the nutrients!',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=580&q=80'
    }
  ],
  nutrition: {
    calories: 350,
    protein: 14,
    carbs: 30,
    fat: 22,
    fiber: 8
  },
  healthBenefits: [
    "Rich in heart-healthy monounsaturated fats",
    "High in fiber for digestive health",
    "Excellent source of complete protein",
    "Contains essential vitamins and minerals"
  ]
};

export default function RecipeDetail() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('ingredients');
  const [currentStep, setCurrentStep] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Navigation items - using window.location.pathname for determining active state
  const navigationItems = [
    { 
      icon: <Home />, 
      label: 'Home', 
      isActive: path === '/' || path.includes('/recipe/'),
      onClick: () => navigate('/') 
    },
    { 
      icon: <Book />, 
      label: 'Recipes', 
      isActive: path === '/recipes' || path.includes('/category/'),
      onClick: () => navigate('/recipes') 
    },
    { 
      icon: <Plus />, 
      label: 'Scan', 
      isActive: path === '/scan',
      onClick: () => navigate('/scan') 
    },
    { 
      icon: <ShoppingCart />, 
      label: 'Shopping', 
      isActive: path === '/shopping' || path.includes('/shopping/'),
      onClick: () => navigate('/shopping') 
    },
    { 
      icon: <User />, 
      label: 'Profile', 
      isActive: path === '/profile',
      onClick: () => navigate('/profile') 
    }
  ];
  
  // Get recipe data based on ID
  const recipe = recipeData; // In a real app, we would fetch by ID
  
  // Missing ingredients that need to be added to shopping list
  const missingIngredients = recipe.ingredients.filter(ing => !ing.inPantry);
  
  return (
    <Container 
      style={{ 
        padding: 0,
        maxWidth: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}
    >
      {/* Hero image with back button */}
      <div style={{ position: 'relative' }}>
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          style={{ 
            width: '100%', 
            height: '270px',
            objectFit: 'cover',
          }}
        />
        
        {/* Overlay for gradient and buttons */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.7) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: spacing.md
        }}>
          {/* Top bar */}
          <Flex justify="space-between">
            <button 
              onClick={() => navigate(-1)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                boxShadow: shadows.sm,
                transition: `all ${animation.fast} ${animation.easing}`,
              }}
            >
              <ArrowLeft color="white" size={22} />
            </button>
            
            <Flex gap={spacing.sm}>
              <button 
                onClick={() => setLiked(!liked)}
                style={{
                  backgroundColor: liked ? `${colors.accent1}80` : 'rgba(255,255,255,0.25)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                  boxShadow: shadows.sm,
                  transition: `all ${animation.fast} ${animation.easing}`,
                }}
              >
                <Heart color={liked ? "#FFFFFF" : "white"} fill={liked ? "#FFFFFF" : "none"} size={22} />
              </button>
              
              <button 
                onClick={() => setSaved(!saved)}
                style={{
                  backgroundColor: saved ? `${colors.primary}80` : 'rgba(255,255,255,0.25)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                  boxShadow: shadows.sm,
                  transition: `all ${animation.fast} ${animation.easing}`,
                }}
              >
                <BookmarkPlus color={saved ? "#FFFFFF" : "white"} fill={saved ? "#FFFFFF" : "none"} size={22} />
              </button>
              
              <button 
                onClick={() => {/* Share functionality */}}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                  boxShadow: shadows.sm,
                  transition: `all ${animation.fast} ${animation.easing}`,
                }}
              >
                <Share2 color="white" size={22} />
              </button>
            </Flex>
          </Flex>
          
          {/* Category badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{
              backgroundColor: colors.primary,
              color: colors.white,
              borderRadius: borderRadius.xl,
              padding: `${spacing.xs} ${spacing.sm}`,
              fontSize: '14px',
              fontWeight: 600,
              boxShadow: shadows.sm,
              display: 'inline-block',
            }}>
              {recipe.category}
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: borderRadius.md,
              padding: `${spacing.xs} ${spacing.sm}`,
              backdropFilter: 'blur(4px)',
            }}>
              <Star size={16} color={colors.accent1} fill={colors.accent1} style={{ marginRight: '4px' }} />
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>{recipe.rating}</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginLeft: '4px' }}>({recipe.reviews})</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recipe content */}
      <Container style={{ 
        padding: `${spacing.md} ${spacing.md} ${spacing.xxl}`, 
        background: colors.surface
      }}>
        <div style={{ 
          overflowY: 'auto', 
          paddingBottom: spacing.xxl 
        }}>
          {/* Recipe title and quick info */}
          <Text variant="h1" style={{ margin: `0 0 ${spacing.sm}` }}>{recipe.title}</Text>
          
          <Flex justify="space-between" align="center" style={{ margin: `0 0 ${spacing.md}` }}>
            <Flex align="center" gap={spacing.xs}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: colors.secondary,
              }}>
                <Clock size={18} style={{ marginRight: '4px' }} />
                <Text variant="body2" color={colors.secondary}>{recipe.duration}</Text>
              </div>
              <Text variant="body2" color={colors.darkGray}>•</Text>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: `${spacing.xs} ${spacing.sm}`,
                backgroundColor: recipe.difficulty === 'Easy' ? 
                  `${colors.success}15` : 
                  recipe.difficulty === 'Medium' ? 
                  `${colors.accent1}15` : 
                  `${colors.error}15`,
                borderRadius: borderRadius.sm,
              }}>
                <Text 
                  variant="body2" 
                  color={recipe.difficulty === 'Easy' ? 
                    colors.success : 
                    recipe.difficulty === 'Medium' ? 
                    colors.accent1 : 
                    colors.error
                  }
                >
                  {recipe.difficulty}
                </Text>
              </div>
            </Flex>
            
            <Flex align="center" gap={spacing.xs}>
              <User size={18} color={colors.secondary} />
              <Text variant="body2" color={colors.secondary}>{recipe.author}</Text>
            </Flex>
          </Flex>
          
          {/* Health benefits callout */}
          <Card 
            style={{
              padding: spacing.md, 
              margin: `0 0 ${spacing.lg}`,
              background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent2}15)`,
              borderRadius: borderRadius.lg,
              boxShadow: shadows.sm
            }}
          >
            <Flex align="center" gap={spacing.xs} style={{ margin: `0 0 ${spacing.sm}` }}>
              <Award size={20} color={colors.primary} />
              <Text variant="h3" color={colors.onBackground}>Health Benefits</Text>
            </Flex>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: spacing.sm,
            }}>
              {recipe.healthBenefits.map((benefit, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: `${spacing.xs} ${spacing.sm}`,
                  borderRadius: borderRadius.md,
                  backgroundColor: `${colors.primary}15`,
                  border: `1px solid ${colors.primary}30`,
                }}>
                  <Zap size={14} color={colors.primary} style={{ marginRight: '4px' }} />
                  <Text variant="caption" color={colors.onBackground}>{benefit}</Text>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Description */}
          <Text variant="body1" style={{ margin: `0 0 ${spacing.lg}` }}>{recipe.description}</Text>
          
          {/* Tab navigation */}
          <div style={{
            display: 'flex',
            borderBottom: `1px solid ${colors.divider}`,
            position: 'relative',
            marginBottom: spacing.md
          }}>
            <div
              onClick={() => setActiveTab('ingredients')}
              style={{
                padding: `${spacing.sm} ${spacing.md}`,
                cursor: 'pointer',
                position: 'relative',
                fontWeight: activeTab === 'ingredients' ? 600 : 400,
                color: activeTab === 'ingredients' ? colors.primary : colors.onBackground,
              }}
            >
              Ingredients
              {activeTab === 'ingredients' && (
                <div style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: colors.primary,
                  borderRadius: '2px 2px 0 0',
                  transition: `all ${animation.medium} ${animation.easing}`,
                }} />
              )}
            </div>
            <div
              onClick={() => setActiveTab('instructions')}
              style={{
                padding: `${spacing.sm} ${spacing.md}`,
                cursor: 'pointer',
                position: 'relative',
                fontWeight: activeTab === 'instructions' ? 600 : 400,
                color: activeTab === 'instructions' ? colors.primary : colors.onBackground,
              }}
            >
              Instructions
              {activeTab === 'instructions' && (
                <div style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: colors.primary,
                  borderRadius: '2px 2px 0 0',
                  transition: `all ${animation.medium} ${animation.easing}`,
                }} />
              )}
            </div>
            <div
              onClick={() => setActiveTab('nutrition')}
              style={{
                padding: `${spacing.sm} ${spacing.md}`,
                cursor: 'pointer',
                position: 'relative',
                fontWeight: activeTab === 'nutrition' ? 600 : 400,
                color: activeTab === 'nutrition' ? colors.primary : colors.onBackground,
              }}
            >
              Nutrition
              {activeTab === 'nutrition' && (
                <div style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: colors.primary,
                  borderRadius: '2px 2px 0 0',
                  transition: `all ${animation.medium} ${animation.easing}`,
                }} />
              )}
            </div>
          </div>
          
          {/* Tab content */}
          {activeTab === 'ingredients' && (
            <div>
              <Flex justify="space-between" align="center" style={{ margin: `0 0 ${spacing.sm}` }}>
                <Text variant="h3">Ingredients ({recipe.ingredients.length})</Text>
                {missingIngredients.length > 0 && (
                  <Button 
                    variant="outlined"
                    size="small"
                    onClick={() => {/* Add to shopping list */}}
                    icon={<Plus size={16} />}
                  >
                    Add Missing Items
                  </Button>
                )}
              </Flex>
              
              {recipe.ingredients.map((ingredient, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: `${spacing.sm} 0`,
                    borderBottom: `1px solid ${colors.divider}`,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Flex align="center" gap={spacing.xs}>
                      <Text variant="body1" color={ingredient.inPantry ? colors.onBackground : colors.midGray}>
                        {ingredient.name}
                      </Text>
                      {!ingredient.inPantry && (
                        <div style={{ 
                          fontSize: '12px', 
                          backgroundColor: `${colors.error}15`, 
                          color: colors.error,
                          padding: `2px ${spacing.xs}`,
                          borderRadius: borderRadius.xs,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}>
                          <AlertTriangle size={12} />
                          Missing
                        </div>
                      )}
                    </Flex>
                    <Flex align="center" gap={spacing.xs} style={{ margin: `${spacing.xs} 0 0` }}>
                      <Text variant="caption" color={colors.midGray}>{ingredient.amount}</Text>
                      <Text variant="caption" color={colors.midGray}>•</Text>
                      <Text variant="caption" color={colors.primary}>{ingredient.benefit}</Text>
                    </Flex>
                  </div>
                  
                  <div>
                    {ingredient.inPantry ? (
                      <div style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        backgroundColor: `${colors.success}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Check size={16} color={colors.success} />
                      </div>
                    ) : (
                      <button
                        onClick={() => {/* Add to shopping list */}}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: colors.surface,
                          border: `1px solid ${colors.primary}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Plus size={16} color={colors.primary} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'instructions' && (
            <div>
              <Text variant="h3" style={{ margin: `0 0 ${spacing.md}` }}>Step by Step</Text>
              
              {recipe.steps.map((step, index) => (
                <div 
                  key={index}
                  style={{
                    marginBottom: spacing.lg,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: spacing.md,
                    marginBottom: spacing.sm,
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: `${colors.secondary}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Text variant="body2" color={colors.secondary}>{step.id}</Text>
                    </div>
                    
                    <Text variant="body1">{step.description}</Text>
                  </div>
                  
                  <div style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: borderRadius.lg,
                    overflow: 'hidden',
                    marginLeft: '28px',
                  }}>
                    <img 
                      src={step.image} 
                      alt={`Step ${step.id}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'nutrition' && (
            <div>
              <Text variant="h3" style={{ margin: `0 0 ${spacing.md}` }}>Nutrition Facts</Text>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: spacing.md,
              }}>
                <Card 
                  style={{
                    padding: spacing.md, 
                    borderRadius: borderRadius.md,
                    background: `${colors.accent1}10`
                  }}
                >
                  <Text variant="body2" color={colors.darkGray} style={{ margin: `0 0 ${spacing.xs}` }}>Calories</Text>
                  <Flex align="center" gap={spacing.xs}>
                    <Text variant="h2" color={colors.accent1}>{recipe.nutrition.calories}</Text>
                    <Text variant="body2" color={colors.midGray}>kcal</Text>
                  </Flex>
                </Card>
                
                <Card 
                  style={{
                    padding: spacing.md, 
                    borderRadius: borderRadius.md,
                    background: `${colors.accent1}10`
                  }}
                >
                  <Text variant="body2" color={colors.darkGray} style={{ margin: `0 0 ${spacing.xs}` }}>Protein</Text>
                  <Flex align="center" gap={spacing.xs}>
                    <Text variant="h2" color={colors.accent1}>{recipe.nutrition.protein}</Text>
                    <Text variant="body2" color={colors.midGray}>g</Text>
                  </Flex>
                </Card>
                
                <Card 
                  style={{
                    padding: spacing.md, 
                    borderRadius: borderRadius.md,
                    background: `${colors.accent1}10`
                  }}
                >
                  <Text variant="body2" color={colors.darkGray} style={{ margin: `0 0 ${spacing.xs}` }}>Carbs</Text>
                  <Flex align="center" gap={spacing.xs}>
                    <Text variant="h2" color={colors.accent1}>{recipe.nutrition.carbs}</Text>
                    <Text variant="body2" color={colors.midGray}>g</Text>
                  </Flex>
                </Card>
                
                <Card 
                  style={{
                    padding: spacing.md, 
                    borderRadius: borderRadius.md,
                    background: `${colors.accent1}10`
                  }}
                >
                  <Text variant="body2" color={colors.darkGray} style={{ margin: `0 0 ${spacing.xs}` }}>Fats</Text>
                  <Flex align="center" gap={spacing.xs}>
                    <Text variant="h2" color={colors.accent1}>{recipe.nutrition.fat}</Text>
                    <Text variant="body2" color={colors.midGray}>g</Text>
                  </Flex>
                </Card>
                
                <Card 
                  style={{
                    padding: spacing.md, 
                    borderRadius: borderRadius.md,
                    background: `${colors.accent1}10`
                  }}
                >
                  <div style={{ gridColumn: '1 / span 2' }}>
                    <Text variant="body2" color={colors.darkGray} style={{ margin: `0 0 ${spacing.xs}` }}>Fiber</Text>
                    <Flex align="center" gap={spacing.xs}>
                      <Text variant="h2" color={colors.accent1}>{recipe.nutrition.fiber}</Text>
                      <Text variant="body2" color={colors.midGray}>g</Text>
                    </Flex>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </Container>
      
      {/* Bottom Navigation */}
      <BottomNavigation items={navigationItems.map(item => ({
        ...item,
        color: item.isActive ? colors.accent1 : colors.textSecondary,
        borderBottom: item.isActive ? `2px solid ${colors.accent1}` : 'none',
      }))} />
    </Container>
  );
}
