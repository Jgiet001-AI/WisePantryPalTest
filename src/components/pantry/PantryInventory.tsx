import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Trash2, Edit, AlertTriangle, ArrowLeft, Filter, Home, Book, ShoppingCart, User, ScanLine, X } from "lucide-react";
import {
  Container,
  Text,
  Flex,
  colors,
  spacing,
  Divider,
  shadows,
  borderRadius,
  animation
} from '../ui/KitchenStoriesDesign';
import { useNavigate } from "react-router-dom";

// Add CSS styles for consistent hover effects and interactions
const styles = `
  .clickable-icon {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .clickable-icon:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
  
  .search-bar {
    transition: all 0.2s ease;
  }
  
  .search-bar:focus-within {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
    border: 1px solid rgba(200, 210, 230, 0.9) !important;
  }
  
  .category-pill {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .category-pill:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .pantry-item-card {
    transition: all 0.2s ease;
  }
  
  .pantry-item-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
  
  .action-button {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .action-button:hover {
    transform: scale(1.1);
  }
`;

interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: Date;
  addedDate: Date;
}

// Mock data for demonstration
const mockPantryItems: PantryItem[] = [
  {
    id: "1",
    name: "Organic Milk",
    category: "Dairy",
    quantity: 1,
    unit: "gallon",
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "2",
    name: "Eggs",
    category: "Dairy",
    quantity: 12,
    unit: "count",
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "3",
    name: "Whole Wheat Bread",
    category: "Bakery",
    quantity: 1,
    unit: "loaf",
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "4",
    name: "Chicken Breast",
    category: "Meat",
    quantity: 2,
    unit: "lbs",
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "5",
    name: "Spinach",
    category: "Produce",
    quantity: 1,
    unit: "bag",
    expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "6",
    name: "Canned Tomatoes",
    category: "Canned Goods",
    quantity: 3,
    unit: "cans",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "7",
    name: "Olive Oil",
    category: "Oils & Vinegars",
    quantity: 1,
    unit: "bottle",
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "8",
    name: "Rice",
    category: "Grains",
    quantity: 5,
    unit: "lbs",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "9",
    name: "Greek Yogurt",
    category: "Dairy",
    quantity: 2,
    unit: "containers",
    expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
];

interface PantryInventoryProps {
  onAddItem?: () => void;
  onEditItem?: (item: PantryItem) => void;
}

export default function PantryInventory({
  onAddItem = () => {},
  onEditItem = () => {},
}: PantryInventoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(mockPantryItems);
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  // Handle scroll events to show/hide add button
  useEffect(() => {
    const handleScroll = (e: any) => {
      const position = e.target.scrollTop;
      setScrollPosition(position);
      
      // Hide add button when scrolling down, show when scrolling up
      if (position > scrollPosition && position > 50) {
        setIsAddButtonVisible(false);
      } else {
        setIsAddButtonVisible(true);
      }
    };

    const container = document.getElementById('pantry-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [scrollPosition]);

  // Get unique categories for filter
  const categories = Array.from(
    new Set(pantryItems.map((item) => item.category))
  );

  // Filter items based on search and category
  const filteredItems = pantryItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === null || item.category === selectedCategory)
    );
  });

  // Sort items by expiry date
  const sortedItems = [...filteredItems].sort(
    (a, b) => a.expiryDate.getTime() - b.expiryDate.getTime()
  );

  // Check if an item is expiring soon (within 3 days)
  const isExpiringSoon = (date: Date) => {
    const currentDate = new Date();
    const diffTime = date.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  // Check if an item is expired
  const isExpired = (date: Date) => {
    const currentDate = new Date();
    return date < currentDate;
  };

  // Calculate days until expiry
  const getDaysUntilExpiry = (date: Date) => {
    const currentDate = new Date();
    const diffTime = date.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Remove item from pantry
  const handleRemoveItem = (id: string) => {
    setPantryItems(pantryItems.filter((item) => item.id !== id));
  };

  // Format date to display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Container 
      style={{ 
        padding: 0, 
        maxWidth: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflowY: 'hidden',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,245,255,0.85))',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* App Bar */}
      <div style={{ 
        padding: `${spacing.md} ${spacing.md}`, 
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: `1px solid rgba(230, 235, 245, 0.8)`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={spacing.sm}>
            <ArrowLeft 
              size={24} 
              color={colors.secondary} 
              onClick={() => navigate(-1)}
              className="clickable-icon"
            />
            <Text variant="h2" style={{ color: colors.textPrimary }}>Pantry Inventory</Text>
          </Flex>
          <Filter 
            size={24} 
            color={selectedCategory ? colors.primary : colors.textSecondary} 
            onClick={() => setSelectedCategory(null)}
            className="clickable-icon"
          />
        </Flex>
      </div>

      {/* Search Bar */}
      <div style={{ 
        padding: spacing.md, 
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: '64px',
        zIndex: 9,
        borderBottom: `1px solid rgba(230, 235, 245, 0.8)`
      }}>
        <div style={{ 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: borderRadius.md,
          padding: `${spacing.xs} ${spacing.md}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(230, 235, 245, 0.8)'
        }}
        className="search-bar"
        >
          <Search size={20} color={colors.textSecondary} />
          <input
            type="text"
            placeholder="Search pantry items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              padding: spacing.sm,
              width: '100%',
              fontSize: '16px',
              color: colors.textPrimary,
              outline: 'none',
              transition: `all ${animation.fast} ${animation.easing}`
            }}
            onFocus={(e) => {
              e.currentTarget.parentElement.classList.add('search-bar');
            }}
            onBlur={(e) => {
              e.currentTarget.parentElement.classList.remove('search-bar');
            }}
          />
          {searchTerm && (
            <div 
              onClick={() => setSearchTerm("")}
              style={{ 
                cursor: 'pointer',
                fontSize: '18px',
                color: colors.textSecondary,
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: `all ${animation.fast} ${animation.easing}`
              }}
              className="clickable-icon"
            >
              ×
            </div>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ 
        padding: `${spacing.sm} ${spacing.md}`,
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        position: 'sticky',
        top: '124px',
        zIndex: 8,
        borderBottom: `1px solid rgba(230, 235, 245, 0.8)`,
        display: 'flex',
        gap: spacing.sm
      }}>
        <div
          onClick={() => setSelectedCategory(null)}
          style={{
            padding: `${spacing.xs} ${spacing.md}`,
            borderRadius: borderRadius.full,
            backgroundColor: selectedCategory === null ? colors.primary : colors.background,
            color: selectedCategory === null ? colors.white : colors.textPrimary,
            cursor: 'pointer',
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: selectedCategory === null ? 600 : 400,
            transition: `all ${animation.fast} ${animation.easing}`,
            boxShadow: selectedCategory === null ? shadows.sm : 'none'
          }}
          className="category-pill"
        >
          All
        </div>
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: `${spacing.xs} ${spacing.md}`,
              borderRadius: borderRadius.full,
              backgroundColor: selectedCategory === category ? colors.primary : colors.background,
              color: selectedCategory === category ? colors.white : colors.textPrimary,
              cursor: 'pointer',
              display: 'inline-block',
              fontSize: '14px',
              fontWeight: selectedCategory === category ? 600 : 400,
              transition: `all ${animation.fast} ${animation.easing}`,
              boxShadow: selectedCategory === category ? shadows.sm : 'none'
            }}
            className="category-pill"
          >
            {category}
          </div>
        ))}
      </div>

      {/* Pantry Items List */}
      <div 
        id="pantry-container"
        style={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: `${spacing.md} ${spacing.md} ${spacing.xxl} ${spacing.md}`,
          background: 'transparent'
        }}
      >
        {sortedItems.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: spacing.xl,
            color: colors.textSecondary,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: borderRadius.lg,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(230, 235, 245, 0.8)',
            margin: `${spacing.lg} 0`
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(240, 245, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.md
            }}>
              {searchTerm ? (
                <Search size={40} color={colors.textSecondary} />
              ) : selectedCategory ? (
                <Filter size={40} color={colors.textSecondary} />
              ) : (
                <Plus size={40} color={colors.textSecondary} />
              )}
            </div>
            <Text 
              variant="h3" 
              style={{ 
                marginBottom: spacing.sm,
                color: colors.textPrimary
              }}
            >
              {searchTerm 
                ? "No matching items found" 
                : selectedCategory 
                  ? `No items in ${selectedCategory}` 
                  : "Your pantry is empty"}
            </Text>
            <Text 
              variant="body1" 
              style={{ 
                marginBottom: spacing.lg,
                maxWidth: '300px'
              }}
            >
              {searchTerm 
                ? "Try a different search term or clear your filters" 
                : selectedCategory 
                  ? "Try selecting a different category or add new items" 
                  : "Start adding items to keep track of your pantry inventory"}
            </Text>
            <Button 
              onClick={onAddItem}
              style={{
                marginTop: spacing.md,
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                padding: `${spacing.sm} ${spacing.lg}`,
                borderRadius: borderRadius.md,
                cursor: 'pointer',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing.sm,
                boxShadow: shadows.md,
                transition: `all ${animation.medium} ${animation.easing}`
              }}
              className="action-button"
            >
              <Plus size={18} />
              Add Item
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            {sortedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: borderRadius.lg,
                  padding: spacing.md,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: isExpired(item.expiryDate)
                    ? `1px solid ${colors.error}`
                    : isExpiringSoon(item.expiryDate) 
                      ? `1px solid ${colors.warning}` 
                      : `1px solid rgba(230, 235, 245, 0.8)`,
                  transition: `all ${animation.medium} ${animation.easing}`,
                  transform: 'translateY(0)'
                }}
                className="pantry-item-card"
              >
                <Flex justify="space-between" align="center">
                  <div>
                    <Text 
                      variant="h3" 
                      style={{ 
                        marginBottom: spacing.xs,
                        color: colors.textPrimary
                      }}
                    >
                      {item.name}
                    </Text>
                    <Flex gap={spacing.sm} align="center">
                      <div
                        style={{
                          backgroundColor: colors.primaryLight,
                          color: colors.primary,
                          padding: `${spacing.xs} ${spacing.sm}`,
                          borderRadius: borderRadius.md,
                          fontSize: '12px',
                          fontWeight: 500
                        }}
                      >
                        {item.category}
                      </div>
                      <Text 
                        variant="body2" 
                        style={{ 
                          color: colors.textSecondary 
                        }}
                      >
                        {item.quantity} {item.unit}
                      </Text>
                    </Flex>
                  </div>
                  <Flex gap={spacing.sm}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        onEditItem(item);
                      }}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: borderRadius.full,
                        backgroundColor: colors.background,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: `all ${animation.fast} ${animation.easing}`
                      }}
                      className="action-button"
                    >
                      <Edit size={18} color={colors.textSecondary} />
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        handleRemoveItem(item.id);
                      }}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: borderRadius.full,
                        backgroundColor: colors.background,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: `all ${animation.fast} ${animation.easing}`
                      }}
                      className="action-button"
                    >
                      <Trash2 size={18} color={colors.error} />
                    </div>
                  </Flex>
                </Flex>
                <div style={{ 
                  height: '1px', 
                  backgroundColor: 'rgba(230, 235, 245, 0.8)', 
                  margin: `${spacing.sm}px 0` 
                }} />
                <Flex justify="space-between" align="center">
                  <Text 
                    variant="caption" 
                    style={{ 
                      color: colors.textSecondary 
                    }}
                  >
                    Added: {formatDate(item.addedDate)}
                  </Text>
                  <Flex 
                    align="center" 
                    gap={spacing.xs}
                    style={{
                      color: isExpired(item.expiryDate) 
                        ? colors.error 
                        : isExpiringSoon(item.expiryDate) 
                          ? colors.warning 
                          : colors.textSecondary,
                      backgroundColor: isExpired(item.expiryDate)
                        ? `rgba(${parseInt(colors.error.slice(1, 3), 16)}, ${parseInt(colors.error.slice(3, 5), 16)}, ${parseInt(colors.error.slice(5, 7), 16)}, 0.1)`
                        : isExpiringSoon(item.expiryDate) 
                          ? `rgba(${parseInt(colors.warning.slice(1, 3), 16)}, ${parseInt(colors.warning.slice(3, 5), 16)}, ${parseInt(colors.warning.slice(5, 7), 16)}, 0.1)` 
                          : 'transparent',
                      padding: (isExpiringSoon(item.expiryDate) || isExpired(item.expiryDate)) 
                        ? `${spacing.xs} ${spacing.sm}` 
                        : 0,
                      borderRadius: borderRadius.md
                    }}
                  >
                    {isExpired(item.expiryDate) && (
                      <AlertTriangle size={16} color={colors.error} />
                    )}
                    {isExpiringSoon(item.expiryDate) && (
                      <AlertTriangle size={16} color={colors.warning} />
                    )}
                    <Text 
                      variant="caption" 
                      style={{ 
                        color: isExpired(item.expiryDate)
                          ? colors.error
                          : isExpiringSoon(item.expiryDate) 
                            ? colors.warning 
                            : colors.textSecondary,
                        fontWeight: (isExpiringSoon(item.expiryDate) || isExpired(item.expiryDate)) ? 600 : 400
                      }}
                    >
                      {isExpired(item.expiryDate) ? "Expired" : `Expires: ${formatDate(item.expiryDate)}`}
                      {!isExpired(item.expiryDate) && ` (${getDaysUntilExpiry(item.expiryDate)} days)`}
                    </Text>
                  </Flex>
                </Flex>

                {/* Add progress bar for expiry visualization */}
                {!isExpired(item.expiryDate) && (
                  <div style={{ marginTop: spacing.xs }}>
                    <div style={{ 
                      height: '4px', 
                      backgroundColor: 'rgba(230, 235, 245, 0.8)',
                      borderRadius: borderRadius.full,
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${Math.min(100, Math.max(0, getDaysUntilExpiry(item.expiryDate) / 14 * 100))}%`,
                        backgroundColor: getDaysUntilExpiry(item.expiryDate) <= 3 
                          ? colors.error 
                          : getDaysUntilExpiry(item.expiryDate) <= 7 
                            ? colors.warning 
                            : colors.success,
                        borderRadius: borderRadius.full,
                        transition: `width ${animation.medium} ${animation.easing}`
                      }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Item Button */}
      <div 
        style={{ 
          position: 'absolute',
          bottom: '80px',
          right: '20px',
          zIndex: 100,
          opacity: isAddButtonVisible ? 1 : 0,
          transform: isAddButtonVisible ? 'scale(1)' : 'scale(0.8)',
          transition: `all ${animation.medium} ${animation.easing}`,
        }}
      >
        <div
          onClick={onAddItem}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: borderRadius.full,
            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
            color: colors.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
            transition: `all ${animation.medium} ${animation.easing}`
          }}
          className="action-button"
        >
          <Plus size={24} />
        </div>
      </div>

      {/* Padding to prevent content from being hidden by bottom navigation */}
      <div style={{ height: '80px' }} />
      
      {/* Add style tag for CSS */}
      <style>{styles}</style>
    </Container>
  );
}
