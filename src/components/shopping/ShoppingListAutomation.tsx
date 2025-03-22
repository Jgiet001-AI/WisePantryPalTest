import { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Trash2, Check, ShoppingCart, Tag, Store, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  colors,
  spacing,
  shadows,
  borderRadius,
  animation
} from '../ui/KitchenStoriesDesign';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingItem, ShoppingList, ShoppingSource } from '../../types/shopping';
import { PantryItem } from '../../types/pantry';
import './ShoppingStyles.css';

// Define Recipe type here since we don't have the actual file yet
interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  saved: boolean;
  rating: number;
  matchScore: number;
}

// Mock data for pantry items with low inventory
const mockLowInventoryItems: PantryItem[] = [
  { 
    id: 'p1', 
    name: 'Milk', 
    category: 'Dairy', 
    quantity: 0.2, 
    unit: 'gallon',
    purchaseDate: new Date(2025, 2, 10),
    expiryDate: new Date(2025, 3, 5),
    price: 3.99
  },
  { 
    id: 'p2', 
    name: 'Eggs', 
    category: 'Dairy', 
    quantity: 2, 
    unit: 'count',
    purchaseDate: new Date(2025, 2, 15),
    expiryDate: new Date(2025, 3, 10),
    price: 4.49
  },
  { 
    id: 'p3', 
    name: 'Bread', 
    category: 'Bakery', 
    quantity: 0.5, 
    unit: 'loaf',
    purchaseDate: new Date(2025, 2, 18),
    expiryDate: new Date(2025, 3, 1),
    price: 2.99
  }
];

// Mock recipes data
const mockRecipes: Recipe[] = [
  {
    id: "r1",
    title: "Pancakes",
    description: "Fluffy homemade pancakes",
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { name: "Flour", quantity: 2, unit: "cups" },
      { name: "Milk", quantity: 1.5, unit: "cups" },
      { name: "Eggs", quantity: 2, unit: "count" },
      { name: "Baking Powder", quantity: 1, unit: "tbsp" },
      { name: "Sugar", quantity: 2, unit: "tbsp" },
      { name: "Salt", quantity: 0.5, unit: "tsp" },
      { name: "Butter", quantity: 2, unit: "tbsp" }
    ],
    instructions: ["Mix dry ingredients", "Add wet ingredients", "Cook on griddle"],
    tags: ["breakfast", "quick"],
    saved: true,
    rating: 4.8,
    matchScore: 85
  }
];

// Mock shopping sources (stores)
const mockSources: ShoppingSource[] = [
  { id: 's1', name: 'Grocery Plus', price: '0.00' },
  { id: 's2', name: 'Super Mart', price: '0.00' },
  { id: 's3', name: 'Fresh Market', price: '0.00' }
];

interface ShoppingListAutomationProps {
  pantryItems?: PantryItem[];
  recipes?: Recipe[];
}

