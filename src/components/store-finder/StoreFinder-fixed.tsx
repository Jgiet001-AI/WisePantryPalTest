import { useState, useEffect } from "react";
import { Map, Navigation, Search, MapPin, Phone, Clock, Star, ChevronRight, Info, Locate, Route, Building, Filter } from "lucide-react";
import { 
  Container, 
  Card, 
  CardContent, 
  Button, 
  Input, 
  Text, 
  Flex, 
  Divider,
  colors,
  spacing,
  borderRadius
} from "../ui/KitchenStoriesDesign";

export default function StoreFinder() {
  const [activeTab, setActiveTab] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [filterOptions, setFilterOptions] = useState({
    openNow: false,
    inStock: false,
    organic: false,
    delivery: false
  });
  
  const [selectedStore, setSelectedStore] = useState<any>(null);
  
  const mockStores = [
    {
      id: 1,
      name: "Fresh Market",
      image: "🛒",
      address: "123 Main St, Anytown, USA",
      distance: 0.8,
      rating: 4.7,
      hours: "Open until 9:00 PM",
      phone: "(555) 123-4567",
      features: ["Organic", "Local", "Delivery"],
      inStock: ["Apples", "Bananas", "Milk", "Bread", "Eggs"],
      favorited: true,
    },
    {
      id: 2,
      name: "SuperMart",
      image: "🏪",
      address: "456 Oak Ave, Anytown, USA",
      distance: 1.2,
      rating: 4.2,
      hours: "Open until 10:00 PM",
      phone: "(555) 987-6543",
      features: ["24/7", "Pharmacy", "Deli"],
      inStock: ["Chicken", "Rice", "Pasta", "Cereal"],
      favorited: false,
    },
    {
      id: 3,
      name: "Green Grocers",
      image: "🥬",
      address: "789 Elm St, Anytown, USA",
      distance: 1.5,
      rating: 4.9,
      hours: "Open until 8:00 PM",
      phone: "(555) 456-7890",
      features: ["Organic", "Local", "Bulk Foods"],
      inStock: ["Spinach", "Kale", "Carrots", "Potatoes"],
      favorited: true,
    },
    {
      id: 4,
      name: "Corner Market",
      image: "🏬",
      address: "101 Pine Rd, Anytown, USA",
      distance: 0.4,
      rating: 3.8,
      hours: "Open until 7:00 PM",
      phone: "(555) 222-3333",
      features: ["Local", "Delivery"],
      inStock: ["Milk", "Bread", "Eggs", "Cheese"],
      favorited: false,
    },
    {
      id: 5,
      name: "Value Foods",
      image: "🛍️",
      address: "202 Maple Dr, Anytown, USA",
      distance: 2.1,
      rating: 4.0,
      hours: "Open until 11:00 PM",
      phone: "(555) 444-5555",
      features: ["Bulk Foods", "Deli", "Pharmacy"],
      inStock: ["Cereal", "Pasta", "Rice", "Beans"],
      favorited: false,
    }
  ];
  
  const [stores, setStores] = useState(mockStores);
  
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const filtered = mockStores.filter(store => 
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setStores(filtered);
    } else {
      setStores(mockStores);
    }
  }, [searchQuery]);
  
  const formatHours = (hours: string) => {
    if (hours.includes('Open')) {
      return (
        <Text variant="body2" style={{ 
          color: colors.success,
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.success, display: 'inline-block', marginRight: '4px' }}></span>
          {hours}
        </Text>
      );
    }
    return <Text variant="body2">{hours}</Text>;
  };
  
  const toggleFavorite = (id: number) => {
    setStores(prevStores => 
      prevStores.map(store => 
        store.id === id ? { ...store, favorited: !store.favorited } : store
      )
    );
    if (selectedStore && selectedStore.id === id) {
      setSelectedStore({...selectedStore, favorited: !selectedStore.favorited});
    }
  };
  
  const handleSelectStore = (store: any) => {
    setSelectedStore(store);
    setActiveTab('details');
  };
  
  const handleBackToList = () => {
    setActiveTab('list');
    setSelectedStore(null);
  };
  
  const handleViewOnMap = (store: any) => {
    setSelectedStore(store);
    setActiveTab('map');
  };
  
  const mapControls = (
    <Flex direction="column" style={{ 
      position: 'absolute', 
      right: spacing.md, 
      top: '50%', 
      transform: 'translateY(-50%)',
      zIndex: 2
    }}>
      <Button 
        variant="text" 
        size="small" 
        onClick={() => {}} 
        style={{ 
          width: '36px', 
          height: '36px', 
          minWidth: 'auto', 
          padding: 0, 
          marginBottom: spacing.xs, 
          background: 'white', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
          borderRadius: '50%' 
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </Button>
      <Button 
        variant="text" 
        size="small" 
        onClick={() => {}} 
        style={{ 
          width: '36px', 
          height: '36px', 
          minWidth: 'auto', 
          padding: 0, 
          marginBottom: spacing.xs 
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
        </svg>
      </Button>
      <Button 
        variant="text" 
        size="small" 
        onClick={() => {}} 
        style={{ 
          width: '36px', 
          height: '36px', 
          minWidth: 'auto', 
          padding: 0 
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </Button>
    </Flex>
  );
  
  return (
    <Container padding={spacing.md} style={{ maxWidth: '450px', margin: '0 auto' }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: spacing.md }}>
        <Text variant="h3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Map size={20} />
          Store Finder
        </Text>
        <Text variant="body2" style={{ 
          background: '#e6f7e6', 
          color: colors.success, 
          padding: '2px 8px', 
          borderRadius: '4px' 
        }}>
          5 stores nearby
        </Text>
      </Flex>
      
      <Flex gap={spacing.md} style={{ marginBottom: spacing.md }}>
        <Button 
          variant={activeTab === 'list' ? 'primary' : 'outlined'}
          onClick={() => setActiveTab('list')}
          style={{ flex: 1 }}
        >
          List View
        </Button>
        <Button 
          variant={activeTab === 'map' ? 'primary' : 'outlined'}
          onClick={() => setActiveTab('map')}
          style={{ flex: 1 }}
        >
          Map View
        </Button>
      </Flex>
      
      {activeTab === 'list' && (
        <div>
          <Card padding={spacing.md} margin={`0 0 ${spacing.md} 0`}>
            <Input 
              placeholder="Search stores..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={16} />}
              style={{ marginBottom: spacing.sm }}
            />
            <Flex justify="space-between" align="center">
              <Button 
                variant="text" 
                size="small"
                onClick={() => setFilterOpen(!filterOpen)}
                icon={<Filter size={16} />}
              >
                Filter
              </Button>
              <Flex align="center" gap={spacing.xs}>
                <Text variant="body2">Sort:</Text>
                <Button 
                  variant="text" 
                  size="small"
                  onClick={() => setSortBy('distance')}
                  style={{ 
                    color: sortBy === 'distance' ? colors.primary : colors.darkGray,
                    fontWeight: sortBy === 'distance' ? 'bold' : 'normal'
                  }}
                >
                  Distance
                </Button>
                <Text variant="body2">|</Text>
                <Button 
                  variant="text" 
                  size="small"
                  onClick={() => setSortBy('rating')}
                  style={{ 
                    color: sortBy === 'rating' ? colors.primary : colors.darkGray,
                    fontWeight: sortBy === 'rating' ? 'bold' : 'normal'
                  }}
                >
                  Rating
                </Button>
              </Flex>
            </Flex>
          </Card>
          
          {filterOpen && (
            <Card padding={spacing.md} margin={`0 0 ${spacing.md} 0`}>
              <Text variant="h3" style={{ marginBottom: spacing.sm }}>Filter Options</Text>
              <Flex direction="column" gap={spacing.xs} style={{ marginBottom: spacing.md }}>
                <Flex align="center" justify="space-between">
                  <Text variant="body2">Open Now</Text>
                  <input 
                    type="checkbox" 
                    checked={filterOptions.openNow} 
                    onChange={() => setFilterOptions({...filterOptions, openNow: !filterOptions.openNow})} 
                  />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text variant="body2">Items in Stock</Text>
                  <input 
                    type="checkbox" 
                    checked={filterOptions.inStock} 
                    onChange={() => setFilterOptions({...filterOptions, inStock: !filterOptions.inStock})} 
                  />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text variant="body2">Organic Options</Text>
                  <input 
                    type="checkbox" 
                    checked={filterOptions.organic} 
                    onChange={() => setFilterOptions({...filterOptions, organic: !filterOptions.organic})} 
                  />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text variant="body2">Delivery Available</Text>
                  <input 
                    type="checkbox" 
                    checked={filterOptions.delivery} 
                    onChange={() => setFilterOptions({...filterOptions, delivery: !filterOptions.delivery})} 
                  />
                </Flex>
              </Flex>
              
              <Flex gap={spacing.sm}>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => setFilterOptions({
                    openNow: false,
                    inStock: false,
                    organic: false,
                    delivery: false
                  })}
                >
                  Reset Filters
                </Button>
              </Flex>
            </Card>
          )}
        </div>
      )}
      
      {/* Map View */}
      {(activeTab === 'map' || activeTab === 'details') && (
        <div>
          {selectedStore && (
            <Card padding={spacing.md} margin={`0 0 ${spacing.md} 0`}>
              <Flex gap={spacing.md}>
                <div style={{ 
                  fontSize: '32px', 
                  height: '60px', 
                  width: '60px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: '#f0f9ff', 
                  borderRadius: '50%' 
                }}>
                  {selectedStore.image}
                </div>
                <div style={{ flex: 1 }}>
                  <Flex justify="space-between" align="flex-start">
                    <Text variant="h3">{selectedStore.name}</Text>
                    <Button 
                      variant="text" 
                      size="small"
                      onClick={() => toggleFavorite(selectedStore.id)}
                      icon={<Star size={16} color={selectedStore.favorited ? "#FFC107" : "#666"} fill={selectedStore.favorited ? "#FFC107" : "none"} />}
                    >
                      &nbsp;
                    </Button>
                  </Flex>
                  <Text variant="body2" color={colors.darkGray} style={{ marginTop: spacing.xs }}>{selectedStore.address}</Text>
                  <Flex gap={spacing.sm} style={{ marginTop: spacing.sm }}>
                    <Text variant="body2" style={{ 
                      background: '#e6f7e6', 
                      color: colors.success, 
                      padding: '2px 8px', 
                      borderRadius: '4px' 
                    }}>
                      {selectedStore.distance.toString()} mi
                    </Text>
                    <Flex align="center" style={{ color: '#F59E0B' }}>
                      <Star size={12} fill="#F59E0B" />
                      <Text variant="body2" style={{ marginLeft: '4px' }}>{selectedStore.rating.toString()}</Text>
                    </Flex>
                    {formatHours(selectedStore.hours)}
                  </Flex>
                </div>
              </Flex>
              <Flex justify="space-between" style={{ marginTop: spacing.md }}>
                <Button 
                  variant="outlined"
                  icon={<Phone size={16} />}
                  onClick={() => window.open(`tel:${selectedStore.phone}`)}
                >
                  Call
                </Button>
                <Button 
                  variant="outlined"
                  icon={<Info size={16} />}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </Button>
                <Button 
                  variant="primary"
                  icon={<Navigation size={16} />}
                  onClick={() => {}}
                >
                  Directions
                </Button>
              </Flex>
            </Card>
          )}
          <Card padding={spacing.md}>
            <div style={{ height: '300px', position: 'relative' }}>
              <CardContent>
                <Text variant="h3">Map View Coming Soon!</Text>
                <Text variant="body2">Interactive map will be available in the next update.</Text>
              </CardContent>
              {mapControls}
            </div>
          </Card>
        </div>
      )}
      
      {activeTab === 'list' && (
        <div>
          {stores.length > 0 ? (
            stores.map(store => (
              <Card 
                key={store.id}
                padding={spacing.md} 
                margin={`0 0 ${spacing.md} 0`}
                onClick={() => handleSelectStore(store)}
              >
                <Flex gap={spacing.md}>
                  <div style={{ 
                    fontSize: '32px', 
                    height: '60px', 
                    width: '60px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#f0f9ff', 
                    borderRadius: '50%' 
                  }}>
                    {store.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Flex justify="space-between" align="flex-start">
                      <Text variant="h3">{store.name}</Text>
                      <Button 
                        variant="text" 
                        size="small"
                        onClick={() => toggleFavorite(store.id)}
                        icon={<Star size={16} color={store.favorited ? "#FFC107" : "#666"} fill={store.favorited ? "#FFC107" : "none"} />}
                      >
                        &nbsp;
                      </Button>
                    </Flex>
                    <Text variant="body2" color={colors.darkGray} style={{ marginTop: spacing.xs }}>{store.address}</Text>
                    <Flex gap={spacing.sm} style={{ marginTop: spacing.sm }}>
                      <Text variant="body2" style={{ 
                        background: '#e6f7e6', 
                        color: colors.success, 
                        padding: '2px 8px', 
                        borderRadius: '4px' 
                      }}>
                        {store.distance.toString()} mi
                      </Text>
                      <Flex align="center" style={{ color: '#F59E0B' }}>
                        <Star size={12} fill="#F59E0B" />
                        <Text variant="body2" style={{ marginLeft: '4px' }}>{store.rating.toString()}</Text>
                      </Flex>
                      {formatHours(store.hours)}
                    </Flex>
                    <Flex gap={spacing.xs} style={{ marginTop: spacing.sm, flexWrap: 'wrap' }}>
                      {store.features.slice(0, 3).map((feature, index) => (
                        <Text key={index} variant="caption" style={{ 
                          background: colors.lightGray, 
                          padding: '2px 8px', 
                          borderRadius: '4px',
                          marginBottom: '4px'
                        }}>
                          {feature}
                        </Text>
                      ))}
                    </Flex>
                  </div>
                </Flex>
                <Flex justify="space-between" style={{ marginTop: spacing.md }}>
                  <Button 
                    variant="outlined"
                    icon={<Phone size={16} />}
                    onClick={() => window.open(`tel:${store.phone}`)}
                    style={{ flex: 1 }}
                  >
                    Call
                  </Button>
                  <Button 
                    variant="outlined"
                    icon={<Map size={16} />}
                    onClick={() => handleViewOnMap(store)}
                    style={{ flex: 1 }}
                  >
                    Map
                  </Button>
                  <Button 
                    variant="primary"
                    icon={<Navigation size={16} />}
                    onClick={() => {}}
                    style={{ flex: 1 }}
                  >
                    Go
                  </Button>
                </Flex>
              </Card>
            ))
          ) : (
            <Card padding={spacing.md}>
              <Text variant="h3">No stores found</Text>
              <Text variant="body2">Try adjusting your search or filters.</Text>
            </Card>
          )}
        </div>
      )}
      
      {/* Details View */}
      {activeTab === 'details' && selectedStore && (
        <div>
          <Button 
            variant="text" 
            onClick={handleBackToList}
            icon={<ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />}
            style={{ marginBottom: spacing.sm }}
          >
            Back
          </Button>
          
          <Card padding={spacing.md}>
            <Flex justify="space-between" align="flex-start" style={{ marginBottom: spacing.sm }}>
              <Text variant="h2">{selectedStore.name}</Text>
              <Button 
                variant="text" 
                onClick={() => toggleFavorite(selectedStore.id)}
                icon={<Star size={18} color={selectedStore.favorited ? "#FFC107" : "#666"} fill={selectedStore.favorited ? "#FFC107" : "none"} />}
              >
                &nbsp;
              </Button>
            </Flex>
            
            <Flex gap={spacing.sm} style={{ marginBottom: spacing.md }}>
              <Flex align="center" style={{ color: '#F59E0B' }}>
                <Star size={12} fill="#F59E0B" />
                <Text variant="body2" style={{ marginLeft: '4px' }}>{selectedStore.rating.toString()}</Text>
              </Flex>
              <Text variant="body2" style={{ 
                background: '#e6f7e6', 
                color: colors.success, 
                padding: '2px 8px', 
                borderRadius: '4px' 
              }}>
                {selectedStore.distance} miles away
              </Text>
              {formatHours(selectedStore.hours)}
            </Flex>
            
            <Divider margin={`${spacing.sm} 0`} />
            
            <Card 
              padding={spacing.md} 
              margin={`${spacing.sm} 0`}
              background={colors.lightGray}
            >
              <Flex direction="column" gap={spacing.md}>
                <Flex align="flex-start" gap={spacing.sm}>
                  <MapPin size={16} color={colors.darkGray} />
                  <Text variant="body2">{selectedStore.address}</Text>
                  <Button 
                    variant="text" 
                    size="small"
                    onClick={() => handleViewOnMap(selectedStore)}
                    icon={<Map size={16} />}
                    style={{ marginLeft: 'auto' }}
                  >
                    View on Map
                  </Button>
                </Flex>
                
                <Flex align="flex-start" gap={spacing.sm}>
                  <Phone size={16} color={colors.darkGray} />
                  <Text variant="body2">{selectedStore.phone}</Text>
                  <Button 
                    variant="text" 
                    size="small"
                    onClick={() => window.open(`tel:${selectedStore.phone}`)}
                    icon={<Phone size={16} />}
                    style={{ marginLeft: 'auto' }}
                  >
                    Call
                  </Button>
                </Flex>
                
                <Flex align="flex-start" gap={spacing.sm}>
                  <Clock size={16} color={colors.darkGray} />
                  <Text variant="body2">{selectedStore.hours}</Text>
                </Flex>
                
                <div>
                  <Text variant="h3" style={{ marginBottom: spacing.sm }}>Features</Text>
                  <Flex wrap="wrap" gap={spacing.xs}>
                    {selectedStore.features.map((feature: string, i: number) => (
                      <Text 
                        key={i} 
                        variant="body2" 
                        style={{ 
                          background: '#e6f7e6', 
                          color: colors.success, 
                          padding: '2px 8px', 
                          borderRadius: '4px' 
                        }}
                      >
                        {feature}
                      </Text>
                    ))}
                  </Flex>
                </div>
                
                <div>
                  <Text variant="h3" style={{ marginBottom: spacing.sm }}>Items in Stock</Text>
                  <ul style={{ paddingLeft: spacing.md, margin: 0 }}>
                    {selectedStore.inStock.map((item: string, i: number) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xs }}>
                        <Text variant="body2">{item}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </Flex>
            </Card>
            
            <Flex gap={spacing.sm} style={{ marginTop: spacing.md }}>
              <Button 
                variant="primary"
                icon={<Navigation size={16} />}
                onClick={() => {}}
                fullWidth
              >
                Get Directions
              </Button>
              <Button 
                variant="outlined"
                icon={<Building size={16} />}
                onClick={() => {}}
                fullWidth
              >
                Store Website
              </Button>
            </Flex>
          </Card>
        </div>
      )}
    </Container>
  );
}
