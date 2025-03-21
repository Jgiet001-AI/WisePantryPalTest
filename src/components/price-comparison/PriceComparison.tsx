import React, { useState, useMemo } from "react";
import { 
  ShoppingCart, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  TrendingDown, 
  TrendingUp, 
  BarChart3, 
  Store, 
  Search,
  ArrowLeft,
  Bell,
  BellOff,
  X,
  ChevronRight,
  Minus,
  MapPin,
  LineChart,
  BellPlus,
  Share
} from "lucide-react";
import {
  Text,
  Button,
  Card,
  colors,
  spacing,
  shadows,
  borderRadius,
} from '../ui/KitchenStoriesDesign';
import { useNavigate } from "react-router-dom";

// Types definitions
interface StoreInfo {
  name: string;
  price: number;
  distance: number;
}

interface GroceryItem {
  id: number;
  name: string;
  image: JSX.Element;
  currentPrice: number;
  previousPrice: number;
  priceHistory: number[];
  stores: StoreInfo[];
  onWatchlist: boolean;
}

// Mock data for price comparison
const mockItems: GroceryItem[] = [
  {
    id: 1,
    name: "Bananas",
    image: <img src="https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Bananas" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    currentPrice: 0.59,
    previousPrice: 0.69,
    priceHistory: [0.75, 0.72, 0.69, 0.69, 0.65, 0.62, 0.59],
    stores: [
      { name: "FreshMart", price: 0.59, distance: 1.2 },
      { name: "Value Grocery", price: 0.62, distance: 0.8 },
      { name: "SuperStore", price: 0.65, distance: 2.5 },
    ],
    onWatchlist: true
  },
  {
    id: 2,
    name: "Apples",
    image: <img src="https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="Apples" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    currentPrice: 1.29,
    previousPrice: 1.19,
    priceHistory: [1.05, 1.09, 1.15, 1.19, 1.19, 1.25, 1.29],
    stores: [
      { name: "FreshMart", price: 1.35, distance: 1.2 },
      { name: "Value Grocery", price: 1.29, distance: 0.8 },
      { name: "SuperStore", price: 1.39, distance: 2.5 },
    ],
    onWatchlist: false
  },
  {
    id: 3,
    name: "Milk",
    image: <img src="https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbGt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="Milk" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    currentPrice: 3.49,
    previousPrice: 3.49,
    priceHistory: [3.29, 3.35, 3.39, 3.45, 3.49, 3.49, 3.49],
    stores: [
      { name: "FreshMart", price: 3.49, distance: 1.2 },
      { name: "Value Grocery", price: 3.59, distance: 0.8 },
      { name: "SuperStore", price: 3.45, distance: 2.5 },
    ],
    onWatchlist: false
  },
  {
    id: 4,
    name: "Bread",
    image: <img src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJyZWFkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="Bread" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    currentPrice: 2.99,
    previousPrice: 3.19,
    priceHistory: [3.29, 3.25, 3.19, 3.19, 3.15, 3.05, 2.99],
    stores: [
      { name: "FreshMart", price: 2.99, distance: 1.2 },
      { name: "Value Grocery", price: 3.15, distance: 0.8 },
      { name: "SuperStore", price: 3.09, distance: 2.5 },
    ],
    onWatchlist: true
  },
  {
    id: 5,
    name: "Eggs",
    image: <img src="https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVnZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="Eggs" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    currentPrice: 4.29,
    previousPrice: 3.99,
    priceHistory: [3.59, 3.69, 3.79, 3.99, 4.15, 4.29, 4.29],
    stores: [
      { name: "FreshMart", price: 4.49, distance: 1.2 },
      { name: "Value Grocery", price: 4.29, distance: 0.8 },
      { name: "SuperStore", price: 4.39, distance: 2.5 },
    ],
    onWatchlist: true
  },
  {
    id: 6,
    name: "Chicken Breast",
    image: <img src="https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGJyZWFzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Chicken Breast" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    currentPrice: 5.99,
    previousPrice: 6.49,
    priceHistory: [6.99, 6.89, 6.79, 6.49, 6.29, 6.15, 5.99],
    stores: [
      { name: "FreshMart", price: 5.99, distance: 1.2 },
      { name: "Value Grocery", price: 6.29, distance: 0.8 },
      { name: "SuperStore", price: 6.15, distance: 2.5 },
    ],
    onWatchlist: false
  }
];

