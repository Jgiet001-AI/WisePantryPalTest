import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Utensils,
  Clock,
  ChevronRight,
  Heart,
  Sparkles,
  Plus,
} from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  tags: string[];
  ingredients: string[];
  matchPercentage: number;
}

// Mock data for demonstration
const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Spinach and Feta Stuffed Chicken Breast",
    image:
      "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=500&q=80",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    calories: 320,
    tags: ["High Protein", "Low Carb", "Gluten-Free"],
    ingredients: [
      "Chicken Breast",
      "Spinach",
      "Feta Cheese",
      "Garlic",
      "Olive Oil",
    ],
    matchPercentage: 95,
  },
  {
    id: "2",
    title: "Whole Wheat Avocado Toast with Eggs",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    calories: 280,
    tags: ["Breakfast", "Vegetarian", "Quick"],
    ingredients: [
      "Whole Wheat Bread",
      "Avocado",
      "Eggs",
      "Cherry Tomatoes",
      "Red Pepper Flakes",
    ],
    matchPercentage: 90,
  },
  {
    id: "3",
    title: "Bean and Vegetable Soup",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80",
    prepTime: 10,
    cookTime: 30,
    servings: 6,
    calories: 220,
    tags: ["Vegan", "High Fiber", "One Pot"],
    ingredients: [
      "Canned Beans",
      "Tomatoes",
      "Spinach",
      "Onion",
      "Vegetable Broth",
    ],
    matchPercentage: 85,
  },
];

interface MealSuggestionsProps {
  onViewRecipe?: (recipe: Recipe) => void;
  onAddToMealPlan?: (recipe: Recipe) => void;
  onSaveRecipe?: (recipe: Recipe) => void;
  onRefreshSuggestions?: () => void;
  onViewAllRecipes?: () => void;
}

export default function MealSuggestions({
  onViewRecipe = () => {},
  onAddToMealPlan = () => {},
  onSaveRecipe = () => {},
  onRefreshSuggestions = () => {},
  onViewAllRecipes = () => {},
}: MealSuggestionsProps) {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  const allTags = Array.from(new Set(recipes.flatMap((recipe) => recipe.tags)));

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredRecipes =
    selectedTags.length > 0
      ? recipes.filter((recipe) =>
          selectedTags.some((tag) => recipe.tags.includes(tag)),
        )
      : recipes;

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              AI Meal Suggestions
            </CardTitle>
            <CardDescription>
              Personalized recipes based on your pantry items and preferences
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
            onClick={() => {
              onRefreshSuggestions();
              // For demo purposes, shuffle the recipes
              setRecipes([...recipes].sort(() => Math.random() - 0.5));
            }}
          >
            Refresh Suggestions
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer ${selectedTags.includes(tag) ? "bg-blue-600" : "hover:bg-blue-100"}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-36 sm:h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600">
                      {recipe.matchPercentage}% Match
                    </Badge>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">
                    {recipe.title}
                  </h3>

                  <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {recipe.prepTime + recipe.cookTime} min
                    </div>
                    <div>{recipe.calories} cal</div>
                    <div>{recipe.servings} servings</div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {recipe.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-gray-100 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 -ml-2"
                      onClick={() => onViewRecipe(recipe)}
                    >
                      View Recipe
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${savedRecipes.includes(recipe.id) ? "text-red-600" : "text-gray-500 hover:text-red-600 hover:bg-red-50"}`}
                        onClick={() => {
                          onSaveRecipe(recipe);
                          if (savedRecipes.includes(recipe.id)) {
                            setSavedRecipes(
                              savedRecipes.filter((id) => id !== recipe.id),
                            );
                          } else {
                            setSavedRecipes([...savedRecipes, recipe.id]);
                          }
                        }}
                      >
                        <Heart
                          className="h-4 w-4"
                          fill={
                            savedRecipes.includes(recipe.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => onAddToMealPlan(recipe)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onViewAllRecipes}
        >
          <Utensils className="h-4 w-4 mr-2" />
          View All Recipe Suggestions
        </Button>
      </CardFooter>
    </Card>
  );
}
