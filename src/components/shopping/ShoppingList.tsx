import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Plus, 
  Trash2, 
  ArrowDownUp, 
  Search, 
  Filter, 
  Check, 
  Package, 
  ChevronDown, 
  Tag, 
  CalendarClock, 
  PencilLine, 
  BarChart3, 
  X,
  Home,
  Book,
  User,
  ArrowLeft,
  ScanLine
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  BottomNavigation
} from '../ui/KitchenStoriesDesign';
import { useNavigate } from "react-router-dom";

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  isChecked: boolean;
  source: "pantry" | "recipe" | "regular" | "manual";
}

export default function ShoppingList() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("category");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuantity, setNewQuantity] = useState("1");
  const [newUnit, setNewUnit] = useState("item");
  const [newCategory, setNewCategory] = useState("Other");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Mock data - in a real app this would come from your state/database
  useEffect(() => {
    setItems([
      { id: "1", name: "Milk", category: "Dairy", quantity: 1, unit: "gallon", isChecked: false, source: "pantry" },
      { id: "2", name: "Eggs", category: "Dairy", quantity: 12, unit: "count", isChecked: false, source: "pantry" },
      { id: "3", name: "Chicken Breast", category: "Meat", quantity: 2, unit: "lbs", isChecked: false, source: "recipe" },
      { id: "4", name: "Spinach", category: "Produce", quantity: 1, unit: "bag", isChecked: false, source: "recipe" },
      { id: "5", name: "Coffee", category: "Beverages", quantity: 1, unit: "bag", isChecked: false, source: "regular" },
    ]);
  }, []);

  const addItem = () => {
    if (newItem.trim() !== "") {
      const newItemObj: ShoppingItem = {
        id: Date.now().toString(),
        name: newItem,
        category: newCategory,
        quantity: parseInt(newQuantity, 10) || 1,
        unit: newUnit,
        isChecked: false,
        source: "manual"
      };
      setItems([...items, newItemObj]);
      setNewItem("");
      setNewQuantity("1");
      setNewUnit("item");
      setNewCategory("Other");
      setShowAddModal(false);
    }
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearCheckedItems = () => {
    setItems(items.filter((item) => !item.isChecked));
  };
  
  const getSourceIcon = (source: string) => {
    switch(source) {
      case "pantry": return <Package size={14} color={colors.primary} />;
      case "recipe": return <Tag size={14} color={colors.accent1} />;
      case "regular": return <CalendarClock size={14} color={colors.success} />;
      default: return <PencilLine size={14} color={colors.secondary} />;
    }
  };
  
  const getSourceText = (source: string) => {
    switch(source) {
      case "pantry": return "From Pantry";
      case "recipe": return "For Recipe";
      case "regular": return "Regular Item";
      default: return "Added Manually";
    }
  };
  
  const getSourceColor = (source: string) => {
    switch(source) {
      case "pantry": return colors.primary;
      case "recipe": return colors.accent1;
      case "regular": return colors.success;
      default: return colors.secondary;
    }
  };
  
  const filteredItems = items
    .filter(item => {
      if (filter === "all") return true;
      if (filter === "unchecked") return !item.isChecked;
      if (filter === "checked") return item.isChecked;
      return item.source === filter;
    })
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sort === "category") return a.category.localeCompare(b.category);
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "source") return a.source.localeCompare(b.source);
    return 0;
  });
  
  // Group by category for display
  const itemsByCategory = sortedItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  return (
    <Container 
      style={{ 
        padding: 0, 
        maxWidth: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflowY: 'hidden',
        background: colors.background
      }}
    >
      {/* App Bar */}
      <div style={{ 
        padding: spacing.md, 
        backgroundColor: colors.white,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: `1px solid ${colors.divider}`,
        boxShadow: shadows.sm
      }}>
        <Flex justify="space-between" align="center">
          <Text variant="h2" style={{ color: colors.textPrimary }}>Shopping List</Text>
          <Flex gap={spacing.md}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: borderRadius.full,
              backgroundColor: filter !== "all" ? colors.primaryLight : colors.background,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: `all ${animation.fast} ${animation.easing}`
            }}>
              <Filter 
                size={20} 
                color={filter !== "all" ? colors.primary : colors.textSecondary}
                onClick={() => setFilter(filter === "all" ? "unchecked" : "all")}
              />
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: borderRadius.full,
              backgroundColor: colors.background,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: `all ${animation.fast} ${animation.easing}`
            }}>
              <ArrowDownUp 
                size={20} 
                color={colors.textSecondary}
                onClick={() => setSort(sort === "category" ? "name" : "category")}
              />
            </div>
          </Flex>
        </Flex>
      </div>

      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        padding: `0 0 ${spacing.xxl}`
      }}>
        {/* Counter and Add Button */}
        <Flex justify="space-between" align="center" padding={spacing.md}>
          <div style={{
            backgroundColor: colors.background,
            padding: `${spacing.xs} ${spacing.sm}`,
            borderRadius: borderRadius.full,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.xs,
            border: `1px solid ${colors.divider}`
          }}>
            <ShoppingCart size={16} color={colors.textSecondary} />
            <Text variant="caption" style={{ color: colors.textSecondary }}>
              {items.filter(i => !i.isChecked).length} items needed
            </Text>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              border: 'none',
              borderRadius: borderRadius.md,
              padding: `${spacing.xs} ${spacing.md}`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs,
              cursor: 'pointer',
              boxShadow: shadows.sm,
              transition: `all ${animation.fast} ${animation.easing}`
            }}
          >
            <Plus size={18} />
            <span>Add Item</span>
          </Button>
        </Flex>

        {/* Search Box */}
        <div style={{ padding: `0 ${spacing.md} ${spacing.md}` }}>
          <div style={{ 
            position: 'relative',
            width: '100%'
          }}>
            <div style={{ 
              display: 'flex',
              backgroundColor: colors.background,
              borderRadius: borderRadius.md,
              padding: `${spacing.xs} ${spacing.md}`,
              alignItems: 'center',
              boxShadow: isSearchFocused ? shadows.md : shadows.sm,
              marginBottom: spacing.md,
              border: `1px solid ${isSearchFocused ? colors.primary : colors.divider}`,
              transition: `all ${animation.fast} ${animation.easing}`
            }}>
              <Search 
                size={20} 
                color={isSearchFocused ? colors.primary : colors.textSecondary} 
                style={{ marginRight: spacing.sm }} 
              />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '15px',
                  width: '100%',
                  outline: 'none',
                  color: colors.textPrimary,
                  padding: `${spacing.xs} 0`
                }}
              />
              {searchQuery && (
                <X 
                  size={18} 
                  color={colors.textSecondary} 
                  onClick={() => setSearchQuery('')}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ 
          padding: `0 ${spacing.md}`,
          display: 'flex',
          gap: spacing.sm,
          overflowX: 'auto',
          marginBottom: spacing.md,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {['all', 'unchecked', 'checked', 'pantry', 'recipe', 'regular'].map((filterOption) => (
            <div
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              style={{
                padding: `${spacing.xs} ${spacing.sm}`,
                backgroundColor: filter === filterOption ? colors.primary : colors.background,
                color: filter === filterOption ? colors.white : colors.textSecondary,
                borderRadius: borderRadius.full,
                fontSize: '14px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                boxShadow: filter === filterOption ? shadows.sm : 'none',
                transition: `all ${animation.fast} ${animation.easing}`,
                border: `1px solid ${filter === filterOption ? colors.primary : colors.divider}`
              }}
            >
              {filterOption === 'all' ? 'All Items' : 
               filterOption === 'unchecked' ? 'Needed' : 
               filterOption === 'checked' ? 'Purchased' : 
               filterOption === 'pantry' ? 'From Pantry' : 
               filterOption === 'recipe' ? 'For Recipes' : 'Regular Items'}
            </div>
          ))}
        </div>

        {/* Clear purchased button */}
        {items.some(item => item.isChecked) && (
          <div style={{ padding: `0 ${spacing.md} ${spacing.md}` }}>
            <Button 
              onClick={clearCheckedItems}
              style={{
                backgroundColor: 'transparent',
                color: colors.primary,
                border: `1px solid ${colors.primary}`,
                borderRadius: borderRadius.md,
                padding: `${spacing.xs} ${spacing.md}`,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
                cursor: 'pointer',
                width: '100%',
                justifyContent: 'center',
                transition: `all ${animation.fast} ${animation.easing}`
              }}
            >
              <Check size={18} />
              <span>Clear purchased items</span>
            </Button>
          </div>
        )}

        <Divider margin={`${spacing.xs} 0 ${spacing.md} 0`} />
        
        {/* Shopping Items by Category */}
        <div style={{ padding: `0 ${spacing.md}` }}>
          {Object.keys(itemsByCategory).length > 0 ? (
            Object.entries(itemsByCategory).map(([category, categoryItems]) => (
              <div key={category} style={{ marginBottom: spacing.lg }}>
                <Text 
                  variant="h3" 
                  margin={`0 0 ${spacing.sm} 0`} 
                  style={{ 
                    paddingLeft: spacing.xs,
                    color: colors.textPrimary
                  }}
                >
                  {category}
                </Text>
                
                {categoryItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    style={{
                      backgroundColor: item.isChecked ? colors.background : colors.white,
                      borderRadius: borderRadius.md,
                      padding: spacing.md,
                      marginBottom: spacing.sm,
                      border: `1px solid ${colors.divider}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.md,
                      opacity: item.isChecked ? 0.7 : 1,
                      boxShadow: item.isChecked ? 'none' : shadows.sm,
                      transition: `all ${animation.fast} ${animation.easing}`
                    }}
                  >
                    <div 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: borderRadius.full, 
                        border: `2px solid ${item.isChecked ? colors.success : colors.primary}`,
                        backgroundColor: item.isChecked ? colors.success : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: `all ${animation.fast} ${animation.easing}`
                      }}
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.isChecked && <Check size={16} color={colors.white} />}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <Text 
                        variant="body1" 
                        style={{ 
                          textDecoration: item.isChecked ? 'line-through' : 'none',
                          color: item.isChecked ? colors.textSecondary : colors.textPrimary,
                          fontWeight: item.isChecked ? 400 : 500,
                          transition: `all ${animation.fast} ${animation.easing}`
                        }}
                      >
                        {item.name}
                      </Text>
                      
                      <Flex align="center" gap={spacing.sm} margin={`${spacing.xs} 0 0 0`}>
                        <Text variant="caption" style={{ color: colors.textSecondary }}>
                          {item.quantity} {item.unit}
                        </Text>
                        
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '4px',
                          padding: '2px 8px',
                          borderRadius: borderRadius.full,
                          backgroundColor: `${getSourceColor(item.source)}20`,
                          color: getSourceColor(item.source)
                        }}>
                          {getSourceIcon(item.source)}
                          <Text variant="caption">
                            {getSourceText(item.source)}
                          </Text>
                        </div>
                      </Flex>
                    </div>
                    
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: borderRadius.full,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: `all ${animation.fast} ${animation.easing}`,
                        backgroundColor: 'rgba(239, 68, 68, 0.1)'
                      }}
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 
                        size={18} 
                        color={colors.error}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))
          ) : (
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: spacing.xl,
              textAlign: 'center',
              height: '50vh'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: spacing.md 
              }}>
                🛒
              </div>
              <Text 
                variant="h3" 
                style={{ 
                  marginBottom: spacing.sm,
                  color: colors.textPrimary
                }}
              >
                Your shopping list is empty
              </Text>
              <Text 
                variant="body1" 
                style={{ 
                  color: colors.textSecondary, 
                  maxWidth: '280px',
                  marginBottom: spacing.lg
                }}
              >
                Add items to your shopping list to keep track of what you need to buy
              </Text>
              <Button 
                onClick={() => setShowAddModal(true)}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  border: 'none',
                  borderRadius: borderRadius.md,
                  padding: `${spacing.sm} ${spacing.lg}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                  cursor: 'pointer',
                  boxShadow: shadows.sm,
                  transition: `all ${animation.fast} ${animation.easing}`
                }}
              >
                <Plus size={18} />
                <span>Add First Item</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        items={[
          { icon: <Home size={24} />, label: 'Home', isActive: false, onClick: () => navigate('/') },
          { icon: <Book size={24} />, label: 'Recipes', isActive: false, onClick: () => navigate('/recipes') },
          { icon: <ScanLine size={24} />, label: 'Scan', isActive: false, onClick: () => navigate('/scan') },
          { icon: <ShoppingCart size={24} />, label: 'Shopping', isActive: true, onClick: () => navigate('/shopping') },
          { icon: <User size={24} />, label: 'More', isActive: false, onClick: () => navigate('/more') },
        ]}
      />

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: spacing.md,
              zIndex: 1000
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: colors.white,
                borderRadius: borderRadius.lg,
                padding: spacing.lg,
                boxShadow: shadows.xl
              }}
            >
              <Flex justify="space-between" align="center" margin={`0 0 ${spacing.md} 0`}>
                <Text variant="h2" style={{ color: colors.textPrimary }}>Add New Item</Text>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: borderRadius.full,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundColor: colors.background
                  }}
                  onClick={() => setShowAddModal(false)}
                >
                  <X 
                    size={20} 
                    color={colors.textSecondary}
                  />
                </div>
              </Flex>
              
              <div style={{ marginBottom: spacing.md }}>
                <Text variant="body2" margin={`0 0 ${spacing.xs} 0`} style={{ color: colors.textSecondary }}>Item Name</Text>
                <div style={{ 
                  display: 'flex',
                  backgroundColor: colors.background,
                  borderRadius: borderRadius.md,
                  padding: `${spacing.xs} ${spacing.md}`,
                  alignItems: 'center',
                  border: `1px solid ${colors.divider}`,
                }}>
                  <input
                    placeholder="Enter item name"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      fontSize: '15px',
                      width: '100%',
                      outline: 'none',
                      color: colors.textPrimary,
                      padding: `${spacing.xs} 0`
                    }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: spacing.md }}>
                <Text variant="body2" margin={`0 0 ${spacing.xs} 0`} style={{ color: colors.textSecondary }}>Category</Text>
                <div style={{ 
                  position: 'relative',
                  width: '100%'
                }}>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: `${spacing.sm} ${spacing.md}`,
                      borderRadius: borderRadius.md,
                      border: `1px solid ${colors.divider}`,
                      outline: 'none',
                      fontSize: '15px',
                      backgroundColor: colors.background,
                      appearance: 'none',
                      color: colors.textPrimary
                    }}
                  >
                    {['Dairy', 'Produce', 'Meat', 'Bakery', 'Beverages', 'Canned Goods', 'Frozen', 'Snacks', 'Other']
                      .map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))
                    }
                  </select>
                  <ChevronDown 
                    size={18} 
                    style={{
                      position: 'absolute',
                      right: spacing.sm,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: colors.textSecondary
                    }}
                  />
                </div>
              </div>
              
              <Flex gap={spacing.md} margin={`0 0 ${spacing.lg} 0`}>
                <div style={{ flex: 1 }}>
                  <Text variant="body2" margin={`0 0 ${spacing.xs} 0`} style={{ color: colors.textSecondary }}>Quantity</Text>
                  <div style={{ 
                    display: 'flex',
                    backgroundColor: colors.background,
                    borderRadius: borderRadius.md,
                    padding: `${spacing.xs} ${spacing.md}`,
                    alignItems: 'center',
                    border: `1px solid ${colors.divider}`,
                  }}>
                    <input
                      type="number"
                      min="1"
                      placeholder="1"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        fontSize: '15px',
                        width: '100%',
                        outline: 'none',
                        color: colors.textPrimary,
                        padding: `${spacing.xs} 0`
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ flex: 1 }}>
                  <Text variant="body2" margin={`0 0 ${spacing.xs} 0`} style={{ color: colors.textSecondary }}>Unit</Text>
                  <div style={{ 
                    position: 'relative',
                    width: '100%'
                  }}>
                    <select
                      value={newUnit}
                      onChange={(e) => setNewUnit(e.target.value)}
                      style={{
                        width: '100%',
                        padding: `${spacing.sm} ${spacing.md}`,
                        borderRadius: borderRadius.md,
                        border: `1px solid ${colors.divider}`,
                        outline: 'none',
                        fontSize: '15px',
                        backgroundColor: colors.background,
                        appearance: 'none',
                        color: colors.textPrimary
                      }}
                    >
                      {['item', 'lb', 'oz', 'kg', 'g', 'cup', 'tsp', 'tbsp', 'bottle', 'can', 'package', 'box', 'bag', 'bunch', 'count', 'gallon']
                        .map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))
                      }
                    </select>
                    <ChevronDown 
                      size={18} 
                      style={{
                        position: 'absolute',
                        right: spacing.sm,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: colors.textSecondary
                      }}
                    />
                  </div>
                </div>
              </Flex>
              
              <Flex gap={spacing.md}>
                <Button 
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1,
                    backgroundColor: colors.background,
                    color: colors.textSecondary,
                    border: `1px solid ${colors.divider}`,
                    borderRadius: borderRadius.md,
                    padding: spacing.sm,
                    cursor: 'pointer',
                    transition: `all ${animation.fast} ${animation.easing}`
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={addItem}
                  style={{
                    flex: 1,
                    backgroundColor: colors.primary,
                    color: colors.white,
                    border: 'none',
                    borderRadius: borderRadius.md,
                    padding: spacing.sm,
                    cursor: 'pointer',
                    boxShadow: shadows.sm,
                    transition: `all ${animation.fast} ${animation.easing}`
                  }}
                >
                  Add to List
                </Button>
              </Flex>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
