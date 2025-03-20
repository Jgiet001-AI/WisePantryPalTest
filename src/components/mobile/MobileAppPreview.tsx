import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Utensils,
  Scan,
  Bot,
  Home,
  Bell,
  User,
  Plus,
  TrendingUp,
  Calendar,
  ChevronRight,
  Settings,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PantryInventory from "../pantry/PantryInventory";
import PantryScanner from "../pantry/PantryScanner";
import MealSuggestions from "../meal-planning/MealSuggestions";
import ChatbotAssistant from "../chatbot/ChatbotAssistant";
import OnboardingFlow from "../onboarding/OnboardingFlow";
import DietaryPreferences from "../dietary/DietaryPreferences";

export default function MobileAppPreview() {
  const [activeTab, setActiveTab] = useState("home");
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [waterIntake, setWaterIntake] = useState(3);
  const [waterGoal, setWaterGoal] = useState(8);
  const [showWaterAnimation, setShowWaterAnimation] = useState(false);
  const [showDietaryPreferences, setShowDietaryPreferences] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Reference to the handleSendMessage function in ChatbotAssistant
  const handleSendMessage = () => {
    const chatbotAssistant = document.querySelector("[data-chatbot-assistant]");
    if (chatbotAssistant) {
      const sendButton = chatbotAssistant.querySelector(
        "button[data-send-message]",
      ) as HTMLButtonElement | null;
      if (sendButton) {
        sendButton.click();
      }
    }
  };

  // Demo function to add water intake
  const addWater = () => {
    if (waterIntake < waterGoal) {
      setShowWaterAnimation(true);
      setTimeout(() => {
        setWaterIntake((prev) => Math.min(prev + 1, waterGoal));
        setShowWaterAnimation(false);
      }, 500);
    }
  };

  // Demo function to complete onboarding
  const completeOnboarding = () => {
    setShowOnboarding(false);
  };

  // Demo function to simulate time
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const timeElement = document.getElementById("current-time");
      if (timeElement) {
        timeElement.textContent = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (showOnboarding) {
    return (
      <div className="w-full max-w-md mx-auto">
        {/* Phone frame */}
        <div className="relative border-8 border-gray-900 rounded-[40px] overflow-hidden bg-white shadow-xl">
          {/* Status bar */}
          <div className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center text-xs">
            <span id="current-time">9:41</span>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>
            <span>100%</span>
          </div>

          {/* App content */}
          <div className="h-[600px] overflow-hidden bg-gray-50">
            <OnboardingFlow onComplete={completeOnboarding} />
          </div>

          {/* Home indicator */}
          <div className="bg-gray-900 py-1 flex justify-center">
            <div className="w-1/3 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Phone frame */}
      <div className="relative border-8 border-gray-900 rounded-[40px] overflow-hidden bg-white shadow-xl">
        {/* Status bar */}
        <div className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center text-xs">
          <span id="current-time">9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
          </div>
          <span>100%</span>
        </div>

        {/* App content */}
        <div className="h-[580px] overflow-y-auto bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsContent value="home" className="m-0 p-0">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-xl font-bold text-teal-800">
                      Hello, Alex
                    </h1>
                    <p className="text-sm text-emerald-600">
                      What's in your pantry today?
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full relative bg-white/50 backdrop-blur-sm shadow-sm hover:bg-white/70 transition-colors"
                      onClick={() => setShowDietaryPreferences(true)}
                    >
                      <ShieldAlert className="h-5 w-5 text-teal-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full relative bg-white/50 backdrop-blur-sm shadow-sm hover:bg-white/70 transition-colors"
                      onClick={() => setShowChatPopup(true)}
                    >
                      <Bot className="h-5 w-5 text-purple-600" />
                      {notifications > 0 && (
                        <motion.span
                          initial={{ scale: 0.8 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, repeatDelay: 3 }}
                          className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                        >
                          {notifications}
                        </motion.span>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Water tracking */}
                <Card className="bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 border-none mb-6 overflow-hidden relative shadow-lg rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          Water Intake
                        </h3>
                        <p className="text-white/80 text-sm">
                          {waterIntake} of {waterGoal} glasses
                        </p>
                      </div>
                      <Button
                        onClick={addWater}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10 p-0 shadow-md transition-colors"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="mt-3 bg-white/20 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{
                          width: `${(waterIntake / waterGoal) * 100}%`,
                        }}
                        animate={{
                          width: `${(waterIntake / waterGoal) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <AnimatePresence>
                      {showWaterAnimation && (
                        <motion.div
                          className="absolute top-1/2 left-1/2 text-white text-2xl font-bold"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1.5, opacity: 1 }}
                          exit={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          +1
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>

                {/* Quick actions */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className="bg-gradient-to-br from-teal-400 to-emerald-500 border-none shadow-lg rounded-xl cursor-pointer"
                      onClick={() => setActiveTab("scan")}
                    >
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Scan className="h-8 w-8 text-white mb-2" />
                        <span className="text-sm font-medium text-white">
                          Scan Items
                        </span>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className="bg-gradient-to-br from-emerald-400 to-green-500 border-none shadow-lg rounded-xl cursor-pointer"
                      onClick={() => setActiveTab("meals")}
                    >
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Utensils className="h-8 w-8 text-white mb-2" />
                        <span className="text-sm font-medium text-white">
                          Meal Ideas
                        </span>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Today's stats */}
                <Card className="mb-4 sm:mb-6 border-teal-100 bg-white/80 backdrop-blur-sm shadow-md rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-teal-800">
                        Today's Stats
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-teal-600 p-0 hover:bg-teal-50"
                        onClick={() => setActiveTab("pantry")}
                      >
                        <TrendingUp className="h-4 w-4 mr-1" /> Details
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-2 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg shadow-sm"
                      >
                        <p className="text-xs text-teal-600 mb-1">Calories</p>
                        <p className="font-semibold text-teal-800">1,450</p>
                        <p className="text-xs text-teal-500">-350 kcal</p>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-2 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg shadow-sm"
                      >
                        <p className="text-xs text-emerald-600 mb-1">Protein</p>
                        <p className="font-semibold text-emerald-800">82g</p>
                        <p className="text-xs text-emerald-500">+12g</p>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-2 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg shadow-sm"
                      >
                        <p className="text-xs text-green-600 mb-1">Steps</p>
                        <p className="font-semibold text-green-800">6,240</p>
                        <p className="text-xs text-green-500">78%</p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expiring soon */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-teal-800">
                      Expiring Soon
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-teal-600 p-0 flex items-center hover:bg-teal-50"
                      onClick={() => setActiveTab("pantry")}
                    >
                      View All <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Card className="border-teal-100 bg-white/80 backdrop-blur-sm shadow-md rounded-xl overflow-hidden">
                    <CardContent className="p-3">
                      <ul className="space-y-3">
                        <motion.li
                          className="flex justify-between items-center p-2 rounded-lg"
                          whileHover={{
                            backgroundColor: "rgba(20, 184, 166, 0.05)",
                            scale: 1.02,
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mr-3 shadow-sm">
                              <span className="text-xs font-semibold text-red-600">
                                2d
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-teal-800">
                                Spinach
                              </p>
                              <p className="text-xs text-rose-600">
                                Expires in 2 days
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs border-teal-200 text-teal-700 hover:bg-teal-50"
                            onClick={() => setActiveTab("meals")}
                          >
                            Use It
                          </Button>
                        </motion.li>
                        <motion.li
                          className="flex justify-between items-center p-2 rounded-lg"
                          whileHover={{
                            backgroundColor: "rgba(20, 184, 166, 0.05)",
                            scale: 1.02,
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mr-3 shadow-sm">
                              <span className="text-xs font-semibold text-amber-600">
                                3d
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-teal-800">
                                Chicken Breast
                              </p>
                              <p className="text-xs text-amber-600">
                                Expires in 3 days
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs border-teal-200 text-teal-700 hover:bg-teal-50"
                            onClick={() => setActiveTab("meals")}
                          >
                            Use It
                          </Button>
                        </motion.li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Meal suggestions */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-teal-800 flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-teal-600" />
                      Suggested Meals
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-teal-600 p-0 flex items-center hover:bg-teal-50"
                      onClick={() => setActiveTab("meals")}
                    >
                      View All <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Card className="overflow-hidden border-none shadow-lg rounded-xl">
                        <div className="relative h-32">
                          <img
                            src="https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=500&q=80"
                            alt="Spinach and Feta Stuffed Chicken"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-md">
                            95% Match
                          </Badge>
                          <div className="absolute bottom-2 left-2 flex items-center">
                            <Badge className="bg-white/80 text-teal-800 mr-2 shadow-sm">
                              40 min
                            </Badge>
                            <Badge className="bg-white/80 text-teal-800 shadow-sm">
                              320 cal
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-3 bg-white">
                          <div className="flex items-center gap-1 mb-1">
                            <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5">
                              Gluten-Free
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5">
                              High Protein
                            </Badge>
                          </div>
                          <h3 className="font-medium text-teal-800">
                            Spinach and Feta Stuffed Chicken
                          </h3>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className="w-4 h-4 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-teal-600 p-0 hover:text-teal-700 hover:bg-teal-50"
                              onClick={() => {
                                setActiveTab("chat");
                                setInputValue(
                                  "Show me the recipe for Spinach and Feta Stuffed Chicken",
                                );
                                setTimeout(() => handleSendMessage(), 500);
                              }}
                            >
                              View Recipe
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="overflow-hidden border-none shadow-lg rounded-xl">
                        <div className="relative h-32">
                          <img
                            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80"
                            alt="Bean and Vegetable Soup"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-md">
                            85% Match
                          </Badge>
                          <div className="absolute bottom-2 left-2 flex items-center">
                            <Badge className="bg-white/80 text-teal-800 mr-2 shadow-sm">
                              30 min
                            </Badge>
                            <Badge className="bg-white/80 text-teal-800 shadow-sm">
                              220 cal
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-3 bg-white">
                          <div className="flex items-center gap-1 mb-1">
                            <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5">
                              Vegan
                            </Badge>
                            <Badge className="bg-orange-100 text-orange-800 text-xs px-1.5 py-0.5">
                              High Fiber
                            </Badge>
                          </div>
                          <h3 className="font-medium text-teal-800">
                            Bean and Vegetable Soup
                          </h3>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex">
                              {[1, 2, 3, 4].map((star) => (
                                <svg
                                  key={star}
                                  className="w-4 h-4 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                              <svg
                                className="w-4 h-4 text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-teal-600 p-0 hover:text-teal-700 hover:bg-teal-50"
                              onClick={() => setActiveTab("chat")}
                            >
                              View Recipe
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="pantry"
              className="m-0 p-4 h-[550px] overflow-y-auto"
            >
              <div className="scale-[0.9] origin-top">
                <PantryInventory />
              </div>
            </TabsContent>

            <TabsContent
              value="scan"
              className="m-0 p-4 h-[550px] overflow-y-auto"
            >
              <div className="scale-[0.9] origin-top">
                <PantryScanner />
              </div>
            </TabsContent>

            <TabsContent
              value="meals"
              className="m-0 p-4 h-[550px] overflow-y-auto"
            >
              <div className="scale-[0.9] origin-top">
                <MealSuggestions
                  onViewRecipe={(recipe) => {
                    setActiveTab("chat");
                    setInputValue(`Show me the recipe for ${recipe.title}`);
                    setTimeout(() => handleSendMessage(), 500);
                  }}
                  onAddToMealPlan={(recipe) => {
                    // Show a toast notification
                    const toastElement = document.createElement("div");
                    toastElement.className =
                      "fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up";
                    toastElement.textContent = `${recipe.title} added to meal plan`;
                    document.body.appendChild(toastElement);
                    setTimeout(() => {
                      toastElement.classList.add("animate-fade-out-down");
                      setTimeout(
                        () => document.body.removeChild(toastElement),
                        500,
                      );
                    }, 2000);
                  }}
                  onSaveRecipe={(recipe) => {
                    // Show a toast notification
                    const toastElement = document.createElement("div");
                    toastElement.className =
                      "fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up";
                    toastElement.textContent = `${recipe.title} saved to favorites`;
                    document.body.appendChild(toastElement);
                    setTimeout(() => {
                      toastElement.classList.add("animate-fade-out-down");
                      setTimeout(
                        () => document.body.removeChild(toastElement),
                        500,
                      );
                    }, 2000);
                  }}
                  onRefreshSuggestions={() => {
                    // Show a toast notification
                    const toastElement = document.createElement("div");
                    toastElement.className =
                      "fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up";
                    toastElement.textContent = "Refreshing meal suggestions...";
                    document.body.appendChild(toastElement);
                    setTimeout(() => {
                      toastElement.classList.add("animate-fade-out-down");
                      setTimeout(
                        () => document.body.removeChild(toastElement),
                        500,
                      );
                    }, 2000);
                  }}
                  onViewAllRecipes={() => {
                    // Show a toast notification
                    const toastElement = document.createElement("div");
                    toastElement.className =
                      "fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up";
                    toastElement.textContent =
                      "Loading all recipe suggestions...";
                    document.body.appendChild(toastElement);
                    setTimeout(() => {
                      toastElement.classList.add("animate-fade-out-down");
                      setTimeout(
                        () => document.body.removeChild(toastElement),
                        500,
                      );
                    }, 2000);
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent
              value="chat"
              className="m-0 p-4 h-[550px] overflow-y-auto"
            >
              <div className="scale-[0.9] origin-top">
                <ChatbotAssistant userName="Alex" />
              </div>
            </TabsContent>

            {/* Bottom navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-teal-100 p-2 shadow-lg">
              <TabsList className="grid grid-cols-5 bg-transparent h-auto gap-1">
                <TabsTrigger
                  value="home"
                  className={`flex flex-col items-center py-2 ${activeTab === "home" ? "text-teal-600" : "text-gray-500"}`}
                  onClick={() => setActiveTab("home")}
                >
                  <Home className="h-5 w-5" />
                  <span className="text-xs mt-1">Home</span>
                </TabsTrigger>
                <TabsTrigger
                  value="pantry"
                  className={`flex flex-col items-center py-2 ${activeTab === "pantry" ? "text-teal-600" : "text-gray-500"}`}
                  onClick={() => setActiveTab("pantry")}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="text-xs mt-1">Pantry</span>
                </TabsTrigger>
                <TabsTrigger
                  value="scan"
                  className={`flex flex-col items-center py-2 ${activeTab === "scan" ? "text-teal-600" : "text-gray-500"}`}
                  onClick={() => setActiveTab("scan")}
                >
                  <Scan className="h-5 w-5" />
                  <span className="text-xs mt-1">Scan</span>
                </TabsTrigger>
                <TabsTrigger
                  value="meals"
                  className={`flex flex-col items-center py-2 ${activeTab === "meals" ? "text-teal-600" : "text-gray-500"}`}
                  onClick={() => setActiveTab("meals")}
                >
                  <Utensils className="h-5 w-5" />
                  <span className="text-xs mt-1">Meals</span>
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className={`flex flex-col items-center py-2 ${activeTab === "chat" ? "text-teal-600" : "text-gray-500"}`}
                  onClick={() => setActiveTab("chat")}
                >
                  <Bot className="h-5 w-5" />
                  <span className="text-xs mt-1">Chat</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Home indicator */}
        <div className="bg-gray-900 py-1 flex justify-center">
          <div className="w-1/3 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Chat Popup */}
      {showChatPopup && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl w-full max-w-sm max-h-[60vh] overflow-hidden shadow-2xl"
          >
            <div className="p-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-purple-800 flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                Kitchen Robot
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-purple-50 h-8 w-8"
                onClick={() => setShowChatPopup(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>
            <div className="p-4 h-[300px] overflow-y-auto bg-gradient-to-br from-purple-50 to-white">
              <div className="flex items-start gap-2 mb-4">
                <Avatar className="h-8 w-8 bg-purple-500">
                  <AvatarFallback>
                    <Sparkles className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-3 py-2 bg-purple-100 text-gray-800">
                  <p>
                    I noticed you have spinach and chicken that will expire
                    soon. Would you like me to suggest a recipe?
                  </p>
                </div>
              </div>
              <div className="flex justify-between gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => {
                    setShowChatPopup(false);
                    setActiveTab("meals");
                  }}
                >
                  Show Recipes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowChatPopup(false)}
                >
                  Later
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Dietary Preferences Modal */}
      {showDietaryPreferences && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl"
          >
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-teal-800 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-teal-600" />
                  Dietary Preferences
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-teal-50"
                  onClick={() => setShowDietaryPreferences(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <DietaryPreferences
                onSave={() => setShowDietaryPreferences(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
