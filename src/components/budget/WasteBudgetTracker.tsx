import { useState } from "react";
import { TrendingDown, DollarSign, Recycle, BarChart3, ChevronDown, ChevronUp, Calendar, PieChart, Trash, ShoppingBag, PlusCircle, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Mock data for budget tracking
const mockBudgetData = {
  currentMonth: "March",
  budgetTotal: 450,
  spentTotal: 325.75,
  remaining: 124.25,
  percentUsed: 72,
  categories: [
    { name: "Produce", budget: 150, spent: 122.50, percentUsed: 82 },
    { name: "Dairy", budget: 80, spent: 64.75, percentUsed: 81 },
    { name: "Meat", budget: 120, spent: 89.25, percentUsed: 74 },
    { name: "Pantry", budget: 100, spent: 49.25, percentUsed: 49 },
  ],
  recentTransactions: [
    { date: "Mar 18", store: "Whole Foods", amount: 78.43 },
    { date: "Mar 15", store: "Trader Joe's", amount: 45.92 },
    { date: "Mar 10", store: "Farmers Market", amount: 32.50 },
    { date: "Mar 5", store: "City Grocery", amount: 19.99 },
  ],
  monthlyTrend: [380.25, 405.50, 392.80, 325.75],
  savingsTips: [
    "Buy seasonal produce to save up to 20%",
    "Consider store brands for pantry staples",
    "Check for digital coupons before shopping",
    "Buy in bulk for non-perishable items"
  ]
};

// Mock data for waste tracking
const mockWasteData = {
  currentMonth: "March",
  wasteTotal: 4.3, // in lbs
  wasteItems: [
    { name: "Lettuce", amount: "1 head", weight: 0.8, reason: "Expired", date: "Mar 15", category: "produce" },
    { name: "Milk", amount: "1/3 gallon", weight: 1.2, reason: "Expired", date: "Mar 12", category: "dairy" },
    { name: "Bread", amount: "1/2 loaf", weight: 0.6, reason: "Moldy", date: "Mar 8", category: "bakery" },
    { name: "Tomatoes", amount: "2", weight: 0.5, reason: "Spoiled", date: "Mar 4", category: "produce" },
    { name: "Yogurt", amount: "1 container", weight: 0.7, reason: "Expired", date: "Mar 2", category: "dairy" },
  ],
  wasteByCategory: [
    { category: "Produce", percentage: 45 },
    { category: "Dairy", percentage: 35 },
    { category: "Bakery", percentage: 15 },
    { category: "Other", percentage: 5 },
  ],
  monthlyTrend: [7.2, 5.8, 6.1, 4.3],
  wasteReductionTips: [
    "Plan meals in advance to buy only what you need",
    "Store fruits and vegetables properly",
    "Freeze items before they spoil",
    "Use leftovers creatively in new recipes"
  ]
};

export default function WasteBudgetTracker() {
  const [budgetData, setBudgetData] = useState(mockBudgetData);
  const [wasteData, setWasteData] = useState(mockWasteData);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showAddForm, setShowAddForm] = useState(false);
  const [wastePeriod, setWastePeriod] = useState("month");
  
  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  // Calculate progress bar colors based on percentage
  const getProgressColor = (percent: number) => {
    if (percent < 50) return "bg-emerald-500";
    if (percent < 80) return "bg-amber-500";
    return "bg-rose-500";
  };

  // Format currency 
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };
  
  return (
    <div className="container p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
          <TrendingDown className="h-5 w-5" />
          Waste & Budget
        </h2>
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          {formatCurrency(budgetData.remaining)} Left
        </Badge>
      </div>

      <Tabs defaultValue="budget" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-emerald-50 rounded-lg p-1">
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="waste">Food Waste</TabsTrigger>
        </TabsList>
        
        <TabsContent value="budget" className="mt-4 space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Monthly Budget</CardTitle>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[100px] h-8 text-xs border-emerald-200">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="quarter">Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm text-gray-500">Total Budget</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(budgetData.budgetTotal)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Spent</p>
                  <p className="text-2xl font-bold text-emerald-600">{formatCurrency(budgetData.spentTotal)}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-gray-500">
                    {budgetData.percentUsed}% used
                  </span>
                  <span className="text-emerald-600">
                    {formatCurrency(budgetData.remaining)} remaining
                  </span>
                </div>
                <Progress 
                  value={budgetData.percentUsed} 
                  className="h-2"
                  indicatorClassName={getProgressColor(budgetData.percentUsed)}
                />
              </div>
              
              <div className="space-y-3 mt-6">
                <h4 className="font-medium text-gray-900">Categories</h4>
                {budgetData.categories.map((category, index) => (
                  <div key={index} className="border border-gray-100 rounded-md overflow-hidden bg-white">
                    <div 
                      className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleCategory(category.name)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <p className="font-medium">{category.name}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-medium">
                          {formatCurrency(category.spent)} 
                          <span className="text-gray-400 text-xs ml-1">/ {formatCurrency(category.budget)}</span>
                        </p>
                        {expandedCategory === category.name ? 
                          <ChevronUp className="h-4 w-4 text-gray-400" /> : 
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        }
                      </div>
                    </div>
                    
                    {expandedCategory === category.name && (
                      <div className="px-3 pb-3 border-t border-gray-100 pt-2">
                        <div className="mb-2">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="text-gray-500">
                              {category.percentUsed}% used
                            </span>
                            <span className="text-emerald-600">
                              {formatCurrency(category.budget - category.spent)} left
                            </span>
                          </div>
                          <Progress 
                            value={category.percentUsed} 
                            className="h-1.5"
                            indicatorClassName={getProgressColor(category.percentUsed)}
                          />
                        </div>
                        <div className="flex justify-between mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-emerald-200 text-emerald-600"
                          >
                            Adjust Budget
                          </Button>
                          <Button 
                            size="sm" 
                            className="text-xs bg-emerald-500 hover:bg-emerald-600"
                          >
                            Add Expense
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-dashed border-emerald-200 text-emerald-600"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3">Recent Transactions</h4>
                <div className="space-y-2">
                  {budgetData.recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.store}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <p className="font-medium text-gray-900">
                        -{formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-2 text-emerald-600">
                  View All Transactions
                </Button>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Monthly Trend</h4>
                  <span className="text-sm text-emerald-600">Last 4 Months</span>
                </div>
                
                <div className="h-20 flex items-end gap-1">
                  {budgetData.monthlyTrend.map((amount, index) => {
                    const month = new Date();
                    month.setMonth(month.getMonth() - (3 - index));
                    const monthName = month.toLocaleString('default', { month: 'short' });
                    
                    // Calculate height percentage (taller = higher amount)
                    const maxAmount = Math.max(...budgetData.monthlyTrend);
                    const heightPercent = (amount / maxAmount) * 100;
                    
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center group">
                        <div 
                          className={`w-full rounded-t ${
                            amount > budgetData.budgetTotal ? 'bg-rose-500' : 'bg-emerald-500'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-1">{monthName}</div>
                        <div className="absolute bottom-full mb-1 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {formatCurrency(amount)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Savings Tips</h4>
                  <Badge className="bg-amber-100 text-amber-800">
                    Save 20%
                  </Badge>
                </div>
                <div className="space-y-2">
                  {budgetData.savingsTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 rounded-md bg-emerald-50">
                      <DollarSign className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="waste" className="mt-4 space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Food Waste Tracking</CardTitle>
                <Select value={wastePeriod} onValueChange={setWastePeriod}>
                  <SelectTrigger className="w-[100px] h-8 text-xs border-emerald-200">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="quarter">Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">Total Waste</p>
                  <div className="flex items-end gap-1">
                    <p className="text-2xl font-bold text-gray-900">{wasteData.wasteTotal}</p>
                    <p className="text-gray-500 text-sm mb-1">lbs</p>
                  </div>
                </div>
                <div className="w-24 h-24 relative">
                  <PieChart className="h-full w-full text-emerald-200" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <Recycle className="h-6 w-6 text-emerald-500" />
                    <span className="text-xs text-emerald-700 font-medium mt-1">
                      Improve!
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Waste by Category</h4>
                <div className="space-y-3">
                  {wasteData.wasteByCategory.map((category, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">{category.category}</span>
                        <span className="text-gray-500">{category.percentage}%</span>
                      </div>
                      <Progress 
                        value={category.percentage} 
                        className="h-2"
                        indicatorClassName={
                          index === 0 ? "bg-rose-500" : 
                          index === 1 ? "bg-amber-500" : 
                          index === 2 ? "bg-blue-500" : 
                          "bg-purple-500"
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Wasted Items</h4>
                  <Button variant="ghost" size="sm" className="h-8 p-2 text-emerald-600">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {wasteData.wasteItems.map((item, index) => (
                    <div key={index} className="p-2 border border-gray-100 rounded-md bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.amount} • {item.weight} lbs</p>
                        </div>
                        <Badge className={`
                          ${item.reason === "Expired" ? "bg-amber-100 text-amber-800" : 
                            item.reason === "Spoiled" ? "bg-rose-100 text-rose-800" : 
                            "bg-blue-100 text-blue-800"}
                        `}>
                          {item.reason}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-1 pt-1 text-xs text-gray-500">
                        <span>{item.date}</span>
                        <span className="capitalize">{item.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Monthly Trend</h4>
                  <span className="text-sm text-emerald-600">Last 4 Months</span>
                </div>
                
                <div className="h-20 flex items-end gap-1">
                  {wasteData.monthlyTrend.map((amount, index) => {
                    const month = new Date();
                    month.setMonth(month.getMonth() - (3 - index));
                    const monthName = month.toLocaleString('default', { month: 'short' });
                    
                    // Calculate height percentage (taller = higher amount)
                    const maxAmount = Math.max(...wasteData.monthlyTrend);
                    const heightPercent = (amount / maxAmount) * 100;
                    
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center group">
                        <div 
                          className={`w-full rounded-t ${
                            index === wasteData.monthlyTrend.length - 1 ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-1">{monthName}</div>
                        <div className="absolute bottom-full mb-1 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {amount} lbs
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-center items-center mt-2">
                  <Badge className="bg-emerald-100 text-emerald-800">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    {((wasteData.monthlyTrend[3] - wasteData.monthlyTrend[0]) / wasteData.monthlyTrend[0] * -100).toFixed(1)}% improvement
                  </Badge>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Waste Reduction Tips</h4>
                  <Badge className="bg-green-100 text-green-800">
                    <Leaf className="h-3 w-3 mr-1" />
                    Eco-friendly
                  </Badge>
                </div>
                <div className="space-y-2">
                  {wasteData.wasteReductionTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 rounded-md bg-emerald-50">
                      <Recycle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            className="w-full bg-emerald-500 hover:bg-emerald-600"
            onClick={() => setShowAddForm(true)}
          >
            <Trash className="h-4 w-4 mr-2" />
            Record Wasted Item
          </Button>
          
          <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Record Wasted Food</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">Item Name</label>
                  <Input placeholder="E.g., Apples" className="border-emerald-200" />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Amount/Quantity</label>
                    <Input placeholder="E.g., 3 apples" className="border-emerald-200" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Weight (lbs)</label>
                    <Input type="number" placeholder="0.5" className="border-emerald-200" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Reason</label>
                  <Select defaultValue="expired">
                    <SelectTrigger className="border-emerald-200">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="spoiled">Spoiled/Moldy</SelectItem>
                      <SelectItem value="overcooked">Overcooked/Burnt</SelectItem>
                      <SelectItem value="excess">Excess/Leftover</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select defaultValue="produce">
                    <SelectTrigger className="border-emerald-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="produce">Produce</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="meat">Meat</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  Save Record
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