export default function ShoppingListAutomation({ 
  pantryItems = mockLowInventoryItems,
  recipes = mockRecipes 
}: ShoppingListAutomationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for shopping lists
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([
    {
      id: 'sl1',
      name: 'Weekly Groceries',
      createdAt: new Date(),
      items: [],
      isActive: true
    }
  ]);
  
  // Current active shopping list
  const [activeList, setActiveList] = useState<ShoppingList | null>(null);
  
  // State for showing price comparison
  const [showPriceComparison, setShowPriceComparison] = useState(false);
  
  // State for showing recipe selector
  const [showRecipeSelector, setShowRecipeSelector] = useState(false);
  
  // State for selected recipe
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  // State for new item form
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    unit: '',
    category: ''
  });

  // Initialize active list
  useEffect(() => {
    const active = shoppingLists.find(list => list.isActive);
    if (active) {
      setActiveList(active);
    }
  }, [shoppingLists]);

  // Function to generate shopping list from low inventory items
  const generateFromLowInventory = () => {
    if (!activeList) return;
    
    // Consider items with quantity below 25% as low inventory
    const lowInventoryItems = pantryItems.filter(item => {
      // This is a simplified check - in a real app, you'd have thresholds per item type
      return item.quantity < 0.25;
    });
    
    // Add low inventory items to the shopping list
    const updatedItems = [...activeList.items];
    
    lowInventoryItems.forEach(pantryItem => {
      // Check if item already exists in the list
      const existingItemIndex = updatedItems.findIndex(item => 
        item.name.toLowerCase() === pantryItem.name.toLowerCase()
      );
      
      if (existingItemIndex === -1) {
        // Add new item
        updatedItems.push({
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: pantryItem.name,
          category: pantryItem.category,
          quantity: 1, // Default to 1 for simplicity
          unit: pantryItem.unit,
          price: pantryItem.price,
          inPantry: true,
          isChecked: false,
          sources: mockSources.map(source => ({
            id: source.id,
            name: source.name,
            price: (pantryItem.price * (0.8 + Math.random() * 0.4)).toFixed(2)
          }))
        });
      }
    });
    
    // Update the active list
    const updatedLists = shoppingLists.map(list => {
      if (list.id === activeList.id) {
        return {
          ...list,
          items: updatedItems
        };
      }
      return list;
    });
    
    setShoppingLists(updatedLists);
    setActiveList({
      ...activeList,
      items: updatedItems
    });
  };
  
  // Function to add recipe ingredients to shopping list
  const addRecipeIngredientsToList = (recipe: Recipe) => {
    if (!activeList) return;
    
    const updatedItems = [...activeList.items];
    
    recipe.ingredients.forEach(ingredient => {
      // Check if ingredient already exists in the list
      const existingItemIndex = updatedItems.findIndex(item => 
        item.name.toLowerCase() === ingredient.name.toLowerCase()
      );
      
      if (existingItemIndex === -1) {
        // Add new item
        updatedItems.push({
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: ingredient.name,
          category: 'Other', // Default category
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          price: 0, // Price unknown for recipe ingredients
          inPantry: false,
          isChecked: false,
          sources: mockSources.map(source => ({
            id: source.id,
            name: source.name,
            price: ((2 + Math.random() * 5)).toFixed(2) // Random price for demo
          }))
        });
      } else {
        // Update existing item quantity
        updatedItems[existingItemIndex].quantity += ingredient.quantity;
      }
    });
    
    // Update the active list
    const updatedLists = shoppingLists.map(list => {
      if (list.id === activeList.id) {
        return {
          ...list,
          items: updatedItems
        };
      }
      return list;
    });
    
    setShoppingLists(updatedLists);
    setActiveList({
      ...activeList,
      items: updatedItems
    });
    
    setShowRecipeSelector(false);
    setSelectedRecipe(null);
  };
  
  // Function to add a new item to the list
  const addItemToList = () => {
    if (!activeList || !newItem.name) return;
    
    const updatedItems = [...activeList.items];
    
    // Add new item
    updatedItems.push({
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newItem.name,
      category: newItem.category || 'Other',
      quantity: newItem.quantity,
      unit: newItem.unit,
      price: 0, // Price unknown for manual items
      inPantry: false,
      isChecked: false,
      sources: mockSources.map(source => ({
        id: source.id,
        name: source.name,
        price: ((1 + Math.random() * 6)).toFixed(2) // Random price for demo
      }))
    });
    
    // Update the active list
    const updatedLists = shoppingLists.map(list => {
      if (list.id === activeList.id) {
        return {
          ...list,
          items: updatedItems
        };
      }
      return list;
    });
    
    setShoppingLists(updatedLists);
    setActiveList({
      ...activeList,
      items: updatedItems
    });
    
    // Reset form
    setNewItem({
      name: '',
      quantity: 1,
      unit: '',
      category: ''
    });
  };
  
  // Function to toggle item checked status
  const toggleItemChecked = (itemId: string) => {
    if (!activeList) return;
    
    const updatedItems = activeList.items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          isChecked: !item.isChecked
        };
      }
      return item;
    });
    
    // Update the active list
    const updatedLists = shoppingLists.map(list => {
      if (list.id === activeList.id) {
        return {
          ...list,
          items: updatedItems
        };
      }
      return list;
    });
    
    setShoppingLists(updatedLists);
    setActiveList({
      ...activeList,
      items: updatedItems
    });
  };
  
  // Function to remove item from list
  const removeItem = (itemId: string) => {
    if (!activeList) return;
    
    const updatedItems = activeList.items.filter(item => item.id !== itemId);
    
    // Update the active list
    const updatedLists = shoppingLists.map(list => {
      if (list.id === activeList.id) {
        return {
          ...list,
          items: updatedItems
        };
      }
      return list;
    });
    
    setShoppingLists(updatedLists);
    setActiveList({
      ...activeList,
      items: updatedItems
    });
  };
  
  // Function to get best price for an item
  const getBestPrice = (item: ShoppingItem): { price: string, source: string } => {
    if (!item.sources || item.sources.length === 0) {
      return { price: '0.00', source: 'Unknown' };
    }
    
    const bestSource = item.sources.reduce((best, current) => {
      return parseFloat(current.price) < parseFloat(best.price) ? current : best;
    });
    
    return { price: bestSource.price, source: bestSource.name };
  };
  
  // Calculate total price of shopping list
  const calculateTotalPrice = (): string => {
    if (!activeList) return '0.00';
    
    const total = activeList.items.reduce((sum, item) => {
      const { price } = getBestPrice(item);
      return sum + (parseFloat(price) * item.quantity);
    }, 0);
    
    return total.toFixed(2);
  };
  
  // Group items by category
  const itemsByCategory = activeList ? Object.entries(
    activeList.items.reduce((groups, item) => {
      const category = item.category || 'Other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {} as Record<string, ShoppingItem[]>)
  ) : [];
  
  // Calculate progress percentage
  const calculateProgress = (): number => {
    if (!activeList || activeList.items.length === 0) return 0;
    const checkedItems = activeList.items.filter(item => item.isChecked).length;
    return Math.round((checkedItems / activeList.items.length) * 100);
  };

  return (
    <Container
      padding={spacing.md}
      style={{
        maxWidth: '100%',
        height: '100vh',
        overflowY: 'auto',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,245,255,0.85))',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Header */}
      <div style={{ padding: `${spacing.sm} ${spacing.md}` }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: spacing.md }}>
          <Flex align="center" gap={spacing.sm}>
            <Button 
              onClick={() => navigate('/shopping-list')}
              style={{
                backgroundColor: 'transparent',
                color: colors.textPrimary,
                padding: spacing.xs,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowLeft size={24} />
            </Button>
            <Text variant="h1" style={{ marginBottom: 0 }}>
              {activeList ? activeList.name : 'Shopping List'}
            </Text>
          </Flex>
          
          <Flex gap={spacing.sm}>
            <Button 
              onClick={() => setShowPriceComparison(!showPriceComparison)}
              style={{
                backgroundColor: showPriceComparison ? colors.primary : 'white',
                color: showPriceComparison ? 'white' : colors.textPrimary,
                borderRadius: borderRadius.full,
                padding: `${spacing.xs} ${spacing.sm}`,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
                boxShadow: shadows.sm
              }}
            >
              <Store size={16} />
              <span>Compare Prices</span>
            </Button>
            
            <Button 
              onClick={() => setShowRecipeSelector(!showRecipeSelector)}
              style={{
                backgroundColor: showRecipeSelector ? colors.primary : 'white',
                color: showRecipeSelector ? 'white' : colors.textPrimary,
                borderRadius: borderRadius.full,
                padding: `${spacing.xs} ${spacing.sm}`,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
                boxShadow: shadows.sm
              }}
            >
              <Plus size={16} />
              <span>Add Recipe</span>
            </Button>
          </Flex>
        </Flex>
        
        {/* Progress bar */}
        <div style={{ marginBottom: spacing.md }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: spacing.xs }}>
            <Text variant="body2" style={{ color: colors.textSecondary }}>
              {activeList?.items.filter(item => item.isChecked).length || 0} of {activeList?.items.length || 0} items
            </Text>
            <Text variant="body2" style={{ fontWeight: 500, color: colors.primary }}>
              {calculateProgress()}%
            </Text>
          </Flex>
          <div style={{ 
            height: '6px', 
            backgroundColor: 'rgba(230, 235, 245, 0.8)',
            borderRadius: borderRadius.full,
            overflow: 'hidden'
          }}>
            <div 
              className="progress-bar"
              style={{ 
                height: '100%', 
                width: `${calculateProgress()}%`,
                backgroundColor: colors.primary,
                borderRadius: borderRadius.full
              }} 
            />
          </div>
        </div>
        
        {/* Action buttons */}
        <Flex gap={spacing.sm} style={{ marginBottom: spacing.md }}>
          <Button 
            onClick={generateFromLowInventory}
            style={{
              backgroundColor: colors.accent3,
              color: 'white',
              borderRadius: borderRadius.full,
              padding: `${spacing.xs} ${spacing.sm}`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs,
              boxShadow: shadows.sm
            }}
          >
            <RefreshCw size={16} />
            <span>Generate from Low Inventory</span>
          </Button>
        </Flex>
        
        {/* Add item form */}
        <div 
          className="shopping-card"
          style={{ 
            padding: spacing.md,
            marginBottom: spacing.md,
            borderRadius: borderRadius.lg
          }}
        >
          <Text variant="h3" style={{ marginBottom: spacing.sm }}>Add Item</Text>
          <Flex gap={spacing.sm} style={{ marginBottom: spacing.sm }}>
            <input 
              type="text"
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              style={{
                flex: 2,
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: borderRadius.md,
                border: '1px solid rgba(230, 235, 245, 0.8)',
                backgroundColor: 'white',
                fontSize: '16px',
                outline: 'none'
              }}
            />
            <input 
              type="number"
              placeholder="Qty"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) })}
              style={{
                flex: 1,
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: borderRadius.md,
                border: '1px solid rgba(230, 235, 245, 0.8)',
                backgroundColor: 'white',
                fontSize: '16px',
                outline: 'none'
              }}
            />
            <input 
              type="text"
              placeholder="Unit"
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              style={{
                flex: 1,
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: borderRadius.md,
                border: '1px solid rgba(230, 235, 245, 0.8)',
                backgroundColor: 'white',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </Flex>
          <Flex justify="flex-end">
            <Button 
              onClick={addItemToList}
              style={{
                backgroundColor: colors.primary,
                color: 'white',
                borderRadius: borderRadius.full,
                padding: `${spacing.xs} ${spacing.sm}`,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs
              }}
            >
              <Plus size={16} />
              <span>Add to List</span>
            </Button>
          </Flex>
        </div>
      </div>
      
      {/* Shopping List Items */}
      <div style={{ 
        padding: `0 ${spacing.md}`,
        paddingBottom: spacing.xl
      }}>
        {showRecipeSelector ? (
          <div 
            className="shopping-card"
            style={{ 
              padding: spacing.md,
              marginBottom: spacing.md,
              borderRadius: borderRadius.lg
            }}
          >
            <Text variant="h3" style={{ marginBottom: spacing.md }}>Select Recipe</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              {recipes.map(recipe => (
                <div 
                  key={recipe.id}
                  onClick={() => addRecipeIngredientsToList(recipe)}
                  style={{
                    padding: spacing.md,
                    borderRadius: borderRadius.md,
                    backgroundColor: 'white',
                    boxShadow: shadows.sm,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.md
                  }}
                >
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: borderRadius.md,
                      backgroundImage: `url(${recipe.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div>
                    <Text variant="h3" style={{ marginBottom: spacing.xs }}>{recipe.title}</Text>
                    <Text variant="body2" style={{ color: colors.textSecondary }}>
                      {recipe.ingredients.length} ingredients
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {itemsByCategory.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: spacing.xl,
                marginTop: spacing.xl
              }}>
                <ShoppingCart size={48} style={{ marginBottom: spacing.md, opacity: 0.5 }} />
                <Text variant="h3" style={{ marginBottom: spacing.md }}>Your Shopping List is Empty</Text>
                <Text variant="body1" style={{ color: colors.textSecondary, marginBottom: spacing.lg }}>
                  Add items manually or generate from low inventory
                </Text>
              </div>
            ) : (
              <>
                <Flex justify="space-between" align="center" style={{ marginBottom: spacing.sm }}>
                  <Text variant="h3">Shopping List</Text>
                  <Text variant="body1" style={{ fontWeight: 500 }}>
                    Total: ${calculateTotalPrice()}
                  </Text>
                </Flex>
                
                {itemsByCategory.map(([category, items]) => (
                  <div 
                    key={category}
                    className="shopping-card"
                    style={{ 
                      marginBottom: spacing.md,
                      borderRadius: borderRadius.lg,
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ 
                      backgroundColor: `${colors.primary}15`,
                      padding: `${spacing.xs} ${spacing.md}`,
                      borderBottom: '1px solid rgba(230, 235, 245, 0.8)'
                    }}>
                      <Text variant="h3" style={{ margin: 0 }}>{category}</Text>
                    </div>
                    
                    <div>
                      {items.map(item => (
                        <div 
                          key={item.id}
                          style={{
                            padding: spacing.md,
                            borderBottom: '1px solid rgba(230, 235, 245, 0.8)',
                            backgroundColor: item.isChecked ? 'rgba(245, 247, 250, 0.5)' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: spacing.sm
                          }}
                        >
                          <div 
                            onClick={() => toggleItemChecked(item.id)}
                            className="checkbox-container"
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              border: `2px solid ${item.isChecked ? colors.success : colors.midGray}`,
                              backgroundColor: item.isChecked ? colors.success : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            {item.isChecked && <Check size={14} color="white" />}
                          </div>
                          
                          <div style={{ flex: 1 }}>
                            <Text 
                              variant="body1" 
                              style={{ 
                                textDecoration: item.isChecked ? 'line-through' : 'none',
                                opacity: item.isChecked ? 0.6 : 1
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text variant="caption" style={{ color: colors.textSecondary }}>
                              {item.quantity} {item.unit}
                              {item.inPantry && ' • Low in Pantry'}
                            </Text>
                          </div>
                          
                          {showPriceComparison ? (
                            <div>
                              {item.sources?.map(source => (
                                <div key={source.id} style={{ display: 'flex', justifyContent: 'space-between', gap: spacing.sm }}>
                                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                                    {source.name}:
                                  </Text>
                                  <Text variant="caption" style={{ fontWeight: 500 }}>
                                    ${source.price}
                                  </Text>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div style={{ textAlign: 'right' }}>
                              <Text variant="body2" style={{ fontWeight: 500 }}>
                                ${getBestPrice(item).price}
                              </Text>
                              <Text variant="caption" style={{ color: colors.textSecondary }}>
                                {getBestPrice(item).source}
                              </Text>
                            </div>
                          )}
                          
                          <Button 
                            onClick={() => removeItem(item.id)}
                            style={{
                              backgroundColor: 'transparent',
                              color: colors.error,
                              padding: spacing.xs,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
        
        {/* Bottom padding for navigation */}
        <div style={{ height: '80px' }} />
      </div>
    </Container>
  );
}
