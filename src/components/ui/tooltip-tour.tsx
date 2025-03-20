import { useState, useEffect, ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

interface TourStep {
  target: string; // CSS selector for the target element
  title: string;
  content: ReactNode;
  position?: "top" | "right" | "bottom" | "left";
}

interface TooltipTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onComplete: () => void;
  onDismiss: () => void;
}

export function TooltipTour({
  steps,
  isOpen,
  onComplete,
  onDismiss,
}: TooltipTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen && steps.length > 0) {
      const target = document.querySelector(
        steps[currentStep].target,
      ) as HTMLElement;
      setTargetElement(target);

      if (target) {
        // Scroll target into view if needed
        target.scrollIntoView({ behavior: "smooth", block: "center" });

        // Add highlight effect
        target.style.position = "relative";
        target.style.zIndex = "50";
        target.classList.add("tooltip-tour-target");
      }

      return () => {
        if (target) {
          target.style.zIndex = "";
          target.classList.remove("tooltip-tour-target");
        }
      };
    }
  }, [isOpen, currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen || !targetElement) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onDismiss} />

      <TooltipProvider>
        <Tooltip open={true}>
          <TooltipTrigger asChild>
            <span className="sr-only">Tour step {currentStep + 1}</span>
          </TooltipTrigger>
          <TooltipContent
            side={steps[currentStep].position || "bottom"}
            className="w-80 p-0 border-teal-200 shadow-lg"
            sideOffset={5}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-3 text-white">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{steps[currentStep].title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:bg-white/20 rounded-full"
                    onClick={onDismiss}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-700 mb-4">
                  {steps[currentStep].content}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                  <div className="flex gap-2">
                    {currentStep > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-teal-200 text-teal-700 hover:bg-teal-50"
                        onClick={handlePrevious}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back
                      </Button>
                    )}
                    <Button
                      size="sm"
                      className="h-8 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white"
                      onClick={handleNext}
                    >
                      {currentStep < steps.length - 1 ? (
                        <>
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        "Finish"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
