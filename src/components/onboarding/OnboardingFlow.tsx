import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  ArrowRight,
  Utensils,
  ShoppingCart,
  Bot,
  Sparkles,
} from "lucide-react";
import DietaryPreferences, {
  DietaryPreference,
  Allergy,
} from "../dietary/DietaryPreferences";

type OnboardingStep = {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
};

export default function OnboardingFlow({
  onComplete = () => {},
}: {
  onComplete?: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      title: "Welcome to WisePantryPal",
      description:
        "Your personal assistant for smart meal planning and pantry management.",
      image:
        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80",
      icon: <Sparkles className="h-8 w-8 text-primary" />,
    },
    {
      title: "Set Your Dietary Preferences",
      description: "Tell us about your dietary needs and restrictions.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
      icon: <Utensils className="h-8 w-8 text-primary" />,
      content: (
        <DietaryPreferences
          onSave={(prefs, allergies) => {
            console.log("Saved preferences:", prefs, allergies);
            handleNext();
          }}
        />
      ),
    },
    {
      title: "Scan Your Pantry",
      description: "Add items to your pantry inventory to get started.",
      image:
        "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=800&q=80",
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    },
    {
      title: "Meet Your AI Assistant",
      description: "Your personal chef and pantry manager is ready to help.",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
      icon: <Bot className="h-8 w-8 text-primary" />,
    },
    {
      title: "You're All Set!",
      description:
        "Start exploring WisePantryPal and enjoy your cooking journey.",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentProgress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted p-2 sm:p-4">
      <Card className="w-full max-w-4xl overflow-hidden shadow-xl">
        <div
          className="flex flex-col md:flex-row"
          style={{ height: "min(650px, 90vh)" }}
        >
          {/* Left side - Image and title */}
          <div
            className="relative h-48 md:h-full md:w-2/5 flex-shrink-0"
            style={{
              backgroundImage: `url(${steps[currentStep].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/30 p-6 text-white flex flex-col justify-end">
              <div className="mb-2 rounded-full bg-primary p-2 w-fit">
                {steps[currentStep].icon}
              </div>
              <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
              <p className="text-sm opacity-90">
                {steps[currentStep].description}
              </p>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex w-full flex-col p-6 md:w-3/5 h-full">
            <div className="mb-4">
              <Progress value={currentProgress} className="h-2" />
              <p className="mt-2 text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>

            {/* Content area with fixed height and scrolling */}
            <div
              className="flex-1 overflow-y-auto mb-4 pr-2"
              style={{ height: "calc(min(400px, 60vh))" }}
            >
              {steps[currentStep].content || (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      {steps[currentStep].icon}
                    </div>
                    <h3 className="text-xl font-semibold">
                      {steps[currentStep].title}
                    </h3>
                    <p className="text-muted-foreground">
                      {steps[currentStep].description}
                    </p>
                    <Button onClick={handleNext} className="mt-4">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="mt-auto flex justify-between pt-2 bg-white z-10">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              {currentStep !== 0 && (
                <Button onClick={handleNext}>
                  {currentStep === steps.length - 1 ? "Finish" : "Next"}
                  {currentStep !== steps.length - 1 && (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
