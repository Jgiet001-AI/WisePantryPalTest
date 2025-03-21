import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scan, Search, Flame, ArrowRight, Leaf, Clock } from "lucide-react";

interface Product {
  name: string;
  brand: string;
  nutritionScore: "A" | "B" | "C" | "D" | "E";
  price: number;
  expiryDays: number;
  stores: Array<{ name: string; price: number }>;
  alternatives: Array<{ name: string; brand: string; nutritionScore: "A" | "B" | "C" | "D" | "E"; price: number }>;
}

export default function EnhancedPantryScanner() {
  const [barcode, setBarcode] = useState("");
  const [scanning, setScanning] = useState(false);
  const [searchResults, setSearchResults] = useState<Product | null>(null);
  const [showAlternatives, setShowAlternatives] = useState(false);

  // Mock data for the demo
  const mockProducts: { [key: string]: Product } = {
    "7350053850019": {
      name: "Organic Almond Milk",
      brand: "Eco Valley",
      nutritionScore: "A",
      price: 3.99,
      expiryDays: 14,
      stores: [
        { name: "Whole Foods", price: 3.99 },
        { name: "Trader Joe's", price: 3.49 },
        { name: "Local Market", price: 4.29 },
      ],
      alternatives: [
        { name: "Oat Milk", brand: "Oatly", nutritionScore: "A", price: 3.79 },
        { name: "Coconut Milk", brand: "Nature's Best", nutritionScore: "B", price: 2.99 },
      ],
    },
    "5000112637939": {
      name: "Chocolate Cookies",
      brand: "Sweet Delights",
      nutritionScore: "D",
      price: 2.49,
      expiryDays: 90,
      stores: [
        { name: "Market Express", price: 2.49 },
        { name: "FoodMart", price: 2.29 },
        { name: "SuperValue", price: 2.79 },
      ],
      alternatives: [
        { name: "Oatmeal Cookies", brand: "Healthy Bites", nutritionScore: "B", price: 3.29 },
        { name: "Protein Cookies", brand: "FitSnack", nutritionScore: "B", price: 4.49 },
      ],
    },
    // Add default for any barcode
    "default": {
      name: "Frozen Pizza",
      brand: "Quick Meal",
      nutritionScore: "C",
      price: 5.99,
      expiryDays: 180,
      stores: [
        { name: "Grocery Outlet", price: 5.99 },
        { name: "SaveMart", price: 5.49 },
        { name: "MegaStore", price: 6.29 },
      ],
      alternatives: [
        { name: "Veggie Pizza", brand: "Green Kitchen", nutritionScore: "B", price: 6.99 },
        { name: "Cauliflower Crust Pizza", brand: "Healthy Base", nutritionScore: "A", price: 7.49 },
      ],
    },
  };

  const handleBarcodeScan = () => {
    // Simulate scanning
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const product = mockProducts[barcode] || mockProducts["default"];
      setSearchResults(product);
      setShowAlternatives(false);
    }, 1500);
  };

  const handleManualSearch = () => {
    if (barcode.trim() === "") return;
    const product = mockProducts[barcode] || mockProducts["default"];
    setSearchResults(product);
    setShowAlternatives(false);
  };

  const getNutritionScoreColor = (score: "A" | "B" | "C" | "D" | "E") => {
    const colors = {
      A: "bg-green-500",
      B: "bg-green-300",
      C: "bg-yellow-400",
      D: "bg-orange-400",
      E: "bg-red-500",
    };
    return colors[score];
  };

  return (
    <div className="py-2">
      {/* Scanner Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Enhanced Pantry Scanner</h2>
        <p className="text-sm text-gray-500 mt-1">Scan barcodes to get detailed product information</p>
      </div>

      {/* Scanner Input */}
      <Card className="bg-white/80 backdrop-blur-lg shadow-sm border border-gray-100 mb-6">
        <CardContent className="p-5">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-3">
              <Input
                type="text"
                placeholder="Enter barcode number..."
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="bg-white/90"
              />
              <Button 
                variant="outline" 
                onClick={handleManualSearch}
                className="border-gray-200 hover:bg-gray-50"
              >
                <Search className="h-4 w-4 mr-1" />
                Find
              </Button>
            </div>
            
            <div className="flex justify-center">
              <Button
                onClick={handleBarcodeScan}
                className={`w-full bg-green-500 hover:bg-green-600 text-white ${scanning ? "opacity-70" : ""}`}
                disabled={scanning}
              >
                <Scan className="h-4 w-4 mr-2" />
                {scanning ? "Scanning..." : "Scan Barcode"}
              </Button>
            </div>
            
            <div className="text-xs text-center text-gray-500 mt-1">
              Try these sample barcodes: 7350053850019, 5000112637939
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Results */}
      {searchResults && (
        <Card className="bg-white/80 backdrop-blur-lg shadow-sm border border-gray-100 mb-6">
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="text-base font-medium flex items-center justify-between">
              <span>Product Information</span>
              <div className={`${getNutritionScoreColor(searchResults.nutritionScore)} h-6 w-6 rounded-full text-white flex items-center justify-center text-sm font-bold`}>
                {searchResults.nutritionScore}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="mb-4">
              <h3 className="text-lg font-medium">{searchResults.name}</h3>
              <p className="text-gray-500 text-sm">by {searchResults.brand}</p>
              
              <div className="flex items-center mt-3 text-sm text-gray-600">
                <div className="flex items-center mr-4">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                  <span>Shelf life: {searchResults.expiryDays} days</span>
                </div>
                <div className="flex items-center">
                  <Flame className="h-4 w-4 mr-1 text-orange-400" />
                  <span>{searchResults.price.toFixed(2)} avg. price</span>
                </div>
              </div>
            </div>
            
            {/* Store comparison */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Price Comparison</h4>
              <div className="grid grid-cols-3 gap-2">
                {searchResults.stores.map((store, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded-md text-center">
                    <p className="text-xs text-gray-600">{store.name}</p>
                    <p className="font-medium">${store.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Alternatives Button */}
            <Button
              variant="outline"
              onClick={() => setShowAlternatives(!showAlternatives)}
              className="w-full border-green-100 bg-green-50 hover:bg-green-100 text-green-700"
            >
              <Leaf className="h-4 w-4 mr-2" />
              {showAlternatives ? "Hide Alternatives" : "Show Healthier Alternatives"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Alternatives */}
      {searchResults && showAlternatives && (
        <Card className="bg-white/80 backdrop-blur-lg shadow-sm border border-gray-100">
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="text-base font-medium">Healthier Alternatives</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="space-y-4">
              {searchResults.alternatives.map((alt, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`${getNutritionScoreColor(alt.nutritionScore)} h-6 w-6 rounded-full text-white flex items-center justify-center text-sm font-bold mr-3`}>
                    {alt.nutritionScore}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{alt.name}</h4>
                    <p className="text-gray-500 text-sm">{alt.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${alt.price.toFixed(2)}</p>
                    <Button variant="ghost" size="sm" className="mt-1 h-7 text-green-600 hover:text-green-700 hover:bg-green-50 p-0">
                      <span className="text-xs">Add to List</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
