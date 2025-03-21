import { useState } from "react";
import { 
  ShoppingCart, Check, X, Plus, Search, Filter, 
  MoreHorizontal, ChevronDown, ChevronUp, Trash2, 
  Edit, Clock, BarChart, ExternalLink 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

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
    <div className="container p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Smart Shopping List
        </h2>
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          {items.filter(item => !item.checked).length} Items
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-emerald-50 rounded-lg p-1">
          <TabsTrigger value="current">Current List</TabsTrigger>
          <TabsTrigger value="frequent">Frequent Items</TabsTrigger>
          <TabsTrigger value="stores">Stores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="mt-4 space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search items..." 
                className="pl-8 border-emerald-200" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[120px] border-emerald-200">
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
          </div>
          
          <div className="space-y-3">
            {expandedCategory === 'all' ? (
              Object.keys(itemsByCategory).map((category) => (
                <Card 
                  key={category}
                  className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm overflow-hidden"
                >
                  <div 
                    className="px-3 py-2 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleCategory(category)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <h3 className="font-medium text-gray-900">{category}</h3>
                      <span className="text-xs text-gray-500">
                        {itemsByCategory[category].filter(item => !item.checked).length} items
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {itemsByCategory[category].map((item) => (
                      <div 
                        key={item.id}
                        className={`px-3 py-2 flex items-center gap-3 ${item.checked ? 'bg-gray-50' : ''}`}
                      >
                        <Checkbox 
                          checked={item.checked} 
                          onCheckedChange={() => toggleItemChecked(item.id)}
                          className="border-emerald-300 data-[state=checked]:bg-emerald-500"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className={`font-medium ${item.checked ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                              {item.name}
                            </p>
                            <Badge 
                              variant="outline" 
                              className="text-xs border-emerald-200"
                            >
                              {item.quantity}
                            </Badge>
                          </div>
                          {item.note && (
                            <p className="text-xs text-gray-500 truncate">
                              {item.note}
                            </p>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            setEditingItem(item);
                            setShowAddForm(true);
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              ))
            ) : (
              <Card 
                className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm overflow-hidden"
              >
                <div 
                  className="px-3 py-2 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedCategory('all')}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <h3 className="font-medium text-gray-900">{expandedCategory}</h3>
                    <span className="text-xs text-gray-500">
                      {expandedCategory && itemsByCategory[expandedCategory]?.filter(item => !item.checked).length || 0} items
                    </span>
                  </div>
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="divide-y divide-gray-100">
                  {expandedCategory && itemsByCategory[expandedCategory]?.map((item) => (
                    <div 
                      key={item.id}
                      className={`px-3 py-2 flex items-center gap-3 ${item.checked ? 'bg-gray-50' : ''}`}
                    >
                      <Checkbox 
                        checked={item.checked} 
                        onCheckedChange={() => toggleItemChecked(item.id)}
                        className="border-emerald-300 data-[state=checked]:bg-emerald-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className={`font-medium ${item.checked ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {item.name}
                          </p>
                          <Badge 
                            variant="outline" 
                            className="text-xs border-emerald-200"
                          >
                            {item.quantity}
                          </Badge>
                        </div>
                        {item.note && (
                          <p className="text-xs text-gray-500 truncate">
                            {item.note}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            setEditingItem(item);
                            setShowAddForm(true);
                          }}
                        >
                          <Edit className="h-3.5 w-3.5 text-gray-400" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-rose-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-emerald-500 hover:bg-emerald-600"
              onClick={() => {
                setEditingItem(null);
                setShowAddForm(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            <Button variant="outline" className="border-emerald-200 text-emerald-600">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
          </div>
          
          <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">Item Name</label>
                  <Input 
                    placeholder="E.g., Apples" 
                    className="border-emerald-200" 
                    defaultValue={editingItem?.name || ''}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <Select defaultValue={editingItem?.category?.toLowerCase() || 'produce'}>
                      <SelectTrigger className="border-emerald-200">
                        <SelectValue placeholder="Select category" />
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
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Quantity</label>
                    <Input 
                      placeholder="E.g., 6 or 2 lbs" 
                      className="border-emerald-200" 
                      defaultValue={editingItem?.quantity || ''}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Notes (Optional)</label>
                  <Input 
                    placeholder="E.g., Organic if possible" 
                    className="border-emerald-200" 
                    defaultValue={editingItem?.note || ''}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Priority</label>
                  <Select defaultValue={editingItem?.priority || 'medium'}>
                    <SelectTrigger className="border-emerald-200">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  {editingItem && (
                    <Button 
                      variant="outline" 
                      className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  )}
                  <Button 
                    className={`bg-emerald-500 hover:bg-emerald-600 ${editingItem ? 'flex-1' : 'w-full'}`}
                  >
                    {editingItem ? 'Update Item' : 'Add to List'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="frequent" className="mt-4 space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Frequently Bought</CardTitle>
              <p className="text-sm text-gray-500">Items you purchase regularly</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockFrequentItems.map((item, index) => (
                  <div 
                    key={index}
                    className="p-3 border border-gray-100 rounded-md bg-white flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-500">
                        {item.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.frequency}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7 w-7 p-0 text-emerald-500"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Shopping History</h4>
                <div className="space-y-2">
                  {mockShoppingHistory.map((trip, index) => (
                    <div 
                      key={index}
                      className="p-2 border border-gray-100 rounded-md bg-white flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{trip.store}</h4>
                        <p className="text-xs text-gray-500">
                          {trip.date} • {trip.items} items
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">${trip.total.toFixed(2)}</p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-7 w-7 p-0 text-gray-400"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-start p-3 bg-emerald-50 rounded-md">
                  <BarChart className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium">Shopping Insights</span>
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      Based on your history, you shop for groceries weekly. Your average spending is $62.50 per trip.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs h-7 border-emerald-200 text-emerald-700"
                    >
                      View Detailed Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stores" className="mt-4 space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Recommended Stores</CardTitle>
              <p className="text-sm text-gray-500">Based on your current shopping list</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockStoreSuggestions.map((store, index) => (
                  <div 
                    key={index}
                    className="p-3 border border-gray-100 rounded-md bg-white"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{store.name}</h4>
                      <Badge className="bg-blue-100 text-blue-800">
                        {store.distance}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-gray-600">Price Match</span>
                          <span className="text-gray-900 font-medium">{store.priceMatch}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${store.priceMatch}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-gray-600">Item Availability</span>
                          <span className="text-gray-900 font-medium">{store.stockMatch}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${store.stockMatch}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-end">
                      <Button 
                        size="sm"
                        className="text-xs bg-emerald-500 hover:bg-emerald-600"
                      >
                        Get Directions
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
