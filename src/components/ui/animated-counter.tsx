import { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatValue?: (value: number) => string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1,
  formatValue = (val) => val.toFixed(0),
  className = "",
}: AnimatedCounterProps) {
  const springValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(formatValue(0));

  useEffect(() => {
    const spring = useSpring(springValue, {
      stiffness: 100,
      damping: 30,
      duration,
    });

    spring.set(value);

    const unsubscribe = spring.onChange((val) => {
      setDisplayValue(formatValue(val));
    });

    return () => unsubscribe();
  }, [value, duration, formatValue, springValue]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayValue}
    </motion.span>
  );
}
