import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface NotFoundProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

export function NotFound({
  title = "Page Not Found",
  description = "Sorry, we couldn't find the page you're looking for.",
  showBackButton = true,
  showHomeButton = true,
}: NotFoundProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      <Card className="w-full max-w-md border-teal-200 shadow-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Search className="h-16 w-16 text-white opacity-80" />
          </motion.div>
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl text-center text-teal-800">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-center mb-6">{description}</p>
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-4 bg-teal-50 rounded-lg border border-teal-100 text-sm text-teal-700">
              <p>You might want to check:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>The URL for typos</li>
                <li>Your network connection</li>
                <li>Navigate to a different section</li>
              </ul>
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          {showBackButton && (
            <Button
              variant="outline"
              className="w-full sm:w-auto border-teal-200 text-teal-700 hover:bg-teal-50"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          )}
          {showHomeButton && (
            <Link to="/" className="w-full sm:w-auto">
              <Button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white">
                <Home className="h-4 w-4 mr-2" />
                Go to Home
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
