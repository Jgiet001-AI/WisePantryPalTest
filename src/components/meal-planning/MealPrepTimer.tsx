import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Bell,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface TimerStep {
  id: string;
  name: string;
  duration: number; // in seconds
  completed: boolean;
}

interface Recipe {
  id: string;
  title: string;
  totalTime: number; // in minutes
  steps: TimerStep[];
}

interface MealPrepTimerProps {
  recipe?: Recipe;
  onComplete?: () => void;
}

export default function MealPrepTimer({
  recipe = {
    id: "1",
    title: "Spinach and Feta Stuffed Chicken Breast",
    totalTime: 40,
    steps: [
      {
        id: "1",
        name: "Preheat oven to 375°F (190°C)",
        duration: 60, // 1 minute
        completed: false,
      },
      {
        id: "2",
        name: "Mix spinach, feta, and garlic in a bowl",
        duration: 180, // 3 minutes
        completed: false,
      },
      {
        id: "3",
        name: "Cut a pocket in each chicken breast",
        duration: 120, // 2 minutes
        completed: false,
      },
      {
        id: "4",
        name: "Stuff chicken with spinach mixture",
        duration: 180, // 3 minutes
        completed: false,
      },
      {
        id: "5",
        name: "Season chicken with salt, pepper, and herbs",
        duration: 60, // 1 minute
        completed: false,
      },
      {
        id: "6",
        name: "Bake in preheated oven",
        duration: 1500, // 25 minutes
        completed: false,
      },
      {
        id: "7",
        name: "Let rest before serving",
        duration: 300, // 5 minutes
        completed: false,
      },
    ],
  },
  onComplete = () => {},
}: MealPrepTimerProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [expandedSteps, setExpandedSteps] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(recipe.steps[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio for timer completion
  useEffect(() => {
    audioRef.current = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3",
    );
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      timerRef.current = window.setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (isRunning && timeRemaining === 0) {
      // Step completed
      if (audioRef.current) {
        audioRef.current.play();
      }
      completeCurrentStep();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isRunning, timeRemaining]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(recipe.steps[activeStepIndex].duration);
  };

  const completeCurrentStep = () => {
    setIsRunning(false);
    setCompletedSteps([...completedSteps, recipe.steps[activeStepIndex].id]);

    // Move to next step if available
    if (activeStepIndex < recipe.steps.length - 1) {
      const nextIndex = activeStepIndex + 1;
      setActiveStepIndex(nextIndex);
      setTimeRemaining(recipe.steps[nextIndex].duration);
    } else {
      // All steps completed
      onComplete();
    }
  };

  const skipToStep = (index: number) => {
    setIsRunning(false);
    setActiveStepIndex(index);
    setTimeRemaining(recipe.steps[index].duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateProgress = () => {
    const totalSteps = recipe.steps.length;
    const completed = completedSteps.length;
    return (completed / totalSteps) * 100;
  };

  const calculateStepProgress = () => {
    const totalDuration = recipe.steps[activeStepIndex].duration;
    const elapsed = totalDuration - timeRemaining;
    return (elapsed / totalDuration) * 100;
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="border-b pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Meal Prep Timer
          </CardTitle>
          <Badge className="bg-blue-100 text-blue-800">
            {formatTime(timeRemaining)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Recipe info */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <h3 className="font-medium text-blue-800">{recipe.title}</h3>
            <div className="flex items-center gap-2 text-sm text-blue-600 mt-1">
              <Clock className="h-4 w-4" />
              <span>Total Time: {recipe.totalTime} minutes</span>
            </div>
            <Progress
              value={calculateProgress()}
              className="h-2 mt-2 bg-blue-200"
              indicatorClassName="bg-blue-600"
            />
            <div className="flex justify-between text-xs text-blue-600 mt-1">
              <span>
                {completedSteps.length} of {recipe.steps.length} steps completed
              </span>
              <span>{Math.round(calculateProgress())}%</span>
            </div>
          </div>

          {/* Current step */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">
                Current Step
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 p-0 text-gray-500"
                onClick={() => setExpandedSteps(!expandedSteps)}
              >
                {expandedSteps ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            <motion.div
              className="bg-white rounded-lg p-3 border border-gray-200 mb-3"
              whileHover={{ y: -2 }}
              animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
              transition={{ repeat: isRunning ? Infinity : 0, duration: 2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">
                    Step {activeStepIndex + 1}:{" "}
                    {recipe.steps[activeStepIndex].name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Duration:{" "}
                    {formatTime(recipe.steps[activeStepIndex].duration)}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {completedSteps.includes(recipe.steps[activeStepIndex].id) ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" /> Done
                    </Badge>
                  ) : (
                    <Badge
                      className={
                        isRunning
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {isRunning ? "In Progress" : "Ready"}
                    </Badge>
                  )}
                </div>
              </div>
              <Progress
                value={calculateStepProgress()}
                className="h-2 mt-2 bg-gray-100"
                indicatorClassName={isRunning ? "bg-amber-500" : "bg-blue-500"}
              />
            </motion.div>

            {/* Timer controls */}
            <div className="flex items-center justify-center gap-3 my-4">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-gray-200"
                onClick={resetTimer}
              >
                <RotateCcw className="h-5 w-5 text-gray-600" />
              </Button>
              {isRunning ? (
                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full bg-amber-500 hover:bg-amber-600"
                  onClick={pauseTimer}
                >
                  <Pause className="h-8 w-8 text-white" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700"
                  onClick={startTimer}
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-gray-200"
                onClick={completeCurrentStep}
              >
                <CheckCircle className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>

          {/* All steps */}
          {expandedSteps && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                All Steps
              </h3>
              {recipe.steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center justify-between p-2 rounded-lg border ${index === activeStepIndex ? "border-blue-200 bg-blue-50" : completedSteps.includes(step.id) ? "border-green-100 bg-green-50" : "border-gray-100 bg-white"} cursor-pointer`}
                  onClick={() => skipToStep(index)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center ${completedSteps.includes(step.id) ? "bg-green-500 text-white" : index === activeStepIndex ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                    <div className="text-sm">
                      <div
                        className={`font-medium ${completedSteps.includes(step.id) ? "text-green-800 line-through" : index === activeStepIndex ? "text-blue-800" : "text-gray-800"}`}
                      >
                        {step.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatTime(step.duration)}
                      </div>
                    </div>
                  </div>
                  {index === activeStepIndex && (
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Notification settings */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-500" />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  Timer Notifications
                </div>
                <div className="text-xs text-gray-500">
                  Sound alert when timer completes
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
