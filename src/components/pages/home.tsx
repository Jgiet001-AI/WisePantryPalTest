import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Emergency replacement - not rendering MobileAppPreview directly
export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem(
      "hasCompletedOnboarding",
    );
    if (!hasCompletedOnboarding) {
      navigate("/onboarding");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
        <p className="text-teal-700 text-lg">Loading WisePantryPal...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">
            WisePantryPal Home
          </h1>
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">
              Welcome to your pantry management app!
            </p>
            <p className="text-sm text-gray-500">
              Select a feature below to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button
              onClick={() => navigate("/app")}
              className="bg-teal-500 hover:bg-teal-600 text-white flex flex-col items-center py-4"
            >
              <span className="text-lg">App View</span>
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-500 hover:bg-blue-600 text-white flex flex-col items-center py-4"
            >
              <span className="text-lg">Dashboard</span>
            </Button>
          </div>
          
          <Button
            onClick={() => {
              localStorage.removeItem("hasCompletedOnboarding");
              navigate("/onboarding");
            }}
            variant="outline"
            className="w-full mt-4"
          >
            Restart Onboarding
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
