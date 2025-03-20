import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award, CheckCircle2 } from "lucide-react";

type AchievementType = "milestone" | "streak" | "savings" | "reduction";

interface AchievementBadgeProps {
  type: AchievementType;
  title: string;
  description: string;
  icon?: React.ReactNode;
  isNew?: boolean;
  onDismiss?: () => void;
}

export function AchievementBadge({
  type = "milestone",
  title,
  description,
  icon,
  isNew = false,
  onDismiss = () => {},
}: AchievementBadgeProps) {
  const [show, setShow] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setShow(false);
        onDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isNew, onDismiss]);

  const getIcon = () => {
    if (icon) return icon;

    switch (type) {
      case "milestone":
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case "streak":
        return <Star className="h-5 w-5 text-amber-500" />;
      case "savings":
        return <Award className="h-5 w-5 text-emerald-500" />;
      case "reduction":
        return <CheckCircle2 className="h-5 w-5 text-teal-500" />;
      default:
        return <Trophy className="h-5 w-5 text-amber-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "milestone":
        return "bg-amber-100 border-amber-200";
      case "streak":
        return "bg-amber-100 border-amber-200";
      case "savings":
        return "bg-emerald-100 border-emerald-200";
      case "reduction":
        return "bg-teal-100 border-teal-200";
      default:
        return "bg-amber-100 border-amber-200";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "milestone":
        return "text-amber-800";
      case "streak":
        return "text-amber-800";
      case "savings":
        return "text-emerald-800";
      case "reduction":
        return "text-teal-800";
      default:
        return "text-amber-800";
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-xs w-full rounded-lg shadow-lg border ${getBgColor()} p-4`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
              {getIcon()}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-semibold ${getTextColor()}`}>{title}</h4>
                  <p className={`text-sm ${getTextColor()} opacity-80`}>
                    {description}
                  </p>
                </div>
                <Badge className="bg-white/80 backdrop-blur-sm text-teal-800 animate-pulse">
                  New!
                </Badge>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setShow(false);
              onDismiss();
            }}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
