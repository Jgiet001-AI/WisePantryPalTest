import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import {
  Plus,
  ShoppingCart,
  Trash2,
  Share2,
  Download,
  Check,
} from "lucide-react";

interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
  source: "manual" | "recipe" | "pantry" | "expiring";
}

interface GroceryListProps {
  onCompareStores?: (items: GroceryItem[]) => void;
  onShareList?: (items: GroceryItem[]) => void;
  onExportList?: (items: GroceryItem[]) => void;
}

export default function GroceryList({
  onCompareStores = () => {},
  onShareList = () => {},
  onExportList = () => {},
}: GroceryListProps) {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([
    {
      id: "1",
      name: "Spinach",
      quantity: 1,
      unit: "bunch",
      category: "Produce",
      checked: false,
      source: "expiring",
    },
    {
      id: "2",
      name: "Chicken Breast",
      quantity: 2,
      unit: "lb",
      category: "Meat",
      checked: false,
      source: "recipe",
    },
    {
      id: "3",
      name: "Feta Cheese",
      quantity: 1,
      unit: "8 oz",
      category: "Dairy",
      checked: false,
      source: "recipe",
    },
    {
      id: "4",
      name: "Garlic",
      quantity: 1,
      unit: "head",
      category: "Produce",
      checked: false,
      source: "pantry",
    },
    {
      id: "5",
      name: "Olive Oil",
      quantity: 1,
      unit: "16 oz",
      category: "Pantry",
      checked: false,
      source: "pantry",
    },
  ]);

  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemUnit, setNewItemUnit] = useState("item");

  const addItem = () => {
    if (newItemName.trim() === "") return;

    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: newItemQuantity,
      unit: newItemUnit,
      category: "Other",
      checked: false,
      source: "manual",
    };

    setGroceryItems([...groceryItems, newItem]);
    setNewItemName("");
    setNewItemQuantity(1);
    setNewItemUnit("item");
  };

  const toggleItemChecked = (id: string) => {
    setGroceryItems(
      groceryItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setGroceryItems(groceryItems.filter((item) => item.id !== id));
  };

  const clearCheckedItems = () => {
    setGroceryItems(groceryItems.filter((item) => !item.checked));
  };

  const getSourceBadge = (source: GroceryItem["source"]) => {
    switch (source) {
      case "recipe":
        return (
          <Badge className="bg-blue-100 text-blue-800 text-xs">Recipe</Badge>
        );
      case "pantry":
        return (
          <Badge className="bg-purple-100 text-purple-800 text-xs">
            Low Stock
          </Badge>
        );
      case "expiring":
        return (
          <Badge className="bg-amber-100 text-amber-800 text-xs">
            Expiring
          </Badge>
        );
      default:
        return null;
    }
  };

  // Group items by category
  const itemsByCategory = groceryItems.reduce<Record<string, GroceryItem[]>>(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {},
  );

  const categories = Object.keys(itemsByCategory).sort();
  const checkedCount = groceryItems.filter((item) => item.checked).length;

  return (
    <Card className="w-full bg-white">
      <CardHeader className="border-b pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            Grocery List
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800">
              {groceryItems.length} items
            </Badge>
            {checkedCount > 0 && (
              <Badge className="bg-green-100 text-green-800">
                {checkedCount} checked
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Add new item form */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add item..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="flex-grow"
              onKeyDown={(e) => e.key === "Enter" && addItem()}
            />
            <div className="flex items-center gap-1">
              <Input
                type="number"
                min="1"
                value={newItemQuantity}
                onChange={(e) =>
                  setNewItemQuantity(parseInt(e.target.value) || 1)
                }
                className="w-16"
              />
              <Input
                value={newItemUnit}
                onChange={(e) => setNewItemUnit(e.target.value)}
                className="w-20"
              />
              <Button onClick={addItem} size="icon" className="h-10 w-10">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Grocery items by category */}
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="font-medium text-sm text-gray-700 mb-2">
                  {category}
                </h3>
                <div className="space-y-2">
                  {itemsByCategory[category].map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex items-center justify-between p-2 rounded-lg border ${item.checked ? "bg-gray-50 border-gray-200" : "bg-white border-gray-100"}`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => toggleItemChecked(item.id)}
                          className={item.checked ? "text-green-500" : ""}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-medium ${item.checked ? "line-through text-gray-500" : "text-gray-800"}`}
                            >
                              {item.name}
                            </span>
                            {getSourceBadge(item.source)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.quantity} {item.unit}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => onCompareStores(groceryItems)}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Compare Stores
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
              onClick={() => onShareList(groceryItems)}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share List
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-teal-200 text-teal-700 hover:bg-teal-50"
              onClick={() => onExportList(groceryItems)}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            {checkedCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-700 hover:bg-red-50 ml-auto"
                onClick={clearCheckedItems}
              >
                <Check className="h-4 w-4 mr-1" />
                Clear Checked
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
