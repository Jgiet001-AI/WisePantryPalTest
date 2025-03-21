import React, { useState } from 'react';
import { Search, MapPin, Star, Navigation2, Clock, Compass } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type Store = {
  id: string;
  name: string;
  distance: string;
  address: string;
  rating: number;
  openUntil: string;
  hasFavoriteItems: boolean;
  hasSpecialOffers: boolean;
};

export default function StoreFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [storeView, setStoreView] = useState<'list' | 'map'>('list');
  const [currentLocation, setCurrentLocation] = useState('Chicago, IL');
  
  // Mock data for stores
  const stores: Store[] = [
    {
      id: '1',
      name: 'Whole Foods Market',
      distance: '0.8 mi',
      address: '1550 N Kingsbury St, Chicago',
      rating: 4.5,
      openUntil: '10:00 PM',
      hasFavoriteItems: true,
      hasSpecialOffers: true
    },
    {
      id: '2',
      name: 'Trader Joe\'s',
      distance: '1.2 mi',
      address: '1147 S Wabash Ave, Chicago',
      rating: 4.7,
      openUntil: '9:00 PM',
      hasFavoriteItems: false,
      hasSpecialOffers: true
    },
    {
      id: '3',
      name: 'Mariano\'s',
      distance: '1.5 mi',
      address: '3358 N Broadway, Chicago',
      rating: 4.2,
      openUntil: '11:00 PM',
      hasFavoriteItems: true,
      hasSpecialOffers: false
    },
    {
      id: '4',
      name: 'Aldi',
      distance: '2.1 mi',
      address: '1836 N Clybourn Ave, Chicago',
      rating: 4.0,
      openUntil: '8:00 PM',
      hasFavoriteItems: false,
      hasSpecialOffers: true
    },
  ];
  
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-3 h-3 fill-amber-400 text-amber-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-3 h-3">
          <Star className="absolute w-3 h-3 text-amber-400" />
          <Star className="absolute w-3 h-3 fill-amber-400 text-amber-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-amber-400" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="h-full overflow-auto pb-14">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800">Nearby Stores</h2>
        <Tabs value={storeView} onValueChange={(value) => setStoreView(value as any)} className="w-[150px]">
          <TabsList className="bg-white/80 backdrop-blur-lg border border-gray-100 h-8">
            <TabsTrigger value="list" className="text-xs px-2 h-6">List</TabsTrigger>
            <TabsTrigger value="map" className="text-xs px-2 h-6">Map</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Location and Search Bar */}
      <div className="mb-3 space-y-2">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-gray-500" />
          <p className="text-xs text-gray-600">{currentLocation}</p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search stores..."
            className="pl-8 py-1.5 h-8 text-xs bg-white/90 backdrop-blur-lg"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      {storeView === 'list' ? (
        <div className="space-y-2">
          {filteredStores.map(store => (
            <Card key={store.id} className="bg-white/90 backdrop-blur-lg shadow-sm border border-gray-100">
              <CardContent className="p-2.5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-sm">{store.name}</h3>
                    <div className="flex items-center gap-0.5 my-1">
                      {renderRatingStars(store.rating)}
                      <span className="text-[10px] text-gray-500 ml-1">{store.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-[10px] text-gray-600">{store.address}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="flex items-center text-[10px] text-gray-500">
                      <MapPin className="h-2.5 w-2.5 mr-0.5 text-gray-400" /> {store.distance}
                    </div>
                    <div className="flex items-center text-[10px] text-gray-500">
                      <Clock className="h-2.5 w-2.5 mr-0.5 text-gray-400" /> Open until {store.openUntil}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-1.5">
                    {store.hasFavoriteItems && (
                      <Badge variant="outline" className="bg-indigo-50 border-indigo-100 text-indigo-600 text-[9px] py-0 px-1.5 h-4">
                        Has Favorites
                      </Badge>
                    )}
                    {store.hasSpecialOffers && (
                      <Badge variant="outline" className="bg-amber-50 border-amber-100 text-amber-600 text-[9px] py-0 px-1.5 h-4">
                        Special Offers
                      </Badge>
                    )}
                  </div>
                  <Button size="sm" variant="outline" className="h-6 text-[10px] py-0 px-2 bg-white/80 border-gray-200">
                    <Navigation2 className="h-3 w-3 mr-1" /> Navigate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="relative w-full h-[400px] mb-2 rounded-lg overflow-hidden bg-gray-100">
          {/* Map placeholder */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <Compass className="h-10 w-10 text-gray-300 mb-2" />
            <p className="text-sm text-gray-400">Map View</p>
            <p className="text-xs text-gray-400 mt-1">Showing 4 nearby stores</p>
          </div>
          
          {/* Pins overlay */}
          <div className="absolute left-[30%] top-[35%]">
            <div className="relative">
              <MapPin className="h-8 w-8 text-red-500" fill="#ef4444" />
              <div className="absolute top-0 left-0 right-0 bottom-3 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">1</span>
              </div>
            </div>
          </div>
          
          <div className="absolute left-[70%] top-[40%]">
            <div className="relative">
              <MapPin className="h-8 w-8 text-red-500" fill="#ef4444" />
              <div className="absolute top-0 left-0 right-0 bottom-3 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">2</span>
              </div>
            </div>
          </div>
          
          <div className="absolute left-[45%] top-[65%]">
            <div className="relative">
              <MapPin className="h-8 w-8 text-red-500" fill="#ef4444" />
              <div className="absolute top-0 left-0 right-0 bottom-3 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">3</span>
              </div>
            </div>
          </div>
          
          <div className="absolute left-[25%] top-[55%]">
            <div className="relative">
              <MapPin className="h-8 w-8 text-red-500" fill="#ef4444" />
              <div className="absolute top-0 left-0 right-0 bottom-3 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">4</span>
              </div>
            </div>
          </div>
          
          {/* Current location marker */}
          <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div className="absolute top-[-4px] left-[-4px] w-[32px] h-[32px] rounded-full border-4 border-blue-500/30"></div>
          </div>
        </div>
      )}
    </div>
  );
}
