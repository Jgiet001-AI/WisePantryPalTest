import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard,
  ShoppingCart,
  Utensils,
  Bot,
  BarChart,
  Bell,
  Settings,
  Calendar,
  Clock,
  TrendingDown,
  DollarSign,
  Sparkles,
} from "lucide-react";

import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import DashboardGrid from "../dashboard/DashboardGrid";
import TaskBoard from "../dashboard/TaskBoard";
import ActivityFeed from "../dashboard/ActivityFeed";
import PantryInventory from "../pantry/PantryInventory";
import MealSuggestions from "../meal-planning/MealSuggestions";
import ChatbotAssistant from "../chatbot/ChatbotAssistant";
import WasteTracker from "../analytics/WasteTracker";
import GroceryList from "../shopping/GroceryList";
import StoreComparison from "../shopping/StoreComparison";
import MealPrepTimer from "../meal-planning/MealPrepTimer";
import RecipeSharing from "../social/RecipeSharing";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-white">
      <TopNavigation />

      <div className="flex pt-16">
        <Sidebar />

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Smart Pantry Management System
            </h1>
            <p className="text-gray-600">
              Manage your pantry, meals, and grocery shopping efficiently.
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pantry">Pantry</TabsTrigger>
              <TabsTrigger value="meals">Meal Planning</TabsTrigger>
              <TabsTrigger value="shopping">Shopping</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="assistant">Assistant</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-medium">
                        Pantry Status
                      </CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">
                        42 items
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">Good</span>
                        </div>
                        <span className="text-sm font-medium">28 items</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                          <span className="text-sm">Expiring Soon</span>
                        </div>
                        <span className="text-sm font-medium">5 items</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span className="text-sm">Low Stock</span>
                        </div>
                        <span className="text-sm font-medium">9 items</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-medium">
                        Budget Tracker
                      </CardTitle>
                      <Badge className="bg-green-100 text-green-800">
                        $80 remaining
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Monthly Budget</span>
                        </div>
                        <span className="text-sm font-medium">$200.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Spent</span>
                        </div>
                        <span className="text-sm font-medium">$120.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Savings vs Last Month</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">
                          +$15.00
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <DashboardGrid />
              <TaskBoard />
            </TabsContent>

            <TabsContent value="pantry" className="space-y-4">
              <PantryInventory />
            </TabsContent>

            <TabsContent value="meals" className="space-y-4">
              <MealSuggestions />
              <MealPrepTimer />
            </TabsContent>

            <TabsContent value="shopping" className="space-y-4">
              <GroceryList />
              <StoreComparison />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <WasteTracker />
            </TabsContent>

            <TabsContent value="assistant" className="space-y-4">
              <ChatbotAssistant userName="Alex" />
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <RecipeSharing />
            </TabsContent>
          </Tabs>
        </main>

        <div className="w-[280px] border-l border-gray-200 bg-white">
          <div className="p-4">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
