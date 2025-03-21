import { useState, useEffect } from "react";
import { 
  ShoppingCart, AlertCircle, ChevronDown, ChevronUp, TrendingDown, TrendingUp, BarChart3, Store, ExternalLink
} from "lucide-react";
import {
  Container,
  Text,
  Flex,
  Divider,
  Button,
  Card,
  colors,
  spacing,
  shadows,
  borderRadius,
} from '../ui/KitchenStoriesDesign';
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [items, setItems] = useState(mockItems);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "stores">("asc");
  const [showPriceDrops, setShowPriceDrops] = useState(false);
  const [activePriceAlerts, setActivePriceAlerts] = useState<number[]>([1, 3]);

  // Filter and sort items
  const filteredItems = items
    .filter(item => {
      // Handle search query
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Handle price drop filter
      const isPriceDrop = showPriceDrops ? item.currentPrice < item.previousPrice : true;
      
      return matchesSearch && isPriceDrop;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "asc":
          return a.currentPrice - b.currentPrice;
        case "desc":
          return b.currentPrice - a.currentPrice;
        case "stores":
          const aMinPrice = Math.min(...a.stores.map((s: any) => s.price));
          const bMinPrice = Math.min(...b.stores.map((s: any) => s.price));
          return aMinPrice - bMinPrice;
        default:
          return 0;
      }
    });

  // View item details
  const viewItemDetails = (item: any) => {
    setSelectedItem(item);
  };

  // Toggle price alert
  const togglePriceAlert = (id: number) => {
    if (activePriceAlerts.includes(id)) {
      setActivePriceAlerts(activePriceAlerts.filter(itemId => itemId !== id));
      
      setItems(items.map(item => 
        item.id === id ? { ...item, onWatchlist: false } : item
      ));
      
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, onWatchlist: false });
      }
    } else {
      setActivePriceAlerts([...activePriceAlerts, id]);
      
      setItems(items.map(item => 
        item.id === id ? { ...item, onWatchlist: true } : item
      ));
      
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, onWatchlist: true });
      }
    }
  };

  // Helper function to get price trend indicators
  const getPriceTrend = (current: number, previous: number) => {
    if (current < previous) {
      return { 
        icon: <TrendingDown size={16} className="text-emerald-500" />, 
        color: "text-emerald-600",
        label: "Price dropped"
      };
    } else if (current > previous) {
      return { 
        icon: <TrendingUp size={16} className="text-rose-500" />, 
        color: "text-rose-600",
        label: "Price increased"
      };
    } else {
      return { 
        icon: <BarChart3 size={16} className="text-gray-500" />, 
        color: "text-gray-600",
        label: "Price unchanged"
      };
    }
  };

  return (
    <Container padding={spacing.md} style={{ maxWidth: '100%', margin: '0 auto', paddingBottom: '90px' }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: spacing.md }}>
        <Text variant="h2" color={colors.primary} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShoppingCart size={20} />
          Price Comparison
        </Text>
        <Text variant="body2" style={{ background: '#e6f7f0', color: colors.primary, padding: '4px 8px', borderRadius: borderRadius.sm }}>
          {activePriceAlerts.length} Alerts
        </Text>
      </Flex>

      {selectedItem ? (
        <div>
          <Button 
            variant="text" 
            onClick={() => setSelectedItem(null)} 
            style={{ marginBottom: spacing.md }}
          >
            ← Back to list
          </Button>
          
          <Card padding={spacing.md} margin={`0 0 ${spacing.md} 0`}>
            <Flex justify="space-between" align="center" style={{ marginBottom: spacing.sm }}>
              <Text variant="h3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>{selectedItem.image}</span>
                {selectedItem.name}
              </Text>
              <Button 
                variant={selectedItem.onWatchlist ? "primary" : "outlined"} 
                size="small" 
                onClick={() => togglePriceAlert(selectedItem.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <AlertCircle size={16} />
                {selectedItem.onWatchlist ? "Alert On" : "Set Alert"}
              </Button>
            </Flex>
            
            <Divider margin={`${spacing.sm} 0`} />
            
            <Flex style={{ background: colors.lightGray, borderRadius: borderRadius.sm, padding: spacing.xs }}>
              <Text variant="body1" style={{ padding: spacing.sm, cursor: 'pointer' }}>Stores</Text>
              <Text variant="body1" style={{ padding: spacing.sm, cursor: 'pointer' }}>Price History</Text>
              <Text variant="body1" style={{ padding: spacing.sm, cursor: 'pointer' }}>Alert Settings</Text>
            </Flex>
              
            <div style={{ padding: `${spacing.md} 0` }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                {selectedItem.stores.map((store: any, index: number) => (
                  <Card 
                    key={`${store.name}-${index}`} 
                    padding={spacing.md}
                  >
                    <Flex justify="space-between" align="center">
                      <Flex gap={spacing.sm} align="center">
                        <Store size={20} color={colors.primary} />
                        <div>
                          <Text variant="body1" style={{ fontWeight: 500 }}>{store.name}</Text>
                          <Text variant="caption" color={colors.darkGray}>{store.distance} miles away</Text>
                        </div>
                      </Flex>
                      <div style={{ textAlign: 'right' }}>
                        <Text variant="h3">${store.price.toFixed(2)}</Text>
                        {store.price === Math.min(...selectedItem.stores.map((s: any) => s.price)) && (
                          <Text variant="caption" style={{ background: '#e6f7f0', color: colors.primary, padding: '2px 6px', borderRadius: borderRadius.sm }}>
                            Best Price
                          </Text>
                        )}
                      </div>
                    </Flex>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <>
          <Flex gap={spacing.sm} style={{ marginBottom: spacing.md }}>
            <input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                flex: 1, 
                padding: spacing.sm, 
                border: `1px solid ${colors.divider}`,
                borderRadius: borderRadius.sm,
                outline: 'none'
              }}
            />
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "stores")}
              style={{ 
                padding: spacing.sm, 
                border: `1px solid ${colors.divider}`,
                borderRadius: borderRadius.sm,
                background: colors.white,
                width: '200px'
              }}
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
              <option value="stores">Best Store Price</option>
            </select>
          </Flex>
          
          <Flex justify="space-between" align="center" style={{ marginBottom: spacing.md }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, fontSize: '14px', cursor: 'pointer' }}>
              <input 
                type="checkbox"
                checked={showPriceDrops}
                onChange={(e) => setShowPriceDrops(e.target.checked)}
              />
              Show only price drops
            </label>
            <Text variant="body2" style={{ background: '#e6f7f0', color: colors.primary, padding: '4px 8px', borderRadius: borderRadius.sm }}>
              {filteredItems.length} Items
            </Text>
          </Flex>
          
          {/* Main content area - all items */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: spacing.sm,
            flex: 1,
            overflowY: 'auto',
            paddingBottom: '120px'
          }}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card 
                  key={item.id}
                  padding="0"
                  margin={`0 0 ${spacing.xs} 0`}
                >
                  <div 
                    style={{ padding: spacing.md, cursor: 'pointer' }}
                    onClick={() => viewItemDetails(item)}
                  >
                    <Flex justify="space-between" align="center">
                      <Flex gap={spacing.sm} align="center">
                        <div style={{ fontSize: '24px' }}>{item.image}</div>
                        <div>
                          <Text variant="body1" style={{ fontWeight: 500 }}>{item.name}</Text>
                          <Flex align="center" style={{ marginTop: '2px' }}>
                            {getPriceTrend(item.currentPrice, item.previousPrice).icon}
                            <Text 
                              variant="caption" 
                              color={item.currentPrice < item.previousPrice ? colors.success : 
                                    item.currentPrice > item.previousPrice ? colors.error : 
                                    colors.darkGray}
                              style={{ marginLeft: '4px' }}
                            >
                              {item.currentPrice < item.previousPrice
                                ? `$${(item.previousPrice - item.currentPrice).toFixed(2)} less`
                                : item.currentPrice > item.previousPrice
                                ? `$${(item.currentPrice - item.previousPrice).toFixed(2)} more`
                                : "No change"}
                            </Text>
                          </Flex>
                        </div>
                      </Flex>
                      <div style={{ textAlign: 'right' }}>
                        <Text variant="h3">${item.currentPrice.toFixed(2)}</Text>
                        <Text variant="caption" color={colors.midGray} style={{ textDecoration: 'line-through' }}>
                          ${item.previousPrice.toFixed(2)}
                        </Text>
                      </div>
                    </Flex>
                  </div>
                  
                  <Divider margin="0" />
                  
                  <Flex justify="space-between" align="center" style={{ padding: spacing.sm }}>
                    <Flex align="center" gap={spacing.xs}>
                      <Store size={16} color={colors.primary} />
                      <Text variant="caption">
                        Best: ${Math.min(...item.stores.map(s => s.price)).toFixed(2)} at {
                          item.stores.reduce((best, store) => 
                            store.price < best.price ? store : best
                          ).name
                        }
                      </Text>
                    </Flex>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => togglePriceAlert(item.id)}
                      style={{ 
                        color: item.onWatchlist ? colors.primary : colors.darkGray,
                        padding: spacing.xs
                      }}
                    >
                      <AlertCircle size={16} />
                    </Button>
                  </Flex>
                </Card>
              ))
            ) : (
              <Card padding={spacing.lg} margin={`${spacing.md} 0`}>
                <div style={{ textAlign: 'center', marginBottom: spacing.sm }}>
                  <ShoppingCart size={24} color={colors.primary} />
                </div>
                <Text variant="h3" style={{ marginBottom: spacing.xs }}>No items found</Text>
                <Text variant="body2" color={colors.darkGray} style={{ marginBottom: spacing.md }}>
                  {searchQuery 
                    ? `No items match "${searchQuery}"`
                    : showPriceDrops
                    ? "No items with price drops found"
                    : "Add items to your watchlist to compare prices"}
                </Text>
                <Button 
                  variant="primary"
                  onClick={() => {
                    setSearchQuery("");
                    setShowPriceDrops(false);
                  }}
                >
                  Reset Filters
                </Button>
              </Card>
            )}
          </div>
        </>
      )}
    </Container>
  );
}
