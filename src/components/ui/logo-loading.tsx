import React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { motion } from "framer-motion";

interface LogoLoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
}

export const LogoLoading: React.FC<LogoLoadingProps> = ({
  size = "lg",
  text = "Loading...",
  className,
}) => {
  const sizes = {
    sm: "h-10",
    md: "h-16",
    lg: "h-24",
    xl: "h-32",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-6", className)}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-full h-full rounded-full bg-orange-200/60"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <motion.div 
          className="bg-white/90 backdrop-blur-md p-5 rounded-full shadow-lg border-2 border-amber-200 flex items-center justify-center relative z-10"
          animate={{
            boxShadow: [
              "0 4px 12px rgba(249, 115, 22, 0.15)",
              "0 8px 24px rgba(249, 115, 22, 0.35)",
              "0 4px 12px rgba(249, 115, 22, 0.15)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Logo size={size} showText={false} className={sizes[size]} />
        </motion.div>
      </div>
      {text && (
        <motion.p 
          className="text-amber-700 font-semibold text-lg"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};
