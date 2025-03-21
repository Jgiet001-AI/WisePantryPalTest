import { useState, useEffect } from "react";
import { Map, Navigation, Search, MapPin, Phone, Clock, Star, ChevronRight, Info, Locate, Route, Building, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Mock data for store listings
const mockStores = [
  {
    id: 1,
    name: "Whole Foods Market",
    image: "🥬",
    distance: 0.8,
    rating: 4.5,
    address: "123 Market Street",
    phone: "(555) 123-4567",
    hours: "8:00 AM - 10:00 PM",
    features: ["Organic", "Deli", "Bakery"],
    inStock: ["Organic Apples", "Almond Milk", "Fresh Bread"],
    coordinates: { lat: 40.7128, lng: -74.0060 },
    favorited: true,
  },
  {
    id: 2,
    name: "Trader Joe's",
    image: "🛒",
    distance: 1.2,
    rating: 4.7,
    address: "456 Commerce Avenue",
    phone: "(555) 987-6543",
    hours: "9:00 AM - 9:00 PM",
    features: ["Budget-friendly", "Unique Items", "Wine"],
    inStock: ["Bananas", "Frozen Meals", "Snacks"],
    coordinates: { lat: 40.7218, lng: -74.0160 },
    favorited: false,
  },
  {
    id: 3,
    name: "Local Farmers Market",
    image: "🧺",
    distance: 2.5,
    rating: 4.8,
    address: "789 Park Plaza",
    phone: "(555) 456-7890",
    hours: "8:00 AM - 2:00 PM (Sat-Sun)",
    features: ["Local", "Fresh Produce", "Artisanal"],
    inStock: ["Seasonal Vegetables", "Fresh Eggs", "Honey"],
    coordinates: { lat: 40.7328, lng: -74.0260 },
    favorited: true,
  },
  {
    id: 4,
    name: "City Grocery",
    image: "🏪",
    distance: 0.5,
    rating: 3.9,
    address: "321 Main Street",
    phone: "(555) 789-0123",
    hours: "24 hours",
    features: ["Convenience", "Pharmacy", "ATM"],
    inStock: ["Milk", "Bread", "Essentials"],
    coordinates: { lat: 40.7428, lng: -74.0360 },
    favorited: false,
  },
];

export default function StoreFinder() {
  const [stores, setStores] = useState(mockStores);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDistance, setFilterDistance] = useState([5]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("distance");
  
  // Filter and sort stores
  const filteredStores = stores
    .filter(store => 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      store.distance <= filterDistance[0]
    )
    .sort((a, b) => {
      if (sortBy === "distance") {
        return a.distance - b.distance;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      } else {
        // Sort alphabetically
        return a.name.localeCompare(b.name);
      }
    });
  
  // Toggle store favorite
  const toggleFavorite = (storeId: number) => {
    setStores(stores.map(store => 
      store.id === storeId 
        ? { ...store, favorited: !store.favorited } 
        : store
    ));
    
    if (selectedStore && selectedStore.id === storeId) {
      setSelectedStore({...selectedStore, favorited: !selectedStore.favorited});
    }
  };
  
  // View store details
  const viewStoreDetails = (store: any) => {
    setSelectedStore(store);
    setSelectedTab("details");
  };

  // Format opening hours
  const formatHours = (hours: string) => {
    if (hours.includes("24 hours")) {
      return <Badge className="bg-green-100 text-green-800">Open 24 Hours</Badge>;
    }
    
    const currentHour = new Date().getHours();
    const openHour = parseInt(hours.split(" - ")[0].split(":")[0]);
    const closeHour = parseInt(hours.split(" - ")[1].split(":")[0]) + (hours.includes("PM") ? 12 : 0);
    
    if (currentHour >= openHour && currentHour < closeHour) {
      return <Badge className="bg-green-100 text-green-800">Open Now</Badge>;
    } else {
      return <Badge className="bg-amber-100 text-amber-800">Closed Now</Badge>;
    }
  };

  // Generate mock map component (in a real app, this would use Google Maps or similar)
  const MockMap = ({ stores, selectedId }: { stores: any[], selectedId?: number }) => (
    <div className="relative h-full w-full bg-emerald-50 rounded-lg overflow-hidden border border-emerald-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-emerald-300 text-5xl mb-4">🗺️</div>
      </div>
      
      <div className="absolute inset-0 bg-emerald-50 bg-opacity-50">
        {/* Mock map markers */}
        {stores.map((store) => (
          <div 
            key={store.id}
            className={`absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
              ${store.id === selectedId ? 'z-10' : 'z-0'}
            `}
            style={{ 
              left: `${((store.coordinates.lng + 74.04) * 100) % 90 + 5}%`, 
              top: `${((store.coordinates.lat - 40.7) * 100) % 80 + 10}%` 
            }}
            onClick={() => viewStoreDetails(store)}
          >
            <div 
              className={`
                flex items-center justify-center rounded-full p-1
                ${store.id === selectedId 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white text-emerald-500'
                }
                ${store.favorited ? 'ring-2 ring-amber-400' : ''}
              `}
            >
              <MapPin className="h-4 w-4" />
            </div>
            {store.id === selectedId && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-xs font-medium shadow-sm whitespace-nowrap">
                {store.name}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full bg-white text-emerald-500 shadow-md hover:bg-emerald-50"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full bg-white text-emerald-500 shadow-md hover:bg-emerald-50"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full bg-white text-emerald-500 shadow-md hover:bg-emerald-50"
        >
          <Locate className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="container p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
          <Map className="h-5 w-5" />
          Store Finder
        </h2>
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          {stores.filter(s => s.favorited).length} Favorites
        </Badge>
      </div>
      
      <div className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search stores or products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-8 border-emerald-200 focus:border-emerald-500"
          />
          <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
            <Search className="h-4 w-4" />
          </div>
        </div>
        <Button 
          variant="outline" 
          className="border-emerald-200 text-emerald-600"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      {showFilters && (
        <Card className="mb-4 bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Distance (miles)</label>
                <div className="px-2">
                  <Slider
                    defaultValue={filterDistance}
                    max={10}
                    step={0.5}
                    onValueChange={setFilterDistance}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 mi</span>
                    <span>{filterDistance[0]} mi</span>
                    <span>10 mi</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="name">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2 flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  className="border-emerald-200 text-emerald-600"
                  onClick={() => {
                    setFilterDistance([5]);
                    setSortBy("distance");
                  }}
                >
                  Reset
                </Button>
                <Button 
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => setShowFilters(false)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-emerald-50 rounded-lg p-1">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-4 space-y-3">
          {filteredStores.length > 0 ? (
            filteredStores.map(store => (
              <Card 
                key={store.id}
                className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => viewStoreDetails(store)}
              >
                <div className="p-3 flex items-center">
                  <div className="h-12 w-12 flex items-center justify-center text-3xl bg-emerald-50 rounded-lg mr-3">
                    {store.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{store.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={`h-6 w-6 p-0 ${store.favorited ? 'text-amber-400' : 'text-gray-400'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(store.id);
                        }}
                      >
                        <Star className={`h-4 w-4 ${store.favorited ? 'fill-amber-400' : ''}`} />
                      </Button>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge className="bg-emerald-100 text-emerald-800">
                        {store.distance} mi
                      </Badge>
                      <div className="flex items-center text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500" />
                        <span className="text-xs ml-1">{store.rating}</span>
                      </div>
                      {formatHours(store.hours)}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-lg border border-dashed border-emerald-200">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                <Map className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No stores found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery 
                  ? `No stores match "${searchQuery}"`
                  : `No stores within ${filterDistance[0]} miles`}
              </p>
              <Button 
                className="bg-emerald-500 hover:bg-emerald-600"
                onClick={() => {
                  setSearchQuery("");
                  setFilterDistance([5]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="map" className="mt-4">
          <div className="h-[350px] w-full rounded-lg overflow-hidden">
            <MockMap stores={filteredStores} selectedId={selectedStore?.id} />
          </div>
          
          {selectedStore && (
            <Card className="mt-4 bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="h-12 w-12 flex items-center justify-center text-3xl bg-emerald-50 rounded-lg mr-3">
                    {selectedStore.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{selectedStore.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={`h-6 w-6 p-0 ${selectedStore.favorited ? 'text-amber-400' : 'text-gray-400'}`}
                        onClick={() => toggleFavorite(selectedStore.id)}
                      >
                        <Star className={`h-4 w-4 ${selectedStore.favorited ? 'fill-amber-400' : ''}`} />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">{selectedStore.address}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                    <Route className="h-4 w-4 mr-2" />
                    Directions
                  </Button>
                  <Button variant="outline" className="flex-1 border-emerald-200 text-emerald-600">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="details" className="mt-4">
          {selectedStore && (
            <div className="space-y-4">
              <Button 
                variant="ghost" 
                className="mb-2 text-emerald-600"
                onClick={() => setSelectedTab("list")}
              >
                ← Back to list
              </Button>
              
              <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm overflow-hidden">
                <div className="h-40 bg-emerald-500 flex items-center justify-center">
                  <div className="text-7xl">{selectedStore.image}</div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{selectedStore.name}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={`h-8 w-8 p-0 ${selectedStore.favorited ? 'text-amber-400' : 'text-gray-400'}`}
                      onClick={() => toggleFavorite(selectedStore.id)}
                    >
                      <Star className={`h-5 w-5 ${selectedStore.favorited ? 'fill-amber-400' : ''}`} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <span className="text-sm ml-1">{selectedStore.rating}</span>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800">
                      {selectedStore.distance} miles away
                    </Badge>
                    {formatHours(selectedStore.hours)}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>{selectedStore.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>{selectedStore.phone}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-gray-700">
                      <Clock className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{selectedStore.hours}</span>
                    </div>
                    
                    <div className="pt-2">
                      <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStore.features.map((feature: string, i: number) => (
                          <Badge key={i} className="bg-emerald-100 text-emerald-800">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <h4 className="font-medium text-gray-900 mb-2">Items in Stock</h4>
                      <ul className="space-y-1">
                        {selectedStore.inStock.map((item: string, i: number) => (
                          <li key={i} className="flex items-center text-gray-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="h-40 mt-4 rounded-lg overflow-hidden">
                      <MockMap 
                        stores={[selectedStore]} 
                        selectedId={selectedStore.id} 
                      />
                    </div>
                    
                    <div className="flex gap-2 mt-2">
                      <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                        <Route className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                      <Button variant="outline" className="flex-1 border-emerald-200 text-emerald-600">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Mini components for map controls
const Plus = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const Minus = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
  </svg>
);

const Share = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);
