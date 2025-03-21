import { useState } from "react";
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
import { Search, Plus, Trash2, Edit, AlertTriangle, ArrowLeft, Filter, Home, Book, ShoppingCart, User } from "lucide-react";
import {
  MobileContainer,
  Container,
  Text,
  Flex,
  Divider,
  colors,
  spacing,
  BottomNavigation
} from '../ui/KitchenStoriesDesign';
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    <MobileContainer>
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
            <Text variant="h2">Pantry Inventory</Text>
          </Flex>
          <Filter 
            size={24} 
            color={selectedCategory ? colors.primary : colors.secondary}
            onClick={() => setSelectedCategory(null)}
            style={{ cursor: 'pointer' }}
          />
        </Flex>
      </div>

      <Container padding={`0 0 ${spacing.xl}`}>
        <div style={{ 
          overflowY: 'auto', 
          height: 'calc(100% - 120px)', // Account for bottom nav
          paddingBottom: '60px'
        }}>
          {/* Search and Add */}
          <div style={{ padding: spacing.md }}>
            <Flex gap={spacing.md} margin={`0 0 ${spacing.md} 0`}>
              <div style={{ 
                position: 'relative',
                flex: 1
              }}>
                <Input
                  placeholder="Search pantry items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              <Button
                onClick={onAddItem}
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
                <span>Add</span>
              </Button>
            </Flex>

            {/* Category Pills */}
            <Flex gap={spacing.xs} wrap="nowrap" style={{ overflowX: 'auto', paddingBottom: spacing.sm }}>
              <div
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: `${spacing.xs} ${spacing.sm}`,
                  backgroundColor: selectedCategory === null ? colors.primary : colors.lightGray,
                  color: selectedCategory === null ? colors.white : colors.darkGray,
                  borderRadius: '16px',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  marginRight: spacing.xs,
                }}
              >
                All
              </div>
              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: `${spacing.xs} ${spacing.sm}`,
                    backgroundColor: selectedCategory === category ? colors.primary : colors.lightGray,
                    color: selectedCategory === category ? colors.white : colors.darkGray,
                    borderRadius: '16px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    marginRight: spacing.xs,
                  }}
                >
                  {category}
                </div>
              ))}
            </Flex>
          </div>

          <Divider margin={`${spacing.xs} 0 ${spacing.md} 0`} />

          {/* Pantry Items */}
          <div style={{ padding: `0 ${spacing.md}` }}>
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: colors.background,
                    borderRadius: '8px',
                    padding: spacing.md,
                    marginBottom: spacing.md,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: isExpiringSoon(item.expiryDate) ? `1px solid ${colors.warning}` : 'none',
                  }}
                >
                  <Flex justify="space-between" align="flex-start">
                    <div>
                      <Text variant="h3">{item.name}</Text>
                      <Flex gap={spacing.md} margin={`${spacing.xs} 0`}>
                        <Text variant="body2" color={colors.darkGray}>
                          {item.quantity} {item.unit}
                        </Text>
                        <div
                          style={{
                            padding: `${spacing.xs} ${spacing.sm}`,
                            backgroundColor: colors.lightGray,
                            color: colors.darkGray,
                            borderRadius: '16px',
                            fontSize: '12px',
                          }}
                        >
                          {item.category}
                        </div>
                      </Flex>
                      <Flex align="center" gap={spacing.xs}>
                        {isExpiringSoon(item.expiryDate) && (
                          <AlertTriangle size={16} color={colors.warning} />
                        )}
                        <Text
                          variant="caption"
                          color={
                            isExpiringSoon(item.expiryDate)
                              ? colors.warning
                              : colors.darkGray
                          }
                        >
                          Expires: {formatDate(item.expiryDate)}
                        </Text>
                      </Flex>
                    </div>
                    <Flex>
                      <button
                        onClick={() => onEditItem(item)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: spacing.xs,
                          marginRight: spacing.xs,
                        }}
                      >
                        <Edit size={18} color={colors.darkGray} />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: spacing.xs,
                        }}
                      >
                        <Trash2 size={18} color={colors.error} />
                      </button>
                    </Flex>
                  </Flex>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: `${spacing.xl} 0` }}>
                <Text variant="body1" color={colors.darkGray}>
                  No items found in your pantry.
                </Text>
                <Button
                  onClick={onAddItem}
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
                  <span>Add Items</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Bottom Navigation */}
      <BottomNavigation 
        items={[
          {
            icon: <Home size={24} />,
            label: "Home",
            isActive: window.location.pathname === '/',
            onClick: () => navigate('/')
          },
          {
            icon: <Book size={24} />,
            label: "Recipes",
            isActive: window.location.pathname.includes('/recipes'),
            onClick: () => navigate('/recipes')
          },
          {
            icon: <Plus size={24} style={{ 
              backgroundColor: colors.primary, 
              color: colors.white,
              borderRadius: '50%',
              padding: '8px',
              width: '40px',
              height: '40px',
              marginBottom: '8px'
            }} />,
            label: "Scan",
            isActive: window.location.pathname === '/scan',
            onClick: () => navigate('/scan')
          },
          {
            icon: <ShoppingCart size={24} />,
            label: "Shopping",
            isActive: window.location.pathname === '/shopping',
            onClick: () => navigate('/shopping')
          },
          {
            icon: <User size={24} />,
            label: "Profile",
            isActive: window.location.pathname === '/profile',
            onClick: () => navigate('/profile')
          }
        ]}
      />
    </MobileContainer>
  );
}
