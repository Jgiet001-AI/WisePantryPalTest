import { useState } from "react";
import { 
  ShoppingCart, Check, X, Plus, Search, Filter, 
  MoreHorizontal, ChevronDown, ChevronUp, Trash2, 
  Edit, Clock, BarChart, ExternalLink, Home, Book,
  User, ScanLine
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
  BottomNavigation,
  Badge,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/KitchenStoriesDesign';
import { useNavigate } from "react-router-dom";

// Mock shopping list items
const mockShoppingItems = [
  { id: 1, name: 'Apples', category: 'Produce', quantity: '6', checked: false, note: 'Organic if possible', priority: 'medium' },
  { id: 2, name: 'Chicken Breast', category: 'Meat', quantity: '2 lbs', checked: false, note: '', priority: 'high' },
  { id: 3, name: 'Milk', category: 'Dairy', quantity: '1 gallon', checked: true, note: 'Whole milk', priority: 'high' },
  { id: 4, name: 'Pasta', category: 'Pantry', quantity: '2 boxes', checked: false, note: '', priority: 'low' },
  { id: 5, name: 'Broccoli', category: 'Produce', quantity: '1 bunch', checked: false, note: '', priority: 'medium' },
  { id: 6, name: 'Cheese', category: 'Dairy', quantity: '8 oz', checked: true, note: 'Cheddar, shredded', priority: 'medium' },
  { id: 7, name: 'Bread', category: 'Bakery', quantity: '1 loaf', checked: false, note: 'Whole grain', priority: 'high' },
  { id: 8, name: 'Tomatoes', category: 'Produce', quantity: '4', checked: false, note: '', priority: 'low' },
];

// Mock frequently bought items
const mockFrequentItems = [
  { id: 101, name: 'Bananas', category: 'Produce', frequency: 'Weekly' },
  { id: 102, name: 'Eggs', category: 'Dairy', frequency: 'Weekly' },
  { id: 103, name: 'Coffee', category: 'Beverages', frequency: 'Monthly' },
  { id: 104, name: 'Yogurt', category: 'Dairy', frequency: 'Weekly' },
  { id: 105, name: 'Cereal', category: 'Pantry', frequency: 'Monthly' },
];

// Mock shopping history
const mockShoppingHistory = [
  { id: 201, date: '2023-03-15', store: 'Whole Foods', total: 87.42, items: 12 },
  { id: 202, date: '2023-03-08', store: 'Trader Joe\'s', total: 64.51, items: 15 },
  { id: 203, date: '2023-03-01', store: 'Local Market', total: 42.35, items: 8 },
  { id: 204, date: '2023-02-22', store: 'Grocery Outlet', total: 56.19, items: 18 },
];

// Mock store suggestions
const mockStoreSuggestions = [
  { id: 301, name: 'Whole Foods', distance: '0.8 mi', priceMatch: 92, stockMatch: 98 },
  { id: 302, name: 'Trader Joe\'s', distance: '1.2 mi', priceMatch: 87, stockMatch: 95 },
  { id: 303, name: 'Local Market', distance: '0.5 mi', priceMatch: 78, stockMatch: 82 },
  { id: 304, name: 'Grocery Outlet', distance: '1.5 mi', priceMatch: 65, stockMatch: 72 },
];

export default function SmartShoppingList() {
  const [items, setItems] = useState(mockShoppingItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('current');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('all');
  const navigate = useNavigate();
  
  // Toggle item checked state
  const toggleItemChecked = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };
  
  // Filter items based on search and category
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });
  
  // Group items by category
  const itemsByCategory = filteredItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
  
  // All categories with counts
  const categories = Object.keys(itemsByCategory).map(category => ({
    name: category,
    count: itemsByCategory[category].length,
    checkedCount: itemsByCategory[category].filter(item => item.checked).length
  }));
  
  // Toggle category expansion
  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };
  
  return (
    <Container>
      <Flex direction="column" padding={spacing.md} style={{ paddingBottom: '90px' }}>
        <Flex justify="between" align="center" marginBottom={spacing.md}>
          <Text variant="h2" color={colors.primary} style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
            <ShoppingCart size={20} />
            Smart Shopping List
          </Text>
          <Badge color="primary">
            {items.filter(item => !item.checked).length} Items
          </Badge>
        </Flex>
        
        <Tabs value={activeTab} onChange={setActiveTab} style={{ width: '100%' }}>
          <TabsList style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', width: '100%', background: colors.backgroundLight, borderRadius: borderRadius.md, padding: spacing.xs }}>
            <TabsTrigger value="current">Current List</TabsTrigger>
            <TabsTrigger value="frequent">Frequent Items</TabsTrigger>
            <TabsTrigger value="stores">Stores</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" style={{ marginTop: spacing.md }}>
            <Flex gap={spacing.xs}>
              <Input 
                placeholder="Search items..." 
                style={{ flex: 1, padding: spacing.xs, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select value={filterCategory} onChange={setFilterCategory} style={{ width: '120px' }}>
                <SelectTrigger style={{ padding: spacing.xs, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category.name.toLowerCase()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Flex>
            
            <Flex direction="column" gap={spacing.md} style={{ marginTop: spacing.md }}>
              {expandedCategory === 'all' ? (
                Object.keys(itemsByCategory).map((category) => (
                  <Card key={category} style={{ padding: spacing.md, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
                    <Flex justify="between" align="center" style={{ marginBottom: spacing.xs, cursor: 'pointer' }} onClick={() => toggleCategory(category)}>
                      <Flex align="center" gap={spacing.xs}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: colors.primary }} />
                        <Text variant="h3" color={colors.primary}>{category}</Text>
                        <Text variant="body2" color={colors.textSecondary}>{itemsByCategory[category].filter(item => !item.checked).length} items</Text>
                      </Flex>
                      <ChevronDown size={20} />
                    </Flex>
                    
                    <Flex direction="column" gap={spacing.xs}>
                      {itemsByCategory[category].map((item) => (
                        <Flex key={item.id} align="center" gap={spacing.xs} style={{ padding: spacing.xs, borderRadius: borderRadius.md, background: item.checked ? colors.backgroundLight : 'transparent' }}>
                          <Checkbox checked={item.checked} onChange={() => toggleItemChecked(item.id)} style={{ border: `1px solid ${colors.border}` }} />
                          <Flex direction="column" style={{ flex: 1 }}>
                            <Text variant="body1" color={item.checked ? colors.textSecondary : colors.textPrimary} style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>{item.name}</Text>
                            <Text variant="body2" color={colors.textSecondary}>{item.quantity}</Text>
                            {item.note && <Text variant="body2" color={colors.textSecondary}>{item.note}</Text>}
                          </Flex>
                          <Button variant="ghost" size="sm" style={{ padding: spacing.xs, borderRadius: borderRadius.md }} onClick={() => {
                            setEditingItem(item);
                            setShowAddForm(true);
                          }}>
                            <MoreHorizontal size={20} />
                          </Button>
                        </Flex>
                      ))}
                    </Flex>
                  </Card>
                ))
              ) : (
                <Card style={{ padding: spacing.md, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
                  <Flex justify="between" align="center" style={{ marginBottom: spacing.xs, cursor: 'pointer' }} onClick={() => setExpandedCategory('all')}>
                    <Flex align="center" gap={spacing.xs}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: colors.primary }} />
                      <Text variant="h3" color={colors.primary}>{expandedCategory}</Text>
                      <Text variant="body2" color={colors.textSecondary}>{expandedCategory && itemsByCategory[expandedCategory]?.filter(item => !item.checked).length || 0} items</Text>
                    </Flex>
                    <ChevronUp size={20} />
                  </Flex>
                  
                  <Flex direction="column" gap={spacing.xs}>
                    {expandedCategory && itemsByCategory[expandedCategory]?.map((item) => (
                      <Flex key={item.id} align="center" gap={spacing.xs} style={{ padding: spacing.xs, borderRadius: borderRadius.md, background: item.checked ? colors.backgroundLight : 'transparent' }}>
                        <Checkbox checked={item.checked} onChange={() => toggleItemChecked(item.id)} style={{ border: `1px solid ${colors.border}` }} />
                        <Flex direction="column" style={{ flex: 1 }}>
                          <Text variant="body1" color={item.checked ? colors.textSecondary : colors.textPrimary} style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>{item.name}</Text>
                          <Text variant="body2" color={colors.textSecondary}>{item.quantity}</Text>
                          {item.note && <Text variant="body2" color={colors.textSecondary}>{item.note}</Text>}
                        </Flex>
                        <Flex gap={spacing.xs}>
                          <Button variant="ghost" size="sm" style={{ padding: spacing.xs, borderRadius: borderRadius.md }} onClick={() => {
                            setEditingItem(item);
                            setShowAddForm(true);
                          }}>
                            <Edit size={20} />
                          </Button>
                          <Button variant="ghost" size="sm" style={{ padding: spacing.xs, borderRadius: borderRadius.md, color: colors.danger }}>
                            <Trash2 size={20} />
                          </Button>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                </Card>
              )}
            </Flex>
            
            <Flex gap={spacing.xs} style={{ marginTop: spacing.md }}>
              <Button style={{ flex: 1, padding: spacing.md, borderRadius: borderRadius.md, background: colors.primary }} onClick={() => {
                setEditingItem(null);
                setShowAddForm(true);
              }}>
                <Plus size={20} style={{ marginRight: spacing.xs }} />
                Add Item
              </Button>
              <Button variant="outline" style={{ padding: spacing.md, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
                <ShoppingCart size={20} style={{ marginRight: spacing.xs }} />
                Start Shopping
              </Button>
            </Flex>
            
            <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
              <DialogContent style={{ maxWidth: '400px' }}>
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                </DialogHeader>
                <Flex direction="column" gap={spacing.md} style={{ padding: spacing.md }}>
                  <Input 
                    placeholder="Item Name" 
                    style={{ padding: spacing.xs, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}
                    defaultValue={editingItem?.name || ''}
                  />
                  <Flex gap={spacing.xs}>
                    <Select value={editingItem?.category?.toLowerCase() || 'produce'} onChange={(value) => {
                      if (editingItem) {
                        setEditingItem({ ...editingItem, category: value });
                      }
                    }} style={{ flex: 1, padding: spacing.xs, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="produce">Produce</SelectItem>
                        <SelectItem value="meat">Meat</SelectItem>
                        <SelectItem value="dairy">Dairy</SelectItem>
                        <SelectItem value="bakery">Bakery</SelectItem>
                        <SelectItem value="pantry">Pantry</SelectItem>
                        <SelectItem value="frozen">Frozen</SelectItem>
                        <SelectItem value="beverages">Beverages</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="Quantity" 
                      style={{ padding: spacing.xs, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}
                      defaultValue={editingItem?.quantity || ''}
                    />
                  </Flex>
                  <Input 
                    placeholder="Notes (Optional)" 
                    style={{ padding: spacing.xs, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}
                    defaultValue={editingItem?.note || ''}
                  />
                  <Select value={editingItem?.priority || 'medium'} onChange={(value) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, priority: value });
                    }
                  }} style={{ padding: spacing.xs, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Flex gap={spacing.xs}>
                    {editingItem && <Button variant="outline" style={{ flex: 1, padding: spacing.xs, borderRadius: borderRadius.md, border: `1px solid ${colors.danger}`, color: colors.danger }} onClick={() => {
                      setItems(items.filter(item => item.id !== editingItem.id));
                      setEditingItem(null);
                      setShowAddForm(false);
                    }}>
                      <Trash2 size={20} style={{ marginRight: spacing.xs }} />
                      Delete
                    </Button>}
                    <Button style={{ flex: 1, padding: spacing.xs, borderRadius: borderRadius.md, background: colors.primary }} onClick={() => {
                      if (editingItem) {
                        setItems(items.map(item => item.id === editingItem.id ? editingItem : item));
                      } else {
                        setItems([...items, { id: items.length + 1, name: '', category: 'produce', quantity: '', checked: false, note: '', priority: 'medium' }]);
                      }
                      setEditingItem(null);
                      setShowAddForm(false);
                    }}>
                      {editingItem ? 'Update Item' : 'Add to List'}
                    </Button>
                  </Flex>
                </Flex>
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="frequent" style={{ marginTop: spacing.md }}>
            <Card style={{ padding: spacing.md, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
              <CardHeader>
                <CardTitle>Frequently Bought</CardTitle>
                <Text variant="body2" color={colors.textSecondary}>Items you purchase regularly</Text>
              </CardHeader>
              <CardContent>
                <Flex direction="column" gap={spacing.md}>
                  {mockFrequentItems.map((item, index) => (
                    <Flex key={index} align="center" gap={spacing.xs} style={{ padding: spacing.xs, borderRadius: borderRadius.md, background: colors.backgroundLight }}>
                      <Text variant="body1" color={colors.textPrimary}>{item.name}</Text>
                      <Text variant="body2" color={colors.textSecondary}>{item.category}</Text>
                      <Badge color="primary" style={{ marginLeft: 'auto' }}>
                        <Clock size={15} style={{ marginRight: spacing.xs }} />
                        {item.frequency}
                      </Badge>
                      <Button variant="ghost" size="sm" style={{ padding: spacing.xs, borderRadius: borderRadius.md }}>
                        <Plus size={20} />
                      </Button>
                    </Flex>
                  ))}
                </Flex>
                
                <Divider style={{ margin: spacing.md }} />
                
                <Text variant="h3" color={colors.textPrimary} style={{ marginBottom: spacing.xs }}>Shopping History</Text>
                <Flex direction="column" gap={spacing.md}>
                  {mockShoppingHistory.map((trip, index) => (
                    <Flex key={index} align="center" gap={spacing.xs} style={{ padding: spacing.xs, borderRadius: borderRadius.md, background: colors.backgroundLight }}>
                      <Text variant="body1" color={colors.textPrimary}>{trip.store}</Text>
                      <Text variant="body2" color={colors.textSecondary}>{trip.date} • {trip.items} items</Text>
                      <Text variant="body1" color={colors.textPrimary} style={{ marginLeft: 'auto' }}>${trip.total.toFixed(2)}</Text>
                      <Button variant="ghost" size="sm" style={{ padding: spacing.xs, borderRadius: borderRadius.md }}>
                        <ExternalLink size={20} />
                      </Button>
                    </Flex>
                  ))}
                </Flex>
                
                <Divider style={{ margin: spacing.md }} />
                
                <Flex align="center" gap={spacing.xs} style={{ padding: spacing.xs, borderRadius: borderRadius.md, background: colors.backgroundLight }}>
                  <BarChart size={20} style={{ marginRight: spacing.xs }} />
                  <Text variant="body2" color={colors.textSecondary}>Shopping Insights</Text>
                  <Text variant="body2" color={colors.textSecondary} style={{ marginLeft: 'auto' }}>
                    Based on your history, you shop for groceries weekly. Your average spending is $62.50 per trip.
                  </Text>
                  <Button variant="outline" size="sm" style={{ padding: spacing.xs, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
                    View Detailed Analytics
                  </Button>
                </Flex>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stores" style={{ marginTop: spacing.md }}>
            <Card style={{ padding: spacing.md, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
              <CardHeader>
                <CardTitle>Recommended Stores</CardTitle>
                <Text variant="body2" color={colors.textSecondary}>Based on your current shopping list</Text>
              </CardHeader>
              <CardContent>
                <Flex direction="column" gap={spacing.md}>
                  {mockStoreSuggestions.map((store, index) => (
                    <Flex key={index} align="center" gap={spacing.xs} style={{ padding: spacing.xs, borderRadius: borderRadius.md, background: colors.backgroundLight }}>
                      <Text variant="body1" color={colors.textPrimary}>{store.name}</Text>
                      <Badge color="primary" style={{ marginLeft: 'auto' }}>
                        {store.distance}
                      </Badge>
                      <Flex direction="column" style={{ marginLeft: spacing.md }}>
                        <Flex align="center" gap={spacing.xs} style={{ marginBottom: spacing.xs }}>
                          <Text variant="body2" color={colors.textSecondary}>Price Match</Text>
                          <Text variant="body1" color={colors.textPrimary}>{store.priceMatch}%</Text>
                        </Flex>
                        <Flex align="center" gap={spacing.xs}>
                          <Text variant="body2" color={colors.textSecondary}>Item Availability</Text>
                          <Text variant="body1" color={colors.textPrimary}>{store.stockMatch}%</Text>
                        </Flex>
                      </Flex>
                      <Button size="sm" style={{ padding: spacing.xs, borderRadius: borderRadius.md, background: colors.primary, marginLeft: 'auto' }}>
                        Get Directions
                      </Button>
                    </Flex>
                  ))}
                </Flex>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Flex>
      
      <BottomNavigation>
        <BottomNavigation.Item 
          icon={<Home size={20} />} 
          label="Home" 
          onClick={() => navigate('/')} 
        />
        <BottomNavigation.Item 
          icon={<Book size={20} />} 
          label="Recipes" 
          onClick={() => navigate('/recipes')} 
        />
        <BottomNavigation.Item 
          icon={<ScanLine size={20} />} 
          label="Scan" 
          onClick={() => navigate('/scan')} 
        />
        <BottomNavigation.Item 
          icon={<ShoppingCart size={20} />} 
          label="Shopping" 
          isActive
          onClick={() => navigate('/shopping')} 
        />
        <BottomNavigation.Item 
          icon={<User size={20} />} 
          label="More" 
          onClick={() => navigate('/more')} 
        />
      </BottomNavigation>
    </Container>
  );
}
