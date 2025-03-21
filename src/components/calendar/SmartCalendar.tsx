import { useState } from "react";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus, AlarmClock, Calendar, Utensils, MoreHorizontal, X, AlertTriangle, Check, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Mock data for calendar
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Get current date info
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

// Mock meal plans data
const mockMealPlans = [
  {
    id: 1,
    date: new Date(currentYear, currentMonth, currentDay),
    meals: [
      { type: 'breakfast', name: 'Avocado Toast', time: '8:00 AM', completed: true, ingredients: ['Bread', 'Avocado', 'Eggs'] },
      { type: 'lunch', name: 'Chicken Salad', time: '12:30 PM', completed: false, ingredients: ['Chicken', 'Lettuce', 'Tomato', 'Cucumber'] },
      { type: 'dinner', name: 'Pasta Primavera', time: '7:00 PM', completed: false, ingredients: ['Pasta', 'Broccoli', 'Bell Peppers', 'Carrots'] }
    ]
  },
  {
    id: 2,
    date: new Date(currentYear, currentMonth, currentDay + 1),
    meals: [
      { type: 'breakfast', name: 'Smoothie Bowl', time: '8:30 AM', completed: false, ingredients: ['Banana', 'Berries', 'Yogurt', 'Granola'] },
      { type: 'lunch', name: 'Vegetable Wrap', time: '1:00 PM', completed: false, ingredients: ['Tortilla', 'Hummus', 'Spinach', 'Carrots'] },
      { type: 'dinner', name: 'Grilled Salmon', time: '6:30 PM', completed: false, ingredients: ['Salmon', 'Asparagus', 'Lemon', 'Rice'] }
    ]
  },
  {
    id: 3,
    date: new Date(currentYear, currentMonth, currentDay + 2),
    meals: [
      { type: 'breakfast', name: 'Oatmeal with Fruit', time: '8:00 AM', completed: false, ingredients: ['Oats', 'Banana', 'Honey', 'Cinnamon'] },
      { type: 'lunch', name: 'Lentil Soup', time: '12:00 PM', completed: false, ingredients: ['Lentils', 'Onion', 'Carrot', 'Celery'] },
      { type: 'dinner', name: 'Veggie Stir Fry', time: '7:15 PM', completed: false, ingredients: ['Tofu', 'Broccoli', 'Bell Peppers', 'Soy Sauce'] }
    ]
  }
];

// Mock expiring items
const mockExpiringItems = [
  { id: 1, name: 'Spinach', expiryDate: new Date(currentYear, currentMonth, currentDay + 1), quantity: '1 bag', category: 'produce' },
  { id: 2, name: 'Yogurt', expiryDate: new Date(currentYear, currentMonth, currentDay + 2), quantity: '2 cups', category: 'dairy' },
  { id: 3, name: 'Chicken Breast', expiryDate: new Date(currentYear, currentMonth, currentDay + 3), quantity: '1 lb', category: 'meat' },
  { id: 4, name: 'Bell Peppers', expiryDate: new Date(currentYear, currentMonth, currentDay + 4), quantity: '3', category: 'produce' },
  { id: 5, name: 'Milk', expiryDate: new Date(currentYear, currentMonth, currentDay + 5), quantity: '1/2 gallon', category: 'dairy' },
];

// Mock recipe suggestions based on expiring items
const mockRecipeSuggestions = [
  { id: 1, name: 'Spinach Salad with Chicken', matchingIngredients: ['Spinach', 'Chicken Breast'], difficulty: 'easy', cookTime: '15 min' },
  { id: 2, name: 'Yogurt Parfait', matchingIngredients: ['Yogurt'], difficulty: 'easy', cookTime: '5 min' },
  { id: 3, name: 'Stuffed Bell Peppers', matchingIngredients: ['Bell Peppers'], difficulty: 'medium', cookTime: '40 min' },
  { id: 4, name: 'Creamy Chicken Pasta', matchingIngredients: ['Chicken Breast', 'Milk'], difficulty: 'medium', cookTime: '30 min' },
];

