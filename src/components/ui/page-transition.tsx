import { motion } from "framer-motion";
import { ReactNode } from "react";

type TransitionType = "fade" | "slide" | "scale" | "none";

interface PageTransitionProps {
  children: ReactNode;
  type?: TransitionType;
  duration?: number;
  className?: string;
}

export function PageTransition({
  children,
  type = "fade",
  duration = 0.3,
  className = "",
}: PageTransitionProps) {
  const getVariants = () => {
    switch (type) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case "slide":
        return {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.1 },
        };
      case "none":
        return {
          initial: {},
          animate: {},
          exit: {},
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={getVariants()}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
