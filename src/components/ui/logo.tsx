import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(sizeClasses[size], "relative")}>
        <img
          src="/logo.svg"
          alt="Smart Pantry Logo"
          className={cn("h-full w-auto")}
        />
      </div>
      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight",
            size === "sm" && "text-lg",
            size === "md" && "text-xl",
            size === "lg" && "text-2xl",
            "bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent",
          )}
        >
          Smart Pantry
        </span>
      )}
    </div>
  );
}
