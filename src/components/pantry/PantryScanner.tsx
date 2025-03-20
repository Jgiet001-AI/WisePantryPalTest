import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scan, Camera, X, Plus, CheckCircle } from "lucide-react";

interface PantryScannerProps {
  onItemsScanned?: (items: ScannedItem[]) => void;
}

interface ScannedItem {
  id: string;
  name: string;
  expiryDate: Date;
  quantity: number;
}

// Mock data for demonstration
const mockScannedItems: ScannedItem[] = [
  {
    id: "1",
    name: "Organic Milk",
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    quantity: 1,
  },
  {
    id: "2",
    name: "Eggs (12-pack)",
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    quantity: 1,
  },
  {
    id: "3",
    name: "Whole Wheat Bread",
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    quantity: 1,
  },
];

export default function PantryScanner({
  onItemsScanned = () => {},
}: PantryScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [scanComplete, setScanComplete] = useState(false);

  const startScanning = () => {
    setScanning(true);
    // In a real app, this would activate the camera and start scanning
    // For demo purposes, we'll simulate a scan after a delay
    setTimeout(() => {
      setScannedItems(mockScannedItems);
      setScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const resetScanner = () => {
    setScannedItems([]);
    setScanComplete(false);
  };

  const addItemsToPantry = () => {
    onItemsScanned(scannedItems);
    resetScanner();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5 text-green-600" />
          Pantry Scanner
        </CardTitle>
        <CardDescription>
          Scan food items to add them to your pantry inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!scanning && !scanComplete ? (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <Camera className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center mb-4">
              Point your camera at food items to scan them into your pantry
            </p>
            <Button
              onClick={startScanning}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Start Scanning
            </Button>
          </div>
        ) : scanning ? (
          <div className="relative">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <Scan className="h-12 w-12 text-green-500 mb-2" />
                <p className="text-white">Scanning items...</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 rounded-full bg-white/80"
              onClick={() => setScanning(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Scanned Items</h3>
              <Button variant="ghost" size="sm" onClick={resetScanner}>
                <X className="h-4 w-4 mr-1" /> Clear
              </Button>
            </div>
            <ul className="space-y-2">
              {scannedItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Expires: {formatDate(item.expiryDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      Qty: {item.quantity}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      {scanComplete && (
        <CardFooter>
          <Button
            onClick={addItemsToPantry}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Add {scannedItems.length} Items to Pantry
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
