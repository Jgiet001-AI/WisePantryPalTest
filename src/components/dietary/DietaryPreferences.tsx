import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AlertCircle, Check, Filter, Leaf, ShieldAlert } from "lucide-react";

export type DietaryPreference = {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
};

export type Allergy = {
  id: string;
  name: string;
  severity: "mild" | "moderate" | "severe";
  selected: boolean;
};

interface DietaryPreferencesProps {
  onSave?: (preferences: DietaryPreference[], allergies: Allergy[]) => void;
}

export default function DietaryPreferences({
  onSave = () => {},
}: DietaryPreferencesProps) {
  const [dietaryPreferences, setDietaryPreferences] = useState<
    DietaryPreference[]
  >([
    {
      id: "1",
      name: "Vegetarian",
      icon: <Leaf className="h-4 w-4" />,
      selected: false,
    },
    {
      id: "2",
      name: "Vegan",
      icon: <Leaf className="h-4 w-4" />,
      selected: false,
    },
    {
      id: "3",
      name: "Pescatarian",
      icon: <Leaf className="h-4 w-4" />,
      selected: false,
    },
    {
      id: "4",
      name: "Keto",
      icon: <Leaf className="h-4 w-4" />,
      selected: false,
    },
    {
      id: "5",
      name: "Paleo",
      icon: <Leaf className="h-4 w-4" />,
      selected: false,
    },
    {
      id: "6",
      name: "Low Carb",
      icon: <Leaf className="h-4 w-4" />,
      selected: false,
    },
    {
      id: "7",
      name: "Gluten-Free",
      icon: <ShieldAlert className="h-4 w-4" />,
      selected: false,
    },
    {
      id: "8",
      name: "Dairy-Free",
      icon: <ShieldAlert className="h-4 w-4" />,
      selected: false,
    },
    {
      id: "9",
      name: "Low FODMAP",
      icon: <ShieldAlert className="h-4 w-4" />,
      selected: false,
    },
  ]);

  const [allergies, setAllergies] = useState<Allergy[]>([
    { id: "1", name: "Peanuts", severity: "severe", selected: false },
    { id: "2", name: "Tree Nuts", severity: "severe", selected: false },
    { id: "3", name: "Dairy", severity: "moderate", selected: false },
    { id: "4", name: "Eggs", severity: "moderate", selected: false },
    { id: "5", name: "Wheat", severity: "moderate", selected: false },
    { id: "6", name: "Soy", severity: "mild", selected: false },
    { id: "7", name: "Fish", severity: "severe", selected: false },
    { id: "8", name: "Shellfish", severity: "severe", selected: false },
    { id: "9", name: "Sesame", severity: "mild", selected: false },
  ]);

  const togglePreference = (id: string) => {
    setDietaryPreferences(
      dietaryPreferences.map((pref) =>
        pref.id === id ? { ...pref, selected: !pref.selected } : pref,
      ),
    );
  };

  const toggleAllergy = (id: string) => {
    setAllergies(
      allergies.map((allergy) =>
        allergy.id === id
          ? { ...allergy, selected: !allergy.selected }
          : allergy,
      ),
    );
  };

  const handleSave = () => {
    onSave(dietaryPreferences, allergies);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "moderate":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "severe":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 overflow-y-auto max-h-[70vh] md:max-h-none">
      <Card className="border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50">
        <CardHeader className="pb-1 bg-white/60 backdrop-blur-sm">
          <CardTitle className="flex items-center gap-2 text-teal-800 text-base">
            <Filter className="h-4 w-4 text-teal-600" />
            Dietary Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-1 px-2">
          <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
            {dietaryPreferences.map((preference) => (
              <motion.div
                key={preference.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`flex items-center justify-between p-2 sm:p-2.5 rounded-lg border ${preference.selected ? "bg-teal-100 border-teal-200" : "bg-white border-gray-100"} cursor-pointer`}
                onClick={() => togglePreference(preference.id)}
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className={`p-1 rounded-full ${preference.selected ? "bg-teal-200" : "bg-teal-100"}`}
                  >
                    {preference.icon}
                  </div>
                  <span
                    className={`font-medium text-sm ${preference.selected ? "text-teal-800" : "text-gray-700"}`}
                  >
                    {preference.name}
                  </span>
                </div>
                <Switch checked={preference.selected} />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-100 bg-gradient-to-r from-red-50 to-rose-50">
        <CardHeader className="pb-1 bg-white/60 backdrop-blur-sm">
          <CardTitle className="flex items-center gap-2 text-red-800 text-base">
            <AlertCircle className="h-4 w-4 text-red-600" />
            Allergies & Intolerances
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-1 px-2">
          <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
            {allergies.map((allergy) => (
              <motion.div
                key={allergy.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`flex items-center justify-between p-2 sm:p-2.5 rounded-lg border ${allergy.selected ? "bg-red-50 border-red-200" : "bg-white border-gray-100"} cursor-pointer`}
                onClick={() => toggleAllergy(allergy.id)}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-medium text-sm ${allergy.selected ? "text-red-800" : "text-gray-700"}`}
                  >
                    {allergy.name}
                  </span>
                  {allergy.selected && (
                    <Badge
                      className={`text-xs ${getSeverityColor(allergy.severity)}`}
                    >
                      {allergy.severity}
                    </Badge>
                  )}
                </div>
                <Switch checked={allergy.selected} />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        className="w-full py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl flex items-center justify-center gap-2 shadow-md"
      >
        Save Preferences <Check className="h-4 w-4" />
      </Button>
    </div>
  );
}