const PriceComparison: React.FC = () => {
  const navigate = useNavigate();
  const [items] = useState<GroceryItem[]>(mockItems);
  const [selectedItem, setSelectedItem] = useState<GroceryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "stores">("asc");
  const [showPriceDrops, setShowPriceDrops] = useState<boolean>(false);
  const [activePriceAlerts, setActivePriceAlerts] = useState<number[]>([1, 4, 5]);

  // Modern design color palette
  const modernColors = {
    // Base colors
    primary: '#4f46e5', // Indigo
    primaryLight: '#eef2ff',
    primaryDark: '#3730a3',
    secondary: '#9333ea', // Purple
    secondaryLight: '#f5f3ff',
    
    // Accent colors
    accent1: '#ec4899', // Pink
    accent2: '#14b8a6', // Teal
    accent3: '#f97316', // Orange
    
    // Status colors
    success: '#22c55e',
    successLight: '#dcfce7',
    error: '#ef4444',
    errorLight: '#fee2e2',
    warning: '#eab308',
    warningLight: '#fef9c3',
    
    // Neutral colors
    white: '#ffffff',
    card: '#ffffff',
    background: '#f9fafb',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    black: '#000000',
  };

  const sortedItems = useMemo(() => {
    return [...items]
      .filter(item => {
        if (showPriceDrops) {
          return item.currentPrice < item.previousPrice;
        }
        return true;
      })
      .filter(item => {
        if (searchQuery) {
          return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case "asc":
            return a.currentPrice - b.currentPrice;
          case "desc":
            return b.currentPrice - a.currentPrice;
          case "stores":
            const aMinPrice = Math.min(...a.stores.map(s => s.price));
            const bMinPrice = Math.min(...b.stores.map(s => s.price));
            return aMinPrice - bMinPrice;
          default:
            return 0;
        }
      });
  }, [items, showPriceDrops, searchQuery, sortOrder]);

  const handleToggleAlert = (itemId: number) => {
    setActivePriceAlerts(prev => {
      return prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];
    });
  };

  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
    } else {
      navigate('/advanced');
    }
  };

  const getPriceTrend = (current: number, previous: number) => {
    if (current < previous) {
      return {
        icon: <TrendingDown size={16} />,
        label: `$${(previous - current).toFixed(2)} lower`,
        color: modernColors.success
      };
    } else if (current > previous) {
      return {
        icon: <TrendingUp size={16} />,
        label: `$${(current - previous).toFixed(2)} higher`,
        color: modernColors.error
      };
    } else {
      return {
        icon: <Minus size={16} />,
        label: "unchanged",
        color: modernColors.gray500
      };
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${modernColors.primaryLight} 0%, ${modernColors.gray50} 100%)`,
      position: 'relative',
      paddingBottom: '80px'
    }}>
      {/* Header with gradient */}
      <div style={{ 
        padding: `${spacing.md} ${spacing.md}`,
        background: `linear-gradient(90deg, ${modernColors.primary} 0%, ${modernColors.secondary} 100%)`,
        color: modernColors.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '0 0 16px 16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <button 
            onClick={handleBack}
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: modernColors.white,
              backdropFilter: 'blur(4px)'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <Text variant="h2" style={{ color: modernColors.white, margin: 0, fontWeight: 'bold' }}>
            {selectedItem ? selectedItem.name : "Price Comparison"}
          </Text>
        </div>
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)'
        }}>
          <Text variant="body1" style={{ color: modernColors.white, fontWeight: 'bold' }}>
            {activePriceAlerts.length}
          </Text>
        </div>
      </div>

      {!selectedItem && (
        <div style={{ padding: spacing.md, paddingBottom: '90px' }}>
          {/* Search and Filters with modern design */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: spacing.md,
            marginBottom: spacing.lg
          }}>
            <div style={{ 
              display: 'flex', 
              gap: spacing.md,
              alignItems: 'center',
              flexDirection: 'column'
            }}>
              <div style={{ 
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: modernColors.white,
                borderRadius: '12px',
                padding: `${spacing.sm} ${spacing.md}`,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
              }}>
                <Search 
                  size={20} 
                  color={modernColors.gray500}
                  style={{ marginRight: spacing.sm }}
                />
                <input
                  type="text"
                  placeholder="Search for grocery items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    flex: 1,
                    backgroundColor: 'transparent',
                    fontSize: '1rem',
                    color: modernColors.gray800
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      backgroundColor: modernColors.gray200,
                      border: 'none',
                      cursor: 'pointer',
                      padding: spacing.xs,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px'
                    }}
                  >
                    <X size={14} color={modernColors.gray600} />
                  </button>
                )}
              </div>

              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                gap: spacing.md
              }}>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "stores")}
                  style={{
                    padding: `${spacing.sm} ${spacing.md}`,
                    borderRadius: '12px',
                    border: `1px solid ${modernColors.gray200}`,
                    backgroundColor: modernColors.white,
                    outline: 'none',
                    flex: 1,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '1rem',
                    color: modernColors.gray800
                  }}
                >
                  <option value="nameAsc">Name: A-Z</option>
                  <option value="nameDesc">Name: Z-A</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>

                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.sm,
                  backgroundColor: modernColors.white,
                  borderRadius: '12px',
                  padding: `${spacing.sm} ${spacing.md}`,
                  border: `1px solid ${modernColors.gray200}`,
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  minWidth: '150px',
                  justifyContent: 'space-between'
                }}
                onClick={() => setShowPriceDrops(!showPriceDrops)}
                >
                  <Text variant="body1" style={{ color: modernColors.gray800, fontWeight: '500' }}>Price Drops</Text>
                  <div style={{
                    width: '40px',
                    height: '24px',
                    backgroundColor: showPriceDrops ? modernColors.primary : modernColors.gray300,
                    borderRadius: '12px',
                    position: 'relative',
                    transition: 'background-color 0.2s',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      left: showPriceDrops ? '18px' : '2px',
                      width: '20px',
                      height: '20px',
                      backgroundColor: modernColors.white,
                      borderRadius: '50%',
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items List with modern card design */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            {sortedItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  backgroundColor: modernColors.white,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'stretch',
                }}>
                  <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    {item.image}
                  </div>
                  <div style={{ 
                    flex: 1, 
                    padding: spacing.md,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Text variant="h3" style={{ marginBottom: spacing.xs }}>{item.name}</Text>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleAlert(item.id);
                          }}
                          style={{
                            backgroundColor: activePriceAlerts.includes(item.id) 
                              ? `${modernColors.primary}20` 
                              : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: spacing.xs,
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {activePriceAlerts.includes(item.id) ? (
                            <Bell size={18} color={modernColors.primary} />
                          ) : (
                            <BellOff size={18} color={modernColors.gray500} />
                          )}
                        </button>
                      </div>
                      
                      <div style={{ 
                        marginTop: spacing.xs,
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.sm
                      }}>
                        <Text variant="body1" style={{ 
                          fontWeight: 'bold', 
                          fontSize: '1.15rem', 
                          color: modernColors.gray900 
                        }}>
                          ${item.currentPrice.toFixed(2)}
                        </Text>
                        
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing.xs,
                          backgroundColor: item.currentPrice < item.previousPrice 
                            ? modernColors.successLight 
                            : item.currentPrice > item.previousPrice
                              ? modernColors.errorLight
                              : modernColors.gray100,
                          padding: `${spacing.xs} ${spacing.sm}`,
                          borderRadius: '6px',
                          height: '24px'
                        }}>
                          {getPriceTrend(item.currentPrice, item.previousPrice).icon}
                          <Text variant="caption" style={{ 
                            color: getPriceTrend(item.currentPrice, item.previousPrice).color,
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            {getPriceTrend(item.currentPrice, item.previousPrice).label}
                          </Text>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: spacing.sm,
                      paddingTop: spacing.xs,
                      borderTop: `1px solid ${modernColors.gray100}`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
                        <Store size={14} color={modernColors.gray500} />
                        <Text variant="caption" style={{ color: modernColors.gray600 }}>
                          Best: ${Math.min(...item.stores.map(s => s.price)).toFixed(2)} at {
                            item.stores.sort((a, b) => a.price - b.price)[0].name
                          }
                        </Text>
                      </div>
                      <ChevronRight size={18} color={modernColors.gray400} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedItem && (
        /* Detail View */
        <div style={{ padding: spacing.md, backgroundColor: modernColors.background }}>
          {/* Item Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            backgroundColor: modernColors.white,
            padding: spacing.md,
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            marginBottom: spacing.md
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                {selectedItem.image}
              </div>
              <div>
                <Text variant="h2" style={{ color: modernColors.gray900, fontWeight: 'bold' }}>{selectedItem.name}</Text>
                <div style={{ 
                  marginTop: spacing.xs,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.sm
                }}>
                  <Text variant="h3" style={{ color: modernColors.gray900, fontWeight: 'bold' }}>
                    ${selectedItem.currentPrice.toFixed(2)}
                  </Text>
                  
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.xs,
                    backgroundColor: selectedItem.currentPrice < selectedItem.previousPrice 
                      ? modernColors.successLight 
                      : selectedItem.currentPrice > selectedItem.previousPrice
                        ? modernColors.errorLight
                        : modernColors.gray100,
                    padding: `${spacing.xs} ${spacing.sm}`,
                    borderRadius: '6px'
                  }}>
                    {getPriceTrend(selectedItem.currentPrice, selectedItem.previousPrice).icon}
                    <Text variant="caption" style={{ 
                      color: getPriceTrend(selectedItem.currentPrice, selectedItem.previousPrice).color,
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {getPriceTrend(selectedItem.currentPrice, selectedItem.previousPrice).label}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleAlert(selectedItem.id);
                }}
                style={{
                  backgroundColor: activePriceAlerts.includes(selectedItem.id) 
                    ? `${modernColors.primary}20` 
                    : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: spacing.sm,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px'
                }}
              >
                {activePriceAlerts.includes(selectedItem.id) ? (
                  <Bell size={24} color={modernColors.primary} />
                ) : (
                  <BellOff size={24} color={modernColors.gray500} />
                )}
              </button>
            </div>
          </div>

          {/* Store Comparison */}
          <div style={{ 
            backgroundColor: modernColors.white,
            padding: spacing.md,
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            marginBottom: spacing.md
          }}>
            <Text variant="h3" style={{ 
              marginBottom: spacing.md, 
              color: modernColors.gray900,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}>
              <Store size={20} color={modernColors.primary} />
              Store Comparison
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
              {selectedItem.stores.sort((a, b) => a.price - b.price).map((store, index) => (
                <div key={store.name} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: spacing.md,
                  backgroundColor: index === 0 ? modernColors.successLight : modernColors.white,
                  borderRadius: '12px',
                  border: `1px solid ${index === 0 ? modernColors.success : modernColors.gray200}`,
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onClick={() => window.open(`https://maps.google.com/?q=${store.name}`, '_blank')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                    <Store size={16} color={modernColors.gray700} />
                    <Text variant="body1">{store.name}</Text>
                    {index === 0 && (
                      <div style={{ 
                        backgroundColor: modernColors.success, 
                        color: modernColors.white,
                        padding: `${spacing.xs} ${spacing.sm}`,
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold'
                      }}>
                        Best Price
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
                    <Text variant="body1" style={{ color: index === 0 ? modernColors.success : modernColors.gray800, fontWeight: 'bold' }}>
                      ${store.price.toFixed(2)}
                    </Text>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: spacing.xs,
                      backgroundColor: modernColors.gray100,
                      padding: `${spacing.xs} ${spacing.sm}`,
                      borderRadius: '6px'
                    }}>
                      <MapPin size={12} color={modernColors.gray600} />
                      <Text variant="caption" style={{ color: modernColors.gray600 }}>
                        {store.distance} mi
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price History */}
          <div style={{ 
            backgroundColor: modernColors.white,
            padding: spacing.md,
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            marginBottom: spacing.md
          }}>
            <Text variant="h3" style={{ 
              marginBottom: spacing.md, 
              color: modernColors.gray900,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}>
              <LineChart size={20} color={modernColors.primary} />
              Price History
            </Text>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: spacing.xs, height: '200px', position: 'relative' }}>
              {/* Chart background grid */}
              <div style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pointerEvents: 'none'
              }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ 
                    borderBottom: i === 3 ? 'none' : `1px dashed ${modernColors.gray200}`,
                    height: '25%'
                  }} />
                ))}
              </div>
              
              {/* Chart bars */}
              {[0.6, 0.8, 0.75, 0.9, 0.95, 0.7, 0.65].map((height, index) => (
                <div 
                  key={index}
                  style={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    position: 'relative'
                  }}
                >
                  <div 
                    style={{
                      width: '100%',
                      maxWidth: '24px',
                      height: `${height * 80}%`,
                      background: `linear-gradient(to top, ${
                        index === 4 ? modernColors.error : 
                        index === 6 ? modernColors.success :
                        modernColors.primary
                      }, ${
                        index === 4 ? modernColors.errorLight : 
                        index === 6 ? modernColors.successLight :
                        modernColors.primaryLight
                      })`,
                      borderRadius: '8px 8px 0 0',
                      position: 'absolute',
                      bottom: 0,
                      cursor: 'pointer'
                    }}
                  >
                    {(index === 4 || index === 6) && (
                      <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: index === 4 ? modernColors.error : modernColors.success,
                        color: modernColors.white,
                        padding: `${spacing.xs} ${spacing.xs}`,
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        marginBottom: '4px'
                      }}>
                        {index === 4 ? '+$0.50' : '-$0.75'}
                      </div>
                    )}
                  </div>
                  <Text variant="caption" style={{ 
                    color: modernColors.gray600, 
                    marginTop: 'auto',
                    position: 'absolute',
                    bottom: '-20px'
                  }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          {/* Price Alert Buttons */}
          <div style={{ 
            backgroundColor: modernColors.white,
            padding: spacing.md,
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            marginBottom: '90px',
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.md
          }}>
            <Text variant="h3" style={{ 
              color: modernColors.gray900,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}>
              <Bell size={20} color={modernColors.primary} />
              Price Alerts
            </Text>
            <div style={{ display: 'flex', gap: spacing.md }}>
              <button style={{
                flex: 1,
                padding: spacing.md,
                backgroundColor: activePriceAlerts.includes(selectedItem.id) ? modernColors.primary : 'transparent',
                color: activePriceAlerts.includes(selectedItem.id) ? modernColors.white : modernColors.gray700,
                border: `1px solid ${activePriceAlerts.includes(selectedItem.id) ? modernColors.primary : modernColors.gray300}`,
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.sm
              }}
              onClick={() => handleToggleAlert(selectedItem.id)}
              >
                {activePriceAlerts.includes(selectedItem.id) ? (
                  <>
                    <Bell size={18} />
                    <span>Price Alert Active</span>
                  </>
                ) : (
                  <>
                    <BellPlus size={18} />
                    <span>Set Price Alert</span>
                  </>
                )}
              </button>
              <button style={{
                padding: spacing.md,
                backgroundColor: modernColors.gray100,
                color: modernColors.gray700,
                border: `1px solid ${modernColors.gray300}`,
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px'
              }}>
                <Share size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceComparison;
