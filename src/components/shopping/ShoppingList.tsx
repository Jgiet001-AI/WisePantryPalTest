import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Container,
  Text,
  Flex,
  Divider,
  colors,
  spacing,
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
    <div>
      {/* App Bar */}
      <div style={{ 
        padding: spacing.md, 
        backgroundColor: colors.background,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: `1px solid ${colors.divider}`,
      }}>
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={spacing.sm}>
            <ArrowLeft 
              size={24} 
              color={colors.secondary} 
              onClick={() => navigate(-1)}
              style={{ cursor: 'pointer' }}
            />
            <Text variant="h2">Shopping List</Text>
          </Flex>
          <Flex gap={spacing.md}>
            <Filter 
              size={22} 
              color={filter !== "all" ? colors.primary : colors.secondary}
              onClick={() => setFilter(filter === "all" ? "unchecked" : "all")}
              style={{ cursor: 'pointer' }}
            />
            <ArrowDownUp 
              size={22} 
              color={colors.secondary}
              onClick={() => setSort(sort === "category" ? "name" : "category")}
              style={{ cursor: 'pointer' }}
            />
          </Flex>
        </Flex>
      </div>

      <Container padding={`0 0 ${spacing.xl}`}>
        <div style={{ 
          overflowY: 'auto', 
          height: 'calc(100% - 120px)', // Account for bottom nav
          paddingBottom: '60px'
        }}>
          {/* Counter and Add Button */}
          <Flex justify="space-between" align="center" padding={spacing.md}>
            <div style={{
              backgroundColor: colors.lightGray,
              padding: `${spacing.xs} ${spacing.sm}`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}>
              <ShoppingCart size={14} color={colors.darkGray} />
              <Text variant="caption" color={colors.darkGray}>
                {items.filter(i => !i.isChecked).length} items needed
              </Text>
            </div>
            <Button 
              onClick={() => setShowAddModal(true)}
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: '8px',
                padding: `${spacing.sm} ${spacing.md}`,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
                cursor: 'pointer',
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
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: `${spacing.sm} ${spacing.md} ${spacing.sm} ${spacing.xl}`,
                  borderRadius: '8px',
                  border: `1px solid ${colors.divider}`,
                  outline: 'none',
                  fontSize: '16px',
                }}
              />
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: spacing.sm,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.darkGray,
                }}
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={{ 
            padding: `0 ${spacing.md}`,
            display: 'flex',
            gap: spacing.sm,
            overflowX: 'auto',
            marginBottom: spacing.md
          }}>
            {['all', 'unchecked', 'checked', 'pantry', 'recipe', 'regular'].map((filterOption) => (
              <div
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                style={{
                  padding: `${spacing.xs} ${spacing.sm}`,
                  backgroundColor: filter === filterOption ? colors.primary : colors.lightGray,
                  color: filter === filterOption ? colors.white : colors.darkGray,
                  borderRadius: '16px',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
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
                  borderRadius: '8px',
                  padding: `${spacing.xs} ${spacing.md}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                  cursor: 'pointer',
                  width: '100%',
                  justifyContent: 'center'
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
                    style={{ paddingLeft: spacing.xs }}
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
                        backgroundColor: item.isChecked ? 'rgba(0,0,0,0.03)' : colors.background,
                        borderRadius: '8px',
                        padding: spacing.md,
                        marginBottom: spacing.sm,
                        border: `1px solid ${colors.divider}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.md,
                        opacity: item.isChecked ? 0.7 : 1
                      }}
                    >
                      <div 
                        style={{ 
                          width: '20px', 
                          height: '20px', 
                          borderRadius: '50%', 
                          border: `2px solid ${item.isChecked ? colors.success : colors.primary}`,
                          backgroundColor: item.isChecked ? colors.success : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleItem(item.id)}
                      >
                        {item.isChecked && <Check size={14} color={colors.white} />}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <Text 
                          variant="body1" 
                          style={{ 
                            textDecoration: item.isChecked ? 'line-through' : 'none',
                            color: item.isChecked ? colors.darkGray : colors.secondary
                          }}
                        >
                          {item.name}
                        </Text>
                        
                        <Flex align="center" gap={spacing.sm} margin={`${spacing.xs} 0 0 0`}>
                          <Text variant="caption" color={colors.darkGray}>
                            {item.quantity} {item.unit}
                          </Text>
                          
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '4px',
                            padding: '2px 8px',
                            borderRadius: '12px',
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
                      
                      <Trash2 
                        size={18} 
                        color={colors.error}
                        onClick={() => removeItem(item.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </motion.div>
                  ))}
                </div>
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: `${spacing.xl} ${spacing.md}`,
                color: colors.darkGray
              }}>
                <Text variant="body1">No items found in your shopping list.</Text>
                <Button 
                  onClick={() => setShowAddModal(true)}
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.white,
                    border: 'none',
                    borderRadius: '8px',
                    padding: `${spacing.sm} ${spacing.md}`,
                    marginTop: spacing.md,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: spacing.xs,
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={18} />
                  <span>Add Item</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Bottom Navigation removed to prevent duplication with App.tsx */}

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
                borderRadius: '16px',
                padding: spacing.lg,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}
            >
              <Flex justify="space-between" align="center" margin={`0 0 ${spacing.md} 0`}>
                <Text variant="h2">Add New Item</Text>
                <X 
                  size={24} 
                  color={colors.secondary}
                  onClick={() => setShowAddModal(false)}
                  style={{ cursor: 'pointer' }}
                />
              </Flex>
              
              <div style={{ marginBottom: spacing.md }}>
                <Text variant="body2" margin={`0 0 ${spacing.xs} 0`}>Item Name</Text>
                <Input
                  placeholder="Enter item name"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  style={{
                    width: '100%',
                    padding: spacing.sm,
                    borderRadius: '8px',
                    border: `1px solid ${colors.divider}`,
                    outline: 'none',
                    fontSize: '16px',
                  }}
                />
              </div>
              
              <div style={{ marginBottom: spacing.md }}>
                <Text variant="body2" margin={`0 0 ${spacing.xs} 0`}>Category</Text>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: spacing.sm,
                    borderRadius: '8px',
                    border: `1px solid ${colors.divider}`,
                    outline: 'none',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}
                >
                  {['Dairy', 'Produce', 'Meat', 'Bakery', 'Beverages', 'Canned Goods', 'Frozen', 'Snacks', 'Other']
                    .map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))
                  }
                </select>
              </div>
              
              <Flex gap={spacing.md} margin={`0 0 ${spacing.lg} 0`}>
                <div style={{ flex: 1 }}>
                  <Text variant="body2" margin={`0 0 ${spacing.xs} 0`}>Quantity</Text>
                  <Input
                    type="number"
                    min="1"
                    placeholder="1"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: spacing.sm,
                      borderRadius: '8px',
                      border: `1px solid ${colors.divider}`,
                      outline: 'none',
                      fontSize: '16px',
                    }}
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <Text variant="body2" margin={`0 0 ${spacing.xs} 0`}>Unit</Text>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    style={{
                      width: '100%',
                      padding: spacing.sm,
                      borderRadius: '8px',
                      border: `1px solid ${colors.divider}`,
                      outline: 'none',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  >
                    {['item', 'lb', 'oz', 'kg', 'g', 'cup', 'tsp', 'tbsp', 'bottle', 'can', 'package', 'box', 'bag', 'bunch', 'count', 'gallon']
                      .map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))
                    }
                  </select>
                </div>
              </Flex>
              
              <Flex gap={spacing.md}>
                <Button 
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    color: colors.secondary,
                    border: `1px solid ${colors.divider}`,
                    borderRadius: '8px',
                    padding: spacing.sm,
                    cursor: 'pointer',
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
                    borderRadius: '8px',
                    padding: spacing.sm,
                    cursor: 'pointer',
                  }}
                >
                  Add to List
                </Button>
              </Flex>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
