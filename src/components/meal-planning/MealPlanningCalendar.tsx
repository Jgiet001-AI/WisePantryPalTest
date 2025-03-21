import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Edit, Plus, Trash2, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MealPlan {
  id: string;
  date: string;
  meals: {
    id: string;
    type: "breakfast" | "lunch" | "dinner" | "snack";
    recipeId?: string;
    title: string;
    prepTimeMinutes?: number;
  }[];
}

interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  tags: string[];
}

export default function MealPlanningCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayType, setDisplayType] = useState<"week" | "month">("week");
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("dinner");
  
  // Mock data for recipes and meal plans
  useEffect(() => {
    // Sample recipes
    setRecipes([
      {
        id: "1",
        title: "Spinach & Feta Stuffed Chicken",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        prepTime: 15,
        cookTime: 25,
        servings: 4,
        calories: 320,
        tags: ["high-protein", "low-carb", "mediterranean"],
      },
      {
        id: "2",
        title: "Quinoa Power Bowl",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        prepTime: 10,
        cookTime: 20,
        servings: 2,
        calories: 380,
        tags: ["vegetarian", "meal-prep", "lunch"],
      },
      {
        id: "3",
        title: "Berry Protein Smoothie",
        image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        prepTime: 5,
        cookTime: 0,
        servings: 1,
        calories: 220,
        tags: ["breakfast", "high-protein", "quick"],
      },
      {
        id: "4",
        title: "Lemon Herb Salmon",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        calories: 350,
        tags: ["seafood", "high-protein", "omega-3"],
      },
    ]);
    
    // Generate sample meal plans for the next 10 days
    const today = new Date();
    const mockMealPlans: MealPlan[] = [];
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Only add meal plans for some dates to simulate a realistic calendar
      if (i % 3 !== 0) {
        mockMealPlans.push({
          id: `plan-${dateStr}`,
          date: dateStr,
          meals: [
            {
              id: `breakfast-${dateStr}`,
              type: "breakfast",
              recipeId: i % 2 === 0 ? "3" : undefined,
              title: i % 2 === 0 ? "Berry Protein Smoothie" : "Oatmeal with Fruits",
              prepTimeMinutes: i % 2 === 0 ? 5 : 10,
            },
            {
              id: `lunch-${dateStr}`,
              type: "lunch",
              recipeId: i % 4 === 1 ? "2" : undefined,
              title: i % 4 === 1 ? "Quinoa Power Bowl" : "Leftovers",
              prepTimeMinutes: i % 4 === 1 ? 30 : 5,
            },
            {
              id: `dinner-${dateStr}`,
              type: "dinner",
              recipeId: i % 2 === 0 ? "1" : "4",
              title: i % 2 === 0 ? "Spinach & Feta Stuffed Chicken" : "Lemon Herb Salmon",
              prepTimeMinutes: i % 2 === 0 ? 40 : 25,
            }
          ]
        });
      }
    }
    
    setMealPlans(mockMealPlans);
  }, []);

  // Get dates for the current view (week or month)
  const getDates = () => {
    const dates: Date[] = [];
    const startDate = new Date(currentDate);
    
    if (displayType === "week") {
      // Start with Sunday of the current week
      const day = startDate.getDay();
      startDate.setDate(startDate.getDate() - day);
      
      // Get 7 days starting from Sunday
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
      }
    } else {
      // For month view
      startDate.setDate(1); // Start with the 1st day of the month
      
      // Get first day of the month
      const firstDay = new Date(startDate).getDay();
      
      // Adjust to start from the Sunday before the 1st
      startDate.setDate(startDate.getDate() - firstDay);
      
      // Get 35 days (5 weeks) to make sure we cover the whole month
      for (let i = 0; i < 35; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
      }
    }
    
    return dates;
  };
  
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (displayType === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (displayType === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };
  
  const getMealsForDate = (dateString: string) => {
    const plan = mealPlans.find(plan => plan.date === dateString);
    return plan ? plan.meals : [];
  };
  
  const addMealToPlan = (recipe: Recipe) => {
    if (!selectedDate) return;
    
    const existingPlanIndex = mealPlans.findIndex(plan => plan.date === selectedDate);
    
    if (existingPlanIndex >= 0) {
      // Update existing plan
      const updatedPlans = [...mealPlans];
      const updatedMeals = [...updatedPlans[existingPlanIndex].meals];
      
      // Check if meal type already exists
      const mealTypeIndex = updatedMeals.findIndex(meal => meal.type === selectedMealType);
      
      if (mealTypeIndex >= 0) {
        // Replace existing meal
        updatedMeals[mealTypeIndex] = {
          id: `${selectedMealType}-${selectedDate}-${Date.now()}`,
          type: selectedMealType,
          recipeId: recipe.id,
          title: recipe.title,
          prepTimeMinutes: recipe.prepTime + recipe.cookTime,
        };
      } else {
        // Add new meal
        updatedMeals.push({
          id: `${selectedMealType}-${selectedDate}-${Date.now()}`,
          type: selectedMealType,
          recipeId: recipe.id,
          title: recipe.title,
          prepTimeMinutes: recipe.prepTime + recipe.cookTime,
        });
      }
      
      updatedPlans[existingPlanIndex].meals = updatedMeals;
      setMealPlans(updatedPlans);
    } else {
      // Create new plan
      const newPlan: MealPlan = {
        id: `plan-${selectedDate}`,
        date: selectedDate,
        meals: [{
          id: `${selectedMealType}-${selectedDate}-${Date.now()}`,
          type: selectedMealType,
          recipeId: recipe.id,
          title: recipe.title,
          prepTimeMinutes: recipe.prepTime + recipe.cookTime,
        }]
      };
      
      setMealPlans([...mealPlans, newPlan]);
    }
    
    setShowAddMealModal(false);
  };
  
  const removeMeal = (planId: string, mealId: string) => {
    const planIndex = mealPlans.findIndex(plan => plan.id === planId);
    if (planIndex < 0) return;
    
    const updatedPlans = [...mealPlans];
    const updatedMeals = updatedPlans[planIndex].meals.filter(meal => meal.id !== mealId);
    
    if (updatedMeals.length === 0) {
      // Remove the entire plan if no meals left
      updatedPlans.splice(planIndex, 1);
    } else {
      updatedPlans[planIndex].meals = updatedMeals;
    }
    
    setMealPlans(updatedPlans);
  };
  
  const dates = getDates();
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center text-gray-800">
            <CalendarDays className="mr-2 h-5 w-5 text-green-500" />
            Meal Planning
          </h2>
          <div className="flex space-x-2">
            <Button
              variant={displayType === "week" ? "default" : "outline"}
              onClick={() => setDisplayType("week")}
              className={displayType === "week" 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"}
              size="sm"
            >
              Week
            </Button>
            <Button
              variant={displayType === "month" ? "default" : "outline"}
              onClick={() => setDisplayType("month")}
              className={displayType === "month" 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"}
              size="sm"
            >
              Month
            </Button>
          </div>
        </div>
        
        {/* Calendar */}
        <Card className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <CardHeader className="py-3 px-6 flex flex-row items-center justify-between bg-white/90">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <CardTitle className="text-lg font-medium text-gray-800">{monthYear}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <Button 
              onClick={() => {
                const today = new Date();
                setCurrentDate(today);
                setSelectedDate(today.toISOString().split('T')[0]);
              }}
              variant="outline"
              size="sm"
              className="text-sm bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
            >
              Today
            </Button>
          </CardHeader>
          
          <CardContent className="px-3 pb-6">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="py-2 text-sm font-medium text-gray-700">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {dates.map((date, index) => {
                const dateString = date.toISOString().split('T')[0];
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                const isToday = new Date().toISOString().split('T')[0] === dateString;
                const isSelected = selectedDate === dateString;
                const meals = getMealsForDate(dateString);
                
                return (
                  <div
                    key={index}
                    className={`min-h-[105px] rounded-lg p-1.5 border transition-all duration-200 cursor-pointer hover:shadow-sm ${
                      isCurrentMonth ? "bg-white/90 backdrop-blur-sm" : "bg-gray-50/80 text-gray-400"
                    } ${isToday ? "border-green-300" : "border-gray-100"} ${
                      isSelected ? "ring-2 ring-green-500" : ""
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`text-sm font-medium p-0.5 rounded-full w-6 h-6 flex items-center justify-center ${
                        isToday ? "bg-green-500 text-white" : ""
                      }`}>
                        {date.getDate()}
                      </span>
                      {isCurrentMonth && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(dateString);
                            setShowAddMealModal(true);
                          }}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-1.5">
                      {meals.map((meal) => (
                        <div 
                          key={meal.id} 
                          className={`text-xs p-1.5 rounded-md truncate font-medium ${
                            meal.type === "breakfast" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                            meal.type === "lunch" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                            meal.type === "dinner" ? "bg-green-50 text-green-700 border border-green-100" :
                            "bg-purple-50 text-purple-700 border border-purple-100"
                          }`}
                        >
                          {meal.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Selected Date Meal Plan */}
        {selectedDate && (
          <Card className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="py-4 px-6 bg-white/90">
              <CardTitle className="text-lg font-medium text-gray-800">
                Meals for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="px-6 pb-6">
              <div className="space-y-5">
                {["breakfast", "lunch", "dinner", "snack"].map((mealType) => {
                  const typeTitle = mealType.charAt(0).toUpperCase() + mealType.slice(1);
                  const meal = getMealsForDate(selectedDate).find(m => m.type === mealType);
                  const plan = mealPlans.find(plan => plan.date === selectedDate);
                  
                  return (
                    <div key={mealType} className="border-b border-gray-100 last:border-b-0 pb-5 last:pb-0">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-gray-800">{typeTitle}</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 bg-white hover:bg-gray-50 text-green-600 hover:text-green-700 border-gray-200"
                          onClick={() => {
                            setSelectedMealType(mealType as any);
                            setShowAddMealModal(true);
                          }}
                        >
                          {meal ? <Edit className="h-3.5 w-3.5 mr-1.5" /> : <Plus className="h-3.5 w-3.5 mr-1.5" />}
                          {meal ? "Change" : "Add"}
                        </Button>
                      </div>
                      
                      {meal ? (
                        <div className="flex items-start p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100">
                          {meal.recipeId && (
                            <img
                              src={recipes.find(r => r.id === meal.recipeId)?.image || ""}
                              alt={meal.title}
                              className="w-16 h-16 rounded-md object-cover mr-4"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{meal.title}</h4>
                            {meal.prepTimeMinutes && (
                              <div className="flex items-center text-sm text-gray-500 mt-1.5">
                                <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                {meal.prepTimeMinutes} min
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-gray-400 hover:text-rose-500 hover:bg-rose-50"
                            onClick={() => plan && removeMeal(plan.id, meal.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-gray-500 text-sm italic px-1">No meal planned</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Add Meal Modal */}
        <AnimatePresence>
          {showAddMealModal && selectedDate && (
            <motion.div 
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddMealModal(false)}
            >
              <motion.div 
                className="bg-white/95 backdrop-blur-md rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-auto shadow-xl border border-gray-100"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-lg font-medium mb-2 text-gray-800">
                  Add {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)} for {new Date(selectedDate).toLocaleDateString()}
                </h3>
                <p className="text-gray-500 text-sm mb-4">Select a recipe or add a custom meal</p>
                
                <div className="space-y-4 mt-4">
                  <div className="flex space-x-2 mb-4">
                    {["breakfast", "lunch", "dinner", "snack"].map((type) => (
                      <Button
                        key={type}
                        variant={selectedMealType === type ? "default" : "outline"}
                        onClick={() => setSelectedMealType(type as any)}
                        className={selectedMealType === type 
                          ? "bg-green-500 hover:bg-green-600 text-white" 
                          : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"}
                        size="sm"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="border-b border-gray-200 pb-2 mb-3">
                    <h4 className="font-medium text-gray-800 mb-2">From Your Recipes</h4>
                  </div>
                  
                  <div className="space-y-2.5 max-h-[40vh] overflow-y-auto pr-1">
                    {recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="flex items-center p-3.5 bg-white hover:bg-gray-50 rounded-lg border border-gray-100 cursor-pointer transition-colors"
                        onClick={() => addMealToPlan(recipe)}
                      >
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-14 h-14 rounded-md object-cover mr-3.5"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800">{recipe.title}</h5>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1.5">
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                              {recipe.prepTime + recipe.cookTime} min
                            </div>
                            <div className="text-gray-300">•</div>
                            <div>{recipe.calories} kcal</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-b border-gray-200 pt-4 pb-2 mb-3">
                    <h4 className="font-medium text-gray-800 mb-2">Or Add Custom Meal</h4>
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter meal title"
                      className="flex-1 border border-gray-200 rounded-lg p-2.5 text-sm bg-white/90"
                    />
                    <Button 
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => {
                        // Implementation for custom meal addition would go here
                        setShowAddMealModal(false);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
