import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Calendar,
  TrendingDown,
  DollarSign,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

interface WasteItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  cost: number;
  wastedOn: Date;
  reason: "expired" | "spoiled" | "leftover" | "other";
}

interface WasteTrackerProps {
  onViewDetails?: () => void;
  onExportData?: () => void;
}

export default function WasteTracker({
  onViewDetails = () => {},
  onExportData = () => {},
}: WasteTrackerProps) {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">(
    "month",
  );

  // Mock data for demonstration
  const wasteItems: WasteItem[] = [
    {
      id: "1",
      name: "Lettuce",
      quantity: 1,
      unit: "head",
      cost: 2.49,
      wastedOn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      reason: "expired",
    },
    {
      id: "2",
      name: "Yogurt",
      quantity: 1,
      unit: "container",
      cost: 3.99,
      wastedOn: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      reason: "expired",
    },
    {
      id: "3",
      name: "Chicken Soup",
      quantity: 2,
      unit: "cups",
      cost: 4.5,
      wastedOn: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      reason: "leftover",
    },
    {
      id: "4",
      name: "Avocado",
      quantity: 1,
      unit: "piece",
      cost: 1.99,
      wastedOn: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      reason: "spoiled",
    },
    {
      id: "5",
      name: "Milk",
      quantity: 0.5,
      unit: "gallon",
      cost: 2.25,
      wastedOn: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      reason: "expired",
    },
  ];

  // Calculate statistics
  const totalWastedItems = wasteItems.length;
  const totalWastedCost = wasteItems.reduce((sum, item) => sum + item.cost, 0);

  // Group by reason
  const wasteByReason = wasteItems.reduce<Record<string, number>>(
    (acc, item) => {
      if (!acc[item.reason]) {
        acc[item.reason] = 0;
      }
      acc[item.reason] += 1;
      return acc;
    },
    {},
  );

  // Calculate percentages
  const expiredPercentage =
    ((wasteByReason["expired"] || 0) / totalWastedItems) * 100;
  const spoiledPercentage =
    ((wasteByReason["spoiled"] || 0) / totalWastedItems) * 100;
  const leftoverPercentage =
    ((wasteByReason["leftover"] || 0) / totalWastedItems) * 100;
  const otherPercentage =
    ((wasteByReason["other"] || 0) / totalWastedItems) * 100;

  // Mock comparison data
  const previousPeriodCost = 18.99;
  const costChange = totalWastedCost - previousPeriodCost;
  const costChangePercentage = (costChange / previousPeriodCost) * 100;
  const isImprovement = costChange < 0;

  return (
    <Card className="w-full bg-white">
      <CardHeader className="border-b pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-blue-600" />
            Food Waste Tracker
          </CardTitle>
          <TabsList className="grid grid-cols-3 h-8">
            <TabsTrigger
              value="week"
              className={timeframe === "week" ? "text-blue-700" : ""}
              onClick={() => setTimeframe("week")}
            >
              Week
            </TabsTrigger>
            <TabsTrigger
              value="month"
              className={timeframe === "month" ? "text-blue-700" : ""}
              onClick={() => setTimeframe("month")}
            >
              Month
            </TabsTrigger>
            <TabsTrigger
              value="year"
              className={timeframe === "year" ? "text-blue-700" : ""}
              onClick={() => setTimeframe("year")}
            >
              Year
            </TabsTrigger>
          </TabsList>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="text-sm text-blue-700">Total Waste</div>
                <div className="p-1.5 bg-blue-100 rounded-full">
                  <Trash2 className="h-4 w-4 text-blue-700" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-blue-800">
                  {totalWastedItems}
                </div>
                <div className="text-xs text-blue-600">
                  items this {timeframe}
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
              <div className="flex items-center justify-between">
                <div className="text-sm text-amber-700">Cost Impact</div>
                <div className="p-1.5 bg-amber-100 rounded-full">
                  <DollarSign className="h-4 w-4 text-amber-700" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-amber-800">
                  ${totalWastedCost.toFixed(2)}
                </div>
                <div className="text-xs text-amber-600">
                  wasted this {timeframe}
                </div>
              </div>
            </div>

            <div
              className={`${isImprovement ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"} rounded-lg p-3 border`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`text-sm ${isImprovement ? "text-green-700" : "text-red-700"}`}
                >
                  Trend
                </div>
                <div
                  className={`p-1.5 ${isImprovement ? "bg-green-100" : "bg-red-100"} rounded-full`}
                >
                  <TrendingDown
                    className={`h-4 w-4 ${isImprovement ? "text-green-700" : "text-red-700"}`}
                  />
                </div>
              </div>
              <div className="mt-2">
                <div
                  className={`text-2xl font-bold ${isImprovement ? "text-green-800" : "text-red-800"}`}
                >
                  {isImprovement ? "↓" : "↑"}{" "}
                  {Math.abs(costChangePercentage).toFixed(1)}%
                </div>
                <div
                  className={`text-xs ${isImprovement ? "text-green-600" : "text-red-600"}`}
                >
                  vs previous {timeframe}
                </div>
              </div>
            </div>
          </div>

          {/* Waste breakdown */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Waste Breakdown
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    Expired
                  </span>
                  <span>{wasteByReason["expired"] || 0} items</span>
                </div>
                <Progress
                  value={expiredPercentage}
                  className="h-2 bg-gray-200"
                  indicatorClassName="bg-red-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                    Spoiled
                  </span>
                  <span>{wasteByReason["spoiled"] || 0} items</span>
                </div>
                <Progress
                  value={spoiledPercentage}
                  className="h-2 bg-gray-200"
                  indicatorClassName="bg-amber-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                    Leftover
                  </span>
                  <span>{wasteByReason["leftover"] || 0} items</span>
                </div>
                <Progress
                  value={leftoverPercentage}
                  className="h-2 bg-gray-200"
                  indicatorClassName="bg-blue-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
                    Other
                  </span>
                  <span>{wasteByReason["other"] || 0} items</span>
                </div>
                <Progress
                  value={otherPercentage}
                  className="h-2 bg-gray-200"
                  indicatorClassName="bg-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Recent waste items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">
                Recent Waste
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-blue-600 p-0 hover:text-blue-800"
                onClick={onViewDetails}
              >
                View All <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-2">
              {wasteItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg border border-gray-100 bg-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-gray-100">
                      <Trash2 className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.quantity} {item.unit} · ${item.cost.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs ${item.reason === "expired" ? "bg-red-100 text-red-800" : item.reason === "spoiled" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}
                    >
                      {item.reason.charAt(0).toUpperCase() +
                        item.reason.slice(1)}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      {item.wastedOn.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips to reduce waste */}
          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-2">
              Tips to Reduce Waste
            </h3>
            <ul className="text-xs text-green-700 space-y-1">
              <li className="flex items-start gap-1">
                <span className="text-green-500 font-bold">•</span>
                <span>Plan meals around ingredients that will expire soon</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-green-500 font-bold">•</span>
                <span>
                  Store fruits and vegetables properly to extend freshness
                </span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-green-500 font-bold">•</span>
                <span>
                  Freeze leftovers if you won't eat them within 2-3 days
                </span>
              </li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={onExportData}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Export Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
