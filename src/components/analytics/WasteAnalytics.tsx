import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown, DollarSign, Leaf, BarChart3, PieChart } from "lucide-react";

// Mock data interfaces
interface WasteData {
  date: string;
  wastePercentage: number;
  savedMoney: number;
  carbonSaved: number;
}

interface FoodCategory {
  name: string;
  wastePercentage: number;
  savedPercentage: number;
}

export default function WasteAnalytics() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("month");
  const [wasteData, setWasteData] = useState<WasteData[]>([]);
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  
  // Mock data generation
  useEffect(() => {
    // Generate waste trend data
    const mockWasteData: WasteData[] = [];
    const now = new Date();
    let dataPoints = timeframe === "week" ? 7 : timeframe === "month" ? 30 : 12;
    
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(now);
      
      if (timeframe === "week" || timeframe === "month") {
        date.setDate(date.getDate() - (dataPoints - i - 1));
      } else {
        date.setMonth(date.getMonth() - (dataPoints - i - 1));
      }
      
      // Generate improving trend (waste percentage decreasing over time)
      const initialWaste = 40;
      const improvement = (i / dataPoints) * 25; // Progressive improvement
      const wastePercentage = Math.max(initialWaste - improvement, 8) - (Math.random() * 5);
      
      mockWasteData.push({
        date: date.toISOString().split('T')[0],
        wastePercentage: wastePercentage,
        savedMoney: (initialWaste - wastePercentage) * 0.75,
        carbonSaved: (initialWaste - wastePercentage) * 0.2,
      });
    }
    
    setWasteData(mockWasteData);
    
    // Food categories data
    setFoodCategories([
      { name: "Produce", wastePercentage: 14, savedPercentage: 22 },
      { name: "Dairy", wastePercentage: 8, savedPercentage: 18 },
      { name: "Meat", wastePercentage: 5, savedPercentage: 15 },
      { name: "Bakery", wastePercentage: 18, savedPercentage: 25 },
      { name: "Canned Goods", wastePercentage: 3, savedPercentage: 5 },
    ]);
  }, [timeframe]);
  
  // Calculate summary metrics
  const getCurrentWastePercentage = () => {
    return wasteData.length > 0 ? wasteData[wasteData.length - 1].wastePercentage.toFixed(1) : "0";
  };
  
  const getTotalSavings = () => {
    return wasteData.reduce((total, day) => total + day.savedMoney, 0).toFixed(2);
  };
  
  const getTotalCarbonSaved = () => {
    return wasteData.reduce((total, day) => total + day.carbonSaved, 0).toFixed(1);
  };
  
  // Get the percentage change
  const getPercentageChange = () => {
    if (wasteData.length < 2) return "0";
    const current = wasteData[wasteData.length - 1].wastePercentage;
    const previous = wasteData[0].wastePercentage;
    return ((previous - current) / previous * 100).toFixed(1);
  };
  
  return (
    <div className="h-full overflow-auto pb-14">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800">Waste Analytics</h2>
        <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as any)} className="w-[150px]">
          <TabsList className="bg-white/80 backdrop-blur-lg border border-gray-100 h-8">
            <TabsTrigger value="week" className="text-xs px-2 h-6">Week</TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-2 h-6">Month</TabsTrigger>
            <TabsTrigger value="year" className="text-xs px-2 h-6">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Card className="bg-white/90 backdrop-blur-lg shadow-sm border border-gray-100">
          <CardContent className="p-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 bg-green-50 rounded-full flex items-center justify-center">
                <PieChart className="h-3.5 w-3.5 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Current Waste Rate</p>
                <div className="flex items-baseline">
                  <div className="text-base font-bold mr-1">{getCurrentWastePercentage()}%</div>
                  <p className="text-green-600 text-[10px] flex items-center">
                    <TrendingDown className="h-2 w-2 mr-0.5" />
                    -{getPercentageChange()}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/90 backdrop-blur-lg shadow-sm border border-gray-100">
          <CardContent className="p-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 bg-green-50 rounded-full flex items-center justify-center">
                <DollarSign className="h-3.5 w-3.5 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Money Saved</p>
                <div className="text-base font-bold">${getTotalSavings()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-3">
        {/* Waste Trend Chart */}
        <Card className="bg-white/90 backdrop-blur-lg shadow-sm border border-gray-100">
          <CardHeader className="px-2 py-1.5">
            <CardTitle className="text-xs font-medium text-gray-800">Waste Reduction Trend</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-[100px] w-full rounded-md relative overflow-hidden">
              {/* Simple line chart visualization */}
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="25" x2="300" y2="25" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="0" y1="75" x2="300" y2="75" stroke="#f0f0f0" strokeWidth="1" />
                
                {/* Trend line - downward slope (improving - less waste) */}
                <path 
                  d="M20,80 C70,70 130,50 280,20" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="2"
                />
                
                {/* Data points */}
                <circle cx="20" cy="80" r="3" fill="#10b981" />
                <circle cx="90" cy="65" r="3" fill="#10b981" />
                <circle cx="160" cy="45" r="3" fill="#10b981" />
                <circle cx="230" cy="30" r="3" fill="#10b981" />
                <circle cx="280" cy="20" r="3" fill="#10b981" />
              </svg>
            </div>
          </CardContent>
        </Card>
        
        {/* Food Category Analysis */}
        <div>
          <h3 className="font-medium text-xs mb-1.5">Food Category Analysis</h3>
          <div className="space-y-1.5">
            {foodCategories.slice(0, 3).map((category) => (
              <div key={category.name} className="space-y-0.5">
                <div className="flex justify-between text-[10px]">
                  <span>{category.name}</span>
                  <span className="text-gray-500">{category.wastePercentage}% waste</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full" 
                    style={{ width: `${category.wastePercentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Environmental Impact */}
        <Card className="bg-green-50/90 backdrop-blur-lg shadow-sm border border-green-100 mb-1">
          <CardContent className="p-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="h-3.5 w-3.5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-xs text-green-800">Environmental Impact</h3>
                <p className="text-[10px] text-green-700">{getTotalCarbonSaved()} kg CO₂ emissions avoided</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
