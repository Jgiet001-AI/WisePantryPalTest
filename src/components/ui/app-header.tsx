import { Logo } from "./logo";
import { Button } from "./button";
import { ShoppingCart, User, Menu } from "lucide-react";

interface AppHeaderProps {
  userName?: string;
  onMenuClick?: () => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

export function AppHeader({
  userName = "Guest",
  onMenuClick = () => {},
  onCartClick = () => {},
  onProfileClick = () => {},
}: AppHeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-teal-100 sticky top-0 z-50 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-teal-700"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Logo size="sm" />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-teal-700 relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>

          <Button
            variant="ghost"
            className="text-teal-700 gap-2 hidden md:flex"
            onClick={onProfileClick}
          >
            <User className="h-5 w-5" />
            <span>{userName}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-teal-700 md:hidden"
            onClick={onProfileClick}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
