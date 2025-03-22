import { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Search, Filter, Tag, ShoppingCart, Clock, Trash2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import { ShoppingItem, ShoppingList } from '../../types/shopping';
import './ShoppingStyles.css';

// Mock shopping lists data
const mockShoppingLists: ShoppingList[] = [
  {
    id: 'sl1',
    name: 'Weekly Groceries',
    createdAt: new Date(),
    items: [
      { 
        id: 'i1', 
        name: 'Milk', 
        category: 'Dairy', 
        quantity: 1, 
        unit: 'gallon',
        price: 3.99,
        inPantry: false,
        isChecked: false
      },
      { 
        id: 'i2', 
        name: 'Eggs', 
        category: 'Dairy', 
        quantity: 12, 
        unit: 'count',
        price: 4.49,
        inPantry: false,
        isChecked: false
      },
      { 
        id: 'i3', 
        name: 'Bread', 
        category: 'Bakery', 
        quantity: 1, 
        unit: 'loaf',
        price: 2.99,
        inPantry: false,
        isChecked: false,
        notes: 'Whole grain preferred'
      }
    ],
    isActive: true
  },
  {
    id: 'sl2',
    name: 'Party Supplies',
    createdAt: new Date(2025, 2, 15),
    items: [
      { 
        id: 'i4', 
        name: 'Chips', 
        category: 'Snacks', 
        quantity: 3, 
        unit: 'bags',
        price: 3.99,
        inPantry: false,
        isChecked: false
      },
      { 
        id: 'i5', 
        name: 'Soda', 
        category: 'Beverages', 
        quantity: 2, 
        unit: 'liters',
        price: 1.99,
        inPantry: false,
        isChecked: false
      }
    ],
    isActive: false
  }
];

// Shopping categories for filters
const categories = [
  { id: 'all', name: 'All', icon: <ShoppingBag size={24} color={colors.primary} />, color: colors.primary },
  { id: 'groceries', name: 'Groceries', icon: <ShoppingCart size={24} color={colors.success} />, color: colors.success },
  { id: 'dairy', name: 'Dairy', icon: <ShoppingBag size={24} color={colors.accent2} />, color: colors.accent2 },
  { id: 'produce', name: 'Produce', icon: <ShoppingBag size={24} color={colors.accent3} />, color: colors.accent3 },
  { id: 'meat', name: 'Meat', icon: <ShoppingBag size={24} color={colors.accent1} />, color: colors.accent1 },
  { id: 'bakery', name: 'Bakery', icon: <ShoppingBag size={24} color={colors.secondary} />, color: colors.secondary }
];

// Shopping list filters
const filters = [
  { id: 'all', name: 'All', icon: <Filter size={18} /> },
  { id: 'recent', name: 'Recent', icon: <Clock size={18} /> },
  { id: 'completed', name: 'Completed', icon: <Check size={18} /> }
];

export default function ShoppingScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>(mockShoppingLists);

  // Calculate progress percentage for a shopping list
  const calculateProgress = (list: ShoppingList): number => {
    if (list.items.length === 0) return 0;
    const checkedItems = list.items.filter(item => item.isChecked).length;
    return Math.round((checkedItems / list.items.length) * 100);
  };

  // Filter shopping lists based on active filter
  const filteredLists = shoppingLists.filter(list => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'recent') {
      // Show lists created in the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return list.createdAt >= sevenDaysAgo;
    }
    if (activeFilter === 'completed') {
      return calculateProgress(list) === 100;
    }
    return true;
  });

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
          <Text variant="h1" style={{ marginBottom: 0 }}>Shopping Lists</Text>
          <Button 
            onClick={() => navigate('/shopping-list-automation')}
            style={{
              backgroundColor: colors.primary,
              color: 'white',
              borderRadius: borderRadius.full,
              padding: `${spacing.xs} ${spacing.sm}`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs,
              boxShadow: shadows.sm
            }}
          >
            <Plus size={18} />
            <span>New List</span>
          </Button>
        </Flex>
        
        {/* Search bar */}
        <div style={{ 
          position: 'relative',
          marginBottom: spacing.md
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: borderRadius.full,
            padding: `${spacing.xs} ${spacing.sm}`,
            boxShadow: shadows.sm
          }}>
            <Search size={18} color={colors.midGray} style={{ marginRight: spacing.xs }} />
            <input 
              type="text"
              placeholder="Search shopping lists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                width: '100%',
                fontSize: '14px',
                color: colors.textPrimary
              }}
            />
          </div>
        </div>
        
        {/* Category Filters */}
        <div 
          className="hide-scrollbar" 
          style={{ 
            display: 'flex',
            overflowX: 'auto',
            gap: spacing.md,
            paddingBottom: spacing.sm,
            marginBottom: spacing.md,
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none' // IE/Edge
          }}
        >
          {categories.map(category => (
            <div 
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                opacity: activeCategory === category.id ? 1 : 0.6,
                transition: `all ${animation.fast}`
              }}
            >
              <div 
                className="category-icon"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  borderRadius: borderRadius.full,
                  backgroundColor: activeCategory === category.id 
                    ? `${category.color}25` 
                    : 'white',
                  marginBottom: spacing.xs,
                  boxShadow: shadows.sm
                }}
              >
                {category.icon}
              </div>
              <Text variant="caption" style={{ textAlign: 'center' }}>{category.name}</Text>
            </div>
          ))}
        </div>
        
        {/* List Filters */}
        <Flex gap={spacing.sm} style={{ marginBottom: spacing.md }}>
          {filters.map(filter => (
            <div 
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: borderRadius.full,
                backgroundColor: activeFilter === filter.id 
                  ? colors.primary 
                  : 'white',
                color: activeFilter === filter.id 
                  ? 'white' 
                  : colors.textPrimary,
                cursor: 'pointer',
                fontSize: '14px',
                boxShadow: shadows.sm,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs
              }}
            >
              {filter.icon}
              {filter.name}
            </div>
          ))}
        </Flex>
      </div>

      {/* Shopping Lists */}
      <div style={{ 
        padding: `0 ${spacing.md}`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.md,
        paddingBottom: spacing.xl
      }}>
        {filteredLists.map(list => (
          <div 
            key={list.id}
            className="shopping-card"
            onClick={() => navigate(`/shopping-list-automation?id=${list.id}`)}
            style={{
              borderRadius: borderRadius.lg,
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            {/* List header */}
            <div style={{ padding: spacing.md }}>
              <Flex justify="space-between" align="center" style={{ marginBottom: spacing.xs }}>
                <Text variant="h3" style={{ marginBottom: 0 }}>{list.name}</Text>
                <Badge style={{ 
                  backgroundColor: calculateProgress(list) === 100 
                    ? colors.success 
                    : colors.primary,
                  color: 'white',
                  padding: `${spacing.xs} ${spacing.sm}`,
                  borderRadius: borderRadius.full
                }}>
                  {calculateProgress(list)}% Complete
                </Badge>
              </Flex>
              
              {/* Progress bar */}
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
                    width: `${calculateProgress(list)}%`,
                    backgroundColor: colors.primary,
                    borderRadius: borderRadius.full
                  }} 
                />
              </div>
            </div>
            
            {/* Items preview */}
            <div style={{ 
              padding: `${spacing.xs} ${spacing.md} ${spacing.md}`,
              backgroundColor: 'rgba(245, 247, 250, 0.5)'
            }}>
              <Flex gap={spacing.sm} style={{ flexWrap: 'wrap' }}>
                {list.items.slice(0, 3).map(item => (
                  <Badge key={item.id} style={{ 
                    backgroundColor: item.isChecked ? colors.successLight : 'white',
                    color: item.isChecked ? colors.success : colors.textPrimary,
                    padding: `${spacing.xs} ${spacing.sm}`,
                    borderRadius: borderRadius.full,
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.xs
                  }}>
                    {item.isChecked && <Check size={12} />}
                    {item.name}
                  </Badge>
                ))}
                {list.items.length > 3 && (
                  <Badge style={{ 
                    backgroundColor: 'white',
                    color: colors.textSecondary,
                    padding: `${spacing.xs} ${spacing.sm}`,
                    borderRadius: borderRadius.full
                  }}>
                    +{list.items.length - 3} more
                  </Badge>
                )}
              </Flex>
            </div>
          </div>
        ))}
        
        {/* Bottom padding for navigation */}
        <div style={{ height: '80px' }} />
      </div>
    </Container>
  );
}
