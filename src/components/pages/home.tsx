import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileAppPreview from "../mobile/MobileAppPreview";

export default function Home() {
  const navigate = useNavigate();

  // Check if this is the first visit and redirect to onboarding if needed
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem(
      "hasCompletedOnboarding",
    );
    if (!hasCompletedOnboarding) {
      navigate("/onboarding");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 p-4">
      <MobileAppPreview />
    </div>
  );
}