export default function SmartCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  const [displayYear, setDisplayYear] = useState(currentYear);
  const [showAddMealForm, setShowAddMealForm] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('calendar');
  
  // Generate calendar days for the month view
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  // Navigate between months
  const previousMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };
  
  // Select a date in the calendar
  const selectDate = (day: number) => {
    if (day) {
      setSelectedDate(new Date(displayYear, displayMonth, day));
    }
  };
  
  // Check if a date has meal plans
  const hasMealPlan = (day: number) => {
    if (!day) return false;
    
    const date = new Date(displayYear, displayMonth, day);
    return mockMealPlans.some(plan => 
      plan.date.getDate() === date.getDate() && 
      plan.date.getMonth() === date.getMonth() && 
      plan.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Get meal plans for selected date
  const getMealPlansForSelectedDate = () => {
    return mockMealPlans.find(plan => 
      plan.date.getDate() === selectedDate.getDate() && 
      plan.date.getMonth() === selectedDate.getMonth() && 
      plan.date.getFullYear() === selectedDate.getFullYear()
    ) || { meals: [] };
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return `${daysOfWeek[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
  };
  
  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate: Date) => {
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get expiry badge style based on days remaining
  const getExpiryBadgeStyle = (days: number) => {
    if (days <= 1) return 'bg-rose-100 text-rose-800';
    if (days <= 3) return 'bg-amber-100 text-amber-800';
    return 'bg-emerald-100 text-emerald-800';
  };
  
  return (
    <div className="container p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Smart Calendar
        </h2>
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          {mockExpiringItems.length} Expiring Soon
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-emerald-50 rounded-lg p-1">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Items</TabsTrigger>
          <TabsTrigger value="suggestions">Meal Ideas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-4 space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
            <CardHeader className="pb-2 pt-3">
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={previousMonth}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h3 className="text-center font-medium">{monthNames[displayMonth]} {displayYear}</h3>
                <Button variant="ghost" size="sm" onClick={nextMonth}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="text-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => (
                  <div 
                    key={index}
                    className={`
                      relative aspect-square flex items-center justify-center rounded-full
                      ${day ? 'cursor-pointer hover:bg-emerald-50' : ''}
                      ${day && day === selectedDate.getDate() && displayMonth === selectedDate.getMonth() && displayYear === selectedDate.getFullYear() 
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                        : ''
                      }
                      ${day && day === currentDay && displayMonth === currentMonth && displayYear === currentYear && !(day === selectedDate.getDate() && displayMonth === selectedDate.getMonth() && displayYear === selectedDate.getFullYear())
                        ? 'text-emerald-600 font-bold' 
                        : ''
                      }
                    `}
                    onClick={() => day && selectDate(day)}
                  >
                    {day}
                    {day && hasMealPlan(day) && (
                      <div className={`
                        absolute bottom-0 h-1 w-1 rounded-full 
                        ${day === selectedDate.getDate() && displayMonth === selectedDate.getMonth() && displayYear === selectedDate.getFullYear() 
                          ? 'bg-white' 
                          : 'bg-emerald-500'
                        }
                      `}></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">{formatDate(selectedDate)}</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-emerald-200 text-emerald-600"
              onClick={() => {
                setShowAddMealForm(true);
                setSelectedMeal(null);
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Meal
            </Button>
          </div>
          
          <div className="space-y-3">
            {getMealPlansForSelectedDate().meals.length > 0 ? (
              getMealPlansForSelectedDate().meals.map((meal, index) => (
                <Card 
                  key={index}
                  className={`
                    bg-white/80 backdrop-blur-sm border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow
                    ${meal.completed ? 'border-gray-100 opacity-70' : 'border-emerald-100'}
                  `}
                  onClick={() => {
                    setSelectedMeal(meal);
                    setShowAddMealForm(true);
                  }}
                >
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className={`
                          h-5 w-5 rounded-full flex items-center justify-center 
                          ${meal.type === 'breakfast' ? 'bg-amber-100' : 
                           meal.type === 'lunch' ? 'bg-emerald-100' : 
                           'bg-blue-100'}
                        `}>
                          {meal.type === 'breakfast' ? '🍳' : 
                           meal.type === 'lunch' ? '🥗' : 
                           '🍽️'}
                        </div>
                        <div>
                          <h4 className={`font-medium ${meal.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {meal.name}
                          </h4>
                          <div className="flex items-center text-xs mt-0.5">
                            <Clock className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-gray-500">{meal.time}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={`h-6 w-6 p-0 ${meal.completed ? 'text-emerald-500' : 'text-gray-400'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle completed state (this would need to update the state in a real app)
                        }}
                      >
                        {meal.completed ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    {meal.ingredients.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {meal.ingredients.map((ingredient, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-emerald-200 text-emerald-700 bg-emerald-50">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-dashed border-emerald-200">
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                  <Utensils className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No meals planned</h3>
                <p className="text-gray-500 mb-4">
                  Add a meal to start planning your day
                </p>
                <Button 
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => {
                    setShowAddMealForm(true);
                    setSelectedMeal(null);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Meal Plan
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="expiring" className="mt-4 space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Expiring Soon</CardTitle>
              <p className="text-sm text-gray-500">Items in your pantry that will expire soon</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockExpiringItems.map((item, index) => {
                  const daysUntil = getDaysUntilExpiry(item.expiryDate);
                  const badgeStyle = getExpiryBadgeStyle(daysUntil);
                  
                  return (
                    <div 
                      key={index}
                      className="p-3 border border-gray-100 rounded-md bg-white flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500">
                          {item.quantity} • {item.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={badgeStyle}>
                          {daysUntil === 0 ? 'Today' : 
                           daysUntil === 1 ? 'Tomorrow' : 
                           `${daysUntil} days`}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.expiryDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-start p-3 bg-amber-50 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium">Pro Tip:</span> Plan meals with expiring ingredients to reduce food waste.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs h-7 border-amber-200 text-amber-700"
                      onClick={() => setActiveTab('suggestions')}
                    >
                      See Meal Ideas
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Expiration Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Reminder Days Before Expiry</label>
                  <Select defaultValue="3">
                    <SelectTrigger className="border-emerald-200">
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day</SelectItem>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="5">5 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Reminder Method</label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 justify-start border-emerald-200">
                      <Check className="h-4 w-4 mr-2 text-emerald-500" />
                      In-App
                    </Button>
                    <Button variant="outline" className="flex-1 justify-start border-emerald-200">
                      <Check className="h-4 w-4 mr-2 text-emerald-500" />
                      Email
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suggestions" className="mt-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">Recipe Suggestions</h3>
            <p className="text-sm text-gray-500">Based on your expiring ingredients</p>
            
            {mockRecipeSuggestions.map((recipe, index) => (
              <Card 
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="p-3">
                  <h4 className="font-medium text-gray-900">{recipe.name}</h4>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {recipe.matchingIngredients.map((ingredient, i) => (
                      <Badge key={i} className="bg-amber-100 text-amber-800">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">
                        {recipe.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">
                        {recipe.cookTime}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs h-7 border-emerald-200 text-emerald-600"
                      >
                        Save
                      </Button>
                      <Button 
                        size="sm"
                        className="text-xs h-7 bg-emerald-500 hover:bg-emerald-600"
                        onClick={() => {
                          // Add to calendar (in a real app)
                          setActiveTab('calendar');
                        }}
                      >
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            <div className="bg-emerald-50 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-emerald-500" />
                <h4 className="font-medium text-emerald-700">Smart Planning</h4>
              </div>
              <p className="mt-1 text-sm text-emerald-600">
                These recipes were specifically chosen to use ingredients that will expire soon. Planning meals this way can help reduce food waste by up to 30%.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showAddMealForm} onOpenChange={setShowAddMealForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedMeal ? 'Edit Meal' : 'Add New Meal'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Meal Name</label>
              <Input 
                placeholder="E.g., Chicken Stir Fry" 
                className="border-emerald-200"
                defaultValue={selectedMeal?.name || ''}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Meal Type</label>
              <Select defaultValue={selectedMeal?.type || 'breakfast'}>
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Time</label>
              <Input 
                type="time" 
                className="border-emerald-200"
                defaultValue={selectedMeal?.time ? convertTimeStringToInputFormat(selectedMeal.time) : ''}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Ingredients</label>
              <textarea 
                className="w-full border rounded-md p-2 min-h-[80px] border-emerald-200 focus:border-emerald-500 focus:ring-0"
                placeholder="Add each ingredient on a new line"
                defaultValue={selectedMeal?.ingredients ? selectedMeal.ingredients.join('\n') : ''}
              ></textarea>
            </div>
            <div className="flex justify-between gap-2">
              {selectedMeal && (
                <Button 
                  variant="outline" 
                  className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  Delete
                </Button>
              )}
              <Button 
                className={`bg-emerald-500 hover:bg-emerald-600 ${selectedMeal ? 'flex-1' : 'w-full'}`}
              >
                {selectedMeal ? 'Update Meal' : 'Add to Calendar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper function to convert time string to input format
function convertTimeStringToInputFormat(timeString: string) {
  // Convert "8:00 AM" to "08:00"
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
