import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Trash2, Edit, AlertTriangle } from "lucide-react";

interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: Date;
  addedDate: Date;
}

// Mock data for demonstration
const mockPantryItems: PantryItem[] = [
  {
    id: "1",
    name: "Organic Milk",
    category: "Dairy",
    quantity: 1,
    unit: "gallon",
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "2",
    name: "Eggs",
    category: "Dairy",
    quantity: 12,
    unit: "count",
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "3",
    name: "Whole Wheat Bread",
    category: "Bakery",
    quantity: 1,
    unit: "loaf",
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "4",
    name: "Chicken Breast",
    category: "Meat",
    quantity: 2,
    unit: "lbs",
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "5",
    name: "Spinach",
    category: "Produce",
    quantity: 1,
    unit: "bag",
    expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "6",
    name: "Tomatoes",
    category: "Produce",
    quantity: 5,
    unit: "count",
    expiryDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
  {
    id: "7",
    name: "Canned Beans",
    category: "Pantry",
    quantity: 3,
    unit: "cans",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
  },
];

interface PantryInventoryProps {
  onAddItem?: () => void;
  onEditItem?: (item: PantryItem) => void;
}

export default function PantryInventory({
  onAddItem = () => {},
  onEditItem = () => {},
}: PantryInventoryProps) {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(mockPantryItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(pantryItems.map((item) => item.category)),
  );

  const filteredItems = pantryItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const isExpiringSoon = (date: Date) => {
    const daysUntilExpiry = Math.ceil(
      (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    return daysUntilExpiry <= 3;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const removeItem = (id: string) => {
    setPantryItems(pantryItems.filter((item) => item.id !== id));
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pantry Inventory</CardTitle>
            <CardDescription>
              Manage your food items and track expiration dates
            </CardDescription>
          </div>
          <Button
            onClick={onAddItem}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className={`cursor-pointer ${selectedCategory === category ? "bg-green-600" : "hover:bg-green-100"}`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category ? null : category,
                    )
                  }
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No items found. Add some items to your pantry!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Item</th>
                    <th className="text-left py-3 px-4 font-medium">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      Quantity
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Expiry</th>
                    <th className="text-right py-3 px-4 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{item.name}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800"
                        >
                          {item.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {isExpiringSoon(item.expiryDate) && (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                          <span
                            className={
                              isExpiringSoon(item.expiryDate)
                                ? "text-amber-600 font-medium"
                                : ""
                            }
                          >
                            {formatDate(item.expiryDate)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 hover:text-blue-600"
                            onClick={() => onEditItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 hover:text-red-600"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
