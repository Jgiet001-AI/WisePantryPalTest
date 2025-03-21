import { useState, useEffect } from "react";
import { 
  ShoppingCart, AlertCircle, ChevronDown, ChevronUp, TrendingDown, TrendingUp, BarChart3, Store, ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Mock data for price comparison
const mockItems = [
  {
    id: 1,
    name: "Organic Apples",
    image: "🍎",
    currentPrice: 2.99,
    previousPrice: 3.49,
    priceHistory: [3.29, 3.49, 3.39, 3.19, 2.99],
    stores: [
      { name: "Fresh Market", price: 2.99, distance: 0.8 },
      { name: "Whole Foods", price: 3.29, distance: 1.2 },
      { name: "Trader Joe's", price: 3.49, distance: 2.5 },
    ],
    onWatchlist: true,
    alertThreshold: 3.00,
  },
  {
    id: 2,
    name: "Almond Milk",
    image: "🥛",
    currentPrice: 4.29,
    previousPrice: 4.29,
    priceHistory: [4.49, 4.39, 4.29, 4.29, 4.29],
    stores: [
      { name: "Fresh Market", price: 4.49, distance: 0.8 },
      { name: "Whole Foods", price: 4.29, distance: 1.2 },
      { name: "Trader Joe's", price: 3.99, distance: 2.5 },
    ],
    onWatchlist: false,
    alertThreshold: 3.50,
  },
  {
    id: 3,
    name: "Organic Eggs",
    image: "🥚",
    currentPrice: 5.99,
    previousPrice: 6.49,
    priceHistory: [6.99, 6.79, 6.49, 6.29, 5.99],
    stores: [
      { name: "Fresh Market", price: 5.99, distance: 0.8 },
      { name: "Whole Foods", price: 6.29, distance: 1.2 },
      { name: "Trader Joe's", price: 6.49, distance: 2.5 },
    ],
    onWatchlist: true,
    alertThreshold: 5.50,
  },
  {
    id: 4,
    name: "Avocados",
    image: "🥑",
    currentPrice: 1.49,
    previousPrice: 1.99,
    priceHistory: [2.29, 2.19, 1.99, 1.79, 1.49],
    stores: [
      { name: "Fresh Market", price: 1.79, distance: 0.8 },
      { name: "Whole Foods", price: 1.99, distance: 1.2 },
      { name: "Trader Joe's", price: 1.49, distance: 2.5 },
    ],
    onWatchlist: false,
    alertThreshold: 1.75,
  },
  {
    id: 5,
    name: "Chicken Breast",
    image: "🍗",
    currentPrice: 8.99,
    previousPrice: 7.99,
    priceHistory: [7.49, 7.79, 7.99, 8.49, 8.99],
    stores: [
      { name: "Fresh Market", price: 9.49, distance: 0.8 },
      { name: "Whole Foods", price: 8.99, distance: 1.2 },
      { name: "Trader Joe's", price: 8.49, distance: 2.5 },
    ],
    onWatchlist: true,
    alertThreshold: 8.00,
  }
];

export default function PriceComparison() {
  const [items, setItems] = useState(mockItems);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "stores">("asc");
  const [showPriceDrops, setShowPriceDrops] = useState(false);
  const [activePriceAlerts, setActivePriceAlerts] = useState<number[]>([1, 3, 5]);

  // Filter and sort items
  const filteredItems = items
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!showPriceDrops || item.currentPrice < item.previousPrice)
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.currentPrice - b.currentPrice;
      } else if (sortOrder === "desc") {
        return b.currentPrice - a.currentPrice;
      } else {
        // Sort by best store price
        const aLowestPrice = Math.min(...a.stores.map(s => s.price));
        const bLowestPrice = Math.min(...b.stores.map(s => s.price));
        return aLowestPrice - bLowestPrice;
      }
    });

  // Toggle price alert
  const togglePriceAlert = (itemId: number) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, onWatchlist: !item.onWatchlist } 
        : item
    ));
    
    if (activePriceAlerts.includes(itemId)) {
      setActivePriceAlerts(activePriceAlerts.filter(id => id !== itemId));
    } else {
      setActivePriceAlerts([...activePriceAlerts, itemId]);
    }
  };

  // View item details
  const viewItemDetails = (item: any) => {
    setSelectedItem(item);
  };

  // Calculate price trend indicators
  const getPriceTrend = (current: number, previous: number) => {
    const percentChange = ((current - previous) / previous) * 100;
    if (percentChange < -5) return { icon: <TrendingDown className="h-4 w-4 text-green-500" />, text: "Significant drop", color: "text-green-500" };
    if (percentChange < 0) return { icon: <TrendingDown className="h-4 w-4 text-emerald-500" />, text: "Price drop", color: "text-emerald-500" };
    if (percentChange === 0) return { icon: <BarChart3 className="h-4 w-4 text-gray-500" />, text: "Stable", color: "text-gray-500" };
    if (percentChange < 5) return { icon: <TrendingUp className="h-4 w-4 text-amber-500" />, text: "Slight increase", color: "text-amber-500" };
    return { icon: <TrendingUp className="h-4 w-4 text-red-500" />, text: "Significant increase", color: "text-red-500" };
  };

  return (
    <div className="container p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Price Comparison
        </h2>
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          {activePriceAlerts.length} Alerts
        </Badge>
      </div>

      {selectedItem ? (
        <div className="space-y-4">
          <Button 
            variant="ghost" 
            className="mb-2 text-emerald-600"
            onClick={() => setSelectedItem(null)}
          >
            ← Back to list
          </Button>
          
          <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <span className="text-2xl">{selectedItem.image}</span>
                  {selectedItem.name}
                </CardTitle>
                <Button 
                  variant={selectedItem.onWatchlist ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => togglePriceAlert(selectedItem.id)}
                  className={selectedItem.onWatchlist 
                    ? "bg-emerald-500 hover:bg-emerald-600" 
                    : "text-emerald-500 border-emerald-200 hover:bg-emerald-50"
                  }
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {selectedItem.onWatchlist ? "Alert On" : "Set Alert"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stores">
                <TabsList className="grid grid-cols-3 bg-emerald-50">
                  <TabsTrigger value="stores">Stores</TabsTrigger>
                  <TabsTrigger value="history">Price History</TabsTrigger>
                  <TabsTrigger value="alert">Alert Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="stores" className="pt-4">
                  <div className="space-y-3">
                    {selectedItem.stores.map((store: any, index: number) => (
                      <div 
                        key={`${store.name}-${index}`} 
                        className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Store className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="font-medium">{store.name}</p>
                            <p className="text-xs text-gray-500">{store.distance} miles away</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${store.price.toFixed(2)}</p>
                          {store.price === Math.min(...selectedItem.stores.map((s: any) => s.price)) && (
                            <Badge className="bg-emerald-100 text-emerald-800">Best Price</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="pt-4">
                  <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Current Price</p>
                        <p className="font-bold text-lg">${selectedItem.currentPrice.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Previous</p>
                        <div className="flex items-center gap-1">
                          <p className="font-medium">${selectedItem.previousPrice.toFixed(2)}</p>
                          {getPriceTrend(selectedItem.currentPrice, selectedItem.previousPrice).icon}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="font-medium mb-2">Price History (Last 5 Weeks)</p>
                      <div className="relative h-20 bg-emerald-50 rounded-md p-2">
                        <div className="flex h-full items-end justify-around gap-1">
                          {selectedItem.priceHistory.map((price: number, i: number) => {
                            const maxPrice = Math.max(...selectedItem.priceHistory);
                            const minPrice = Math.min(...selectedItem.priceHistory);
                            const range = maxPrice - minPrice;
                            const height = range === 0 
                              ? 80 
                              : Math.max(20, ((price - minPrice) / range) * 80);
                            
                            return (
                              <div 
                                key={i} 
                                className="relative flex-1 group"
                              >
                                <div 
                                  className={`
                                    ${i === selectedItem.priceHistory.length - 1 ? 'bg-emerald-500' : 'bg-emerald-300'} 
                                    rounded-t-sm hover:opacity-80 transition-opacity
                                  `}
                                  style={{ height: `${height}%` }}
                                ></div>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                  ${price.toFixed(2)}
                                </div>
                                <div className="text-xs text-center mt-1 text-gray-500">
                                  W{i+1}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="alert" className="pt-4">
                  <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div className="mb-4">
                      <Label htmlFor="alert-active" className="flex justify-between items-center">
                        <span>Price Drop Alert</span>
                        <Switch 
                          id="alert-active" 
                          checked={selectedItem.onWatchlist}
                          onCheckedChange={() => togglePriceAlert(selectedItem.id)}
                        />
                      </Label>
                    </div>
                    
                    <div className="mb-4">
                      <Label htmlFor="alert-threshold" className="mb-1 block">
                        Alert me when price falls below:
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="alert-threshold"
                          type="number" 
                          step="0.01"
                          min="0"
                          value={selectedItem.alertThreshold}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            setItems(items.map(item => 
                              item.id === selectedItem.id 
                                ? { ...item, alertThreshold: value } 
                                : item
                            ));
                            setSelectedItem({...selectedItem, alertThreshold: value});
                          }}
                          className="border-emerald-200 focus:border-emerald-500"
                        />
                        <Button 
                          className="bg-emerald-500 hover:bg-emerald-600"
                          disabled={!selectedItem.onWatchlist}
                        >
                          Save
                        </Button>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">
                        Current lowest price: ${Math.min(...selectedItem.stores.map((s: any) => s.price)).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-sm font-medium mb-2">Notification Preferences</p>
                      <ToggleGroup type="multiple" variant="outline" className="mt-2 justify-start">
                        <ToggleGroupItem value="app" aria-label="Toggle app" className="data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800 data-[state=on]:border-emerald-200">
                          App
                        </ToggleGroupItem>
                        <ToggleGroupItem value="email" aria-label="Toggle email" className="data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800 data-[state=on]:border-emerald-200">
                          Email
                        </ToggleGroupItem>
                        <ToggleGroupItem value="sms" aria-label="Toggle SMS" className="data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800 data-[state=on]:border-emerald-200">
                          SMS
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-emerald-200 focus:border-emerald-500"
            />
            <Select value={sortOrder} onValueChange={(value: any) => setSortOrder(value)}>
              <SelectTrigger className="w-[140px] border-emerald-200 focus:border-emerald-500">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Price: Low to High</SelectItem>
                <SelectItem value="desc">Price: High to Low</SelectItem>
                <SelectItem value="stores">Best Store Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="price-drops" className="flex items-center gap-2 text-sm cursor-pointer">
              <Switch 
                id="price-drops"
                checked={showPriceDrops}
                onCheckedChange={setShowPriceDrops}
              />
              Show only price drops
            </Label>
            <Badge className="bg-emerald-100 text-emerald-800">
              {filteredItems.length} Items
            </Badge>
          </div>
          
          <div className="space-y-3">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <Card 
                  key={item.id}
                  className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm overflow-hidden"
                >
                  <div 
                    className="p-3 flex items-center justify-between cursor-pointer"
                    onClick={() => viewItemDetails(item)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{item.image}</div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center text-sm mt-0.5">
                          {getPriceTrend(item.currentPrice, item.previousPrice).icon}
                          <span className={`ml-1 ${getPriceTrend(item.currentPrice, item.previousPrice).color}`}>
                            {item.currentPrice < item.previousPrice
                              ? `$${(item.previousPrice - item.currentPrice).toFixed(2)} less`
                              : item.currentPrice > item.previousPrice
                              ? `$${(item.currentPrice - item.previousPrice).toFixed(2)} more`
                              : "No change"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${item.currentPrice.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 line-through">${item.previousPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="px-3 pb-3 pt-1 flex justify-between items-center border-t border-gray-100">
                    <div className="flex items-center text-sm">
                      <Store className="h-4 w-4 text-emerald-500 mr-1" />
                      <span>
                        Best: ${Math.min(...item.stores.map(s => s.price)).toFixed(2)} at {
                          item.stores.reduce((best, store) => 
                            store.price < best.price ? store : best
                          ).name
                        }
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${activePriceAlerts.includes(item.id) 
                        ? 'text-emerald-600' 
                        : 'text-gray-500 hover:text-emerald-600'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePriceAlert(item.id);
                      }}
                    >
                      <AlertCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-lg border border-dashed border-emerald-200">
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                  <ShoppingCart className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery 
                    ? `No items match "${searchQuery}"`
                    : showPriceDrops
                    ? "No price drops found currently"
                    : "Add items to your watchlist to compare prices"}
                </p>
                <Button 
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => {
                    setSearchQuery("");
                    setShowPriceDrops(false);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
