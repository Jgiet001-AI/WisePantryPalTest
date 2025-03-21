import React, { useState } from 'react';
import { ChevronLeft, Clock, ShoppingCart, MapPin, Info, List, AlertCircle, Navigation2 } from 'lucide-react';
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type NavigationStep = {
  id: string;
  instruction: string;
  distance: string;
  time: string;
  aisle?: string;
  items?: string[];
};

export default function StoreNavigation() {
  const [storeName] = useState('Whole Foods Market');
  const [estimatedArrival] = useState('10:25 AM');
  const [progress, setProgress] = useState(20);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Mock navigation steps
  const navigationSteps: NavigationStep[] = [
    {
      id: '1',
      instruction: 'Starting Navigation',
      distance: 'Starting',
      time: '0 min',
    },
    {
      id: '2',
      instruction: 'Head north on N Kingsbury St',
      distance: '0.3 mi',
      time: '2 min',
    },
    {
      id: '3',
      instruction: 'Turn right onto W North Ave',
      distance: '0.5 mi',
      time: '3 min',
    },
    {
      id: '4',
      instruction: 'Arrive at Whole Foods Market',
      distance: '0 ft',
      time: '0 min',
    },
    {
      id: '5',
      instruction: 'Head to Produce Section',
      distance: 'Aisle A',
      time: '2 min',
      aisle: 'Produce',
      items: ['Avocados', 'Tomatoes', 'Spinach']
    },
    {
      id: '6',
      instruction: 'Head to Dairy Section',
      distance: 'Aisle D',
      time: '3 min',
      aisle: 'Dairy',
      items: ['Milk', 'Cheese', 'Yogurt']
    },
    {
      id: '7',
      instruction: 'Head to Bakery Section',
      distance: 'Aisle F',
      time: '2 min',
      aisle: 'Bakery',
      items: ['Bread', 'Bagels']
    },
    {
      id: '8',
      instruction: 'Proceed to Checkout',
      distance: 'Front of Store',
      time: '2 min',
    }
  ];
  
  const handleNextStep = () => {
    if (currentStep < navigationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(Math.min(100, progress + 100 / navigationSteps.length));
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress(Math.max(0, progress - 100 / navigationSteps.length));
    }
  };
  
  const step = navigationSteps[currentStep];
  const isInStoreShopping = currentStep >= 4;

  return (
    <div className="h-full overflow-auto pb-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800">Store Navigation</h2>
        <Button variant="outline" size="sm" className="h-8 text-xs bg-white/90 border-orange-200">
          <List className="h-3.5 w-3.5 mr-1.5 text-orange-500" />
          Shopping List
        </Button>
      </div>
      
      {/* Store Info */}
      <Card className="bg-white/90 backdrop-blur-lg shadow-sm border border-orange-100 mb-3">
        <CardContent className="p-2.5">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-sm">{storeName}</h3>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 text-orange-500" />
                <p className="text-[10px] text-gray-600">1550 N Kingsbury St, Chicago</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end text-[10px] text-gray-600 mb-0.5">
                <Clock className="h-3 w-3 mr-1 text-orange-500" />
                ETA: {estimatedArrival}
              </div>
              <div className="flex items-center gap-1">
                <div className="text-[10px] text-orange-600">
                  {isInStoreShopping ? 'In-Store Shopping' : 'On the way'}
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Navigation Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1.5">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>
      
      {/* Current Navigation Step */}
      <Card className="bg-amber-50/70 backdrop-blur-lg shadow-sm border border-amber-100 mb-3">
        <CardContent className="p-2.5">
          <div className="flex items-start gap-2">
            <div className="mt-0.5">
              {isInStoreShopping ? (
                <ShoppingCart className="h-4 w-4 text-orange-600" />
              ) : (
                <Navigation2 className="h-4 w-4 text-orange-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-sm text-orange-800">{step.instruction}</h3>
              <div className="flex gap-3 mt-1">
                <div className="flex items-center text-[10px] text-orange-700">
                  <MapPin className="h-2.5 w-2.5 mr-0.5" />
                  {step.distance}
                </div>
                <div className="flex items-center text-[10px] text-orange-700">
                  <Clock className="h-2.5 w-2.5 mr-0.5" />
                  {step.time}
                </div>
              </div>
              
              {/* Items to collect in current aisle if we're in-store */}
              {step.items && (
                <div className="mt-2 bg-white/50 p-1.5 rounded-md">
                  <div className="flex items-center gap-1 mb-1">
                    <Info className="h-3 w-3 text-gray-500" />
                    <p className="text-[10px] font-medium text-gray-700">Items in {step.aisle}</p>
                  </div>
                  <div className="space-y-1">
                    {step.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-amber-100 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                        </div>
                        <span className="text-[10px] text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Navigation Map */}
      <div className="relative w-full h-[220px] mb-3 rounded-lg overflow-hidden bg-gray-100">
        {/* Map placeholder */}
        <div className="absolute inset-0 bg-orange-50/30">
          {/* Simplified map visualization */}
          <div className="absolute inset-0">
            {!isInStoreShopping ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 text-orange-500 opacity-50" />
                  <p className="text-xs text-gray-600">Map visualization unavailable in demo</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="border-2 border-orange-200 w-[180px] h-[120px] mx-auto relative rounded">
                    <div className="absolute top-0 left-0 w-full h-2 bg-orange-200"></div>
                    <div className="absolute top-2 left-0 w-2 h-[calc(100%-4px)] bg-orange-200"></div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-200"></div>
                    <div className="absolute top-2 right-0 w-2 h-[calc(100%-4px)] bg-orange-200"></div>
                    
                    <div className="absolute top-[20%] left-[30%] w-4 h-4 rounded-full bg-orange-500 animate-pulse"></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Store Layout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="flex justify-between">
        <Button 
          onClick={handlePrevStep} 
          variant="outline" 
          size="sm" 
          disabled={currentStep === 0}
          className="h-8 text-xs"
        >
          <ChevronLeft className="h-3.5 w-3.5 mr-1" />
          Previous
        </Button>
        <Button 
          onClick={handleNextStep} 
          variant="default" 
          size="sm" 
          disabled={currentStep === navigationSteps.length - 1}
          className="h-8 text-xs"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
