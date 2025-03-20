import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ShoppingCart, Tag, Truck, Clock, Check, Store } from "lucide-react";

interface StoreItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  inStock: boolean;
  deliveryTime: string;
  storeId: string;
}

interface Store {
  id: string;
  name: string;
  logo: string;
  distance: string;
  rating: number;
  deliveryFee: number;
}

interface StoreComparisonProps {
  groceryList?: string[];
  onAddToCart?: (storeId: string, items: StoreItem[]) => void;
  onViewStore?: (storeId: string) => void;
}

export default function StoreComparison({
  groceryList = [
    "Spinach",
    "Chicken Breast",
    "Feta Cheese",
    "Garlic",
    "Olive Oil",
  ],
  onAddToCart = () => {},
  onViewStore = () => {},
}: StoreComparisonProps) {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  // Mock data for demonstration
  const stores: Store[] = [
    {
      id: "1",
      name: "Fresh Market",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=FreshMarket",
      distance: "1.2 miles",
      rating: 4.7,
      deliveryFee: 3.99,
    },
    {
      id: "2",
      name: "Organic Grocers",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=OrganicGrocers",
      distance: "2.5 miles",
      rating: 4.9,
      deliveryFee: 4.99,
    },
    {
      id: "3",
      name: "Value Supermarket",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=ValueSupermarket",
      distance: "3.1 miles",
      rating: 4.2,
      deliveryFee: 2.99,
    },
  ];

  const storeItems: Record<string, StoreItem[]> = {
    "1": [
      {
        id: "1",
        name: "Spinach",
        price: 2.99,
        unit: "bunch",
        inStock: true,
        deliveryTime: "Today",
        storeId: "1",
      },
      {
        id: "2",
        name: "Chicken Breast",
        price: 8.99,
        unit: "lb",
        inStock: true,
        deliveryTime: "Today",
        storeId: "1",
      },
      {
        id: "3",
        name: "Feta Cheese",
        price: 4.99,
        unit: "8 oz",
        inStock: true,
        deliveryTime: "Today",
        storeId: "1",
      },
      {
        id: "4",
        name: "Garlic",
        price: 0.99,
        unit: "head",
        inStock: true,
        deliveryTime: "Today",
        storeId: "1",
      },
      {
        id: "5",
        name: "Olive Oil",
        price: 9.99,
        unit: "16 oz",
        inStock: true,
        deliveryTime: "Today",
        storeId: "1",
      },
    ],
    "2": [
      {
        id: "1",
        name: "Spinach",
        price: 3.49,
        unit: "bunch",
        inStock: true,
        deliveryTime: "Today",
        storeId: "2",
      },
      {
        id: "2",
        name: "Chicken Breast",
        price: 10.99,
        unit: "lb",
        inStock: true,
        deliveryTime: "Tomorrow",
        storeId: "2",
      },
      {
        id: "3",
        name: "Feta Cheese",
        price: 5.99,
        unit: "8 oz",
        inStock: true,
        deliveryTime: "Today",
        storeId: "2",
      },
      {
        id: "4",
        name: "Garlic",
        price: 1.29,
        unit: "head",
        inStock: true,
        deliveryTime: "Today",
        storeId: "2",
      },
      {
        id: "5",
        name: "Olive Oil",
        price: 12.99,
        unit: "16 oz",
        inStock: true,
        deliveryTime: "Today",
        storeId: "2",
      },
    ],
    "3": [
      {
        id: "1",
        name: "Spinach",
        price: 2.49,
        unit: "bunch",
        inStock: true,
        deliveryTime: "Tomorrow",
        storeId: "3",
      },
      {
        id: "2",
        name: "Chicken Breast",
        price: 7.99,
        unit: "lb",
        inStock: true,
        deliveryTime: "Tomorrow",
        storeId: "3",
      },
      {
        id: "3",
        name: "Feta Cheese",
        price: 3.99,
        unit: "8 oz",
        inStock: false,
        deliveryTime: "N/A",
        storeId: "3",
      },
      {
        id: "4",
        name: "Garlic",
        price: 0.79,
        unit: "head",
        inStock: true,
        deliveryTime: "Tomorrow",
        storeId: "3",
      },
      {
        id: "5",
        name: "Olive Oil",
        price: 8.49,
        unit: "16 oz",
        inStock: true,
        deliveryTime: "Tomorrow",
        storeId: "3",
      },
    ],
  };

  const calculateTotalPrice = (storeId: string) => {
    return storeItems[storeId]
      .filter((item) => item.inStock)
      .reduce((total, item) => total + item.price, 0);
  };

  const calculateTotalWithDelivery = (storeId: string) => {
    const store = stores.find((s) => s.id === storeId);
    return calculateTotalPrice(storeId) + (store?.deliveryFee || 0);
  };

  const getBestValueStore = () => {
    let bestStoreId = "1";
    let lowestPrice = calculateTotalWithDelivery("1");

    stores.forEach((store) => {
      const totalPrice = calculateTotalWithDelivery(store.id);
      if (totalPrice < lowestPrice) {
        lowestPrice = totalPrice;
        bestStoreId = store.id;
      }
    });

    return bestStoreId;
  };

  const bestValueStore = getBestValueStore();

  return (
    <Card className="w-full bg-white">
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center gap-2">
          <Store className="h-5 w-5 text-blue-600" />
          Store Price Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Shopping List ({groceryList.length} items)
              </h3>
              <p className="text-xs text-gray-500">
                Compare prices across local stores
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              Best Value: {stores.find((s) => s.id === bestValueStore)?.name}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stores.map((store) => {
              const totalPrice = calculateTotalPrice(store.id);
              const totalWithDelivery = calculateTotalWithDelivery(store.id);
              const isBestValue = store.id === bestValueStore;
              const allInStock = storeItems[store.id].every(
                (item) => item.inStock,
              );

              return (
                <motion.div
                  key={store.id}
                  whileHover={{ y: -5 }}
                  className={`border rounded-lg overflow-hidden ${isBestValue ? "border-green-300 shadow-md" : "border-gray-200"}`}
                >
                  <div
                    className={`p-3 flex items-center gap-3 ${isBestValue ? "bg-green-50" : "bg-gray-50"}`}
                  >
                    <div className="h-10 w-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="h-8 w-8"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{store.name}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{store.distance}</span>
                        <span className="mx-1">•</span>
                        <span>{store.rating} ★</span>
                      </div>
                    </div>
                    {isBestValue && (
                      <Badge className="bg-green-100 text-green-800">
                        Best Value
                      </Badge>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="space-y-2 mb-3">
                      {storeItems[store.id].map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center text-sm"
                        >
                          <div className="flex items-center gap-2">
                            {item.inStock ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-xs border-red-200 text-red-600 px-1 py-0"
                              >
                                Out of stock
                              </Badge>
                            )}
                            <span>{item.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">
                              ${item.price.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-500">
                              /{item.unit}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Truck className="h-3 w-3 text-gray-500" />
                          <span>Delivery:</span>
                        </div>
                        <span>${store.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>${totalWithDelivery.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          Delivery:{" "}
                          {allInStock ? "Today" : "Some items tomorrow"}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                        onClick={() => onViewStore(store.id)}
                      >
                        View Store
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() =>
                          onAddToCart(
                            store.id,
                            storeItems[store.id].filter((item) => item.inStock),
                          )
                        }
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
