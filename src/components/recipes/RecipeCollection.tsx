import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  Utensils, Clock, BookMarked, Search, Plus, Heart, Edit, SlidersHorizontal,
  Bookmark, CalendarDays, Share2, Tag, X, ChevronRight, ChevronDown, List,
  BookOpen, Grid3X3, LayoutGrid, Star, CheckCircle, FolderPlus, PlusCircle, Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";

interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  tags: string[];
  isFavorite: boolean;
  collections: string[];
  notes?: string;
  description?: string;
}

interface Collection {
  id: string;
  name: string;
  recipes: string[];
  description?: string;
}

export default function RecipeCollection() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCookingTime, setSelectedCookingTime] = useState<string | null>(null);
  const [selectedFoodType, setSelectedFoodType] = useState<string | null>(null);
  const [showAddNoteModal, setShowAddNoteModal] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
  const [showAddToCollectionModal, setShowAddToCollectionModal] = useState<string | null>(null);
  const [showAddToMealPlanModal, setShowAddToMealPlanModal] = useState<string | null>(null);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDesc, setNewCollectionDesc] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mealPlanDate, setMealPlanDate] = useState('');
  const [mealPlanType, setMealPlanType] = useState('');
  const [mealPlanNote, setMealPlanNote] = useState('');
  const { toast } = useToast();

  // Initialize with mock data
  useEffect(() => {
    // Mock recipe data
    const mockRecipes: Recipe[] = [
      {
        id: "1",
        title: "Vegetable Stir Fry",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        prepTime: 15,
        cookTime: 10,
        servings: 4,
        calories: 320,
        tags: ["Vegetarian", "Quick", "Healthy"],
        isFavorite: true,
        collections: ["1", "3"],
        description: "A quick and healthy stir fry with seasonal vegetables"
      },
      {
        id: "2",
        title: "Pasta Carbonara",
        image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        calories: 550,
        tags: ["Italian", "Pasta", "Comfort Food"],
        isFavorite: false,
        collections: ["2"],
        description: "Classic Italian pasta with creamy egg sauce and pancetta"
      },
      {
        id: "3",
        title: "Chicken Curry",
        image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
        prepTime: 20,
        cookTime: 30,
        servings: 4,
        calories: 480,
        tags: ["Indian", "Spicy", "Main Course"],
        isFavorite: true,
        collections: ["1"],
        description: "Aromatic curry with tender chicken pieces in rich sauce"
      },
      {
        id: "4",
        title: "Greek Salad",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2184&q=80",
        prepTime: 15,
        cookTime: 0,
        servings: 2,
        calories: 250,
        tags: ["Greek", "Salad", "Healthy", "No-Cook"],
        isFavorite: false,
        collections: ["3"],
        description: "Fresh Mediterranean salad with feta cheese and olives"
      }
    ];

    // Mock collection data
    const mockCollections: Collection[] = [
      {
        id: "1",
        name: "Weeknight Dinners",
        recipes: ["1", "3"],
        description: "Quick and easy meals for busy weeknights"
      },
      {
        id: "2",
        name: "Comfort Food",
        recipes: ["2"],
        description: "Delicious recipes that warm the soul"
      },
      {
        id: "3",
        name: "Healthy Options",
        recipes: ["1", "4"],
        description: "Nutritious and flavorful meals"
      }
    ];

    setRecipes(mockRecipes);
    setCollections(mockCollections);
  }, []);

  // Toggle a recipe as favorite
  const toggleFavorite = (id: string) => {
    setRecipes(prevRecipes => 
      prevRecipes.map(recipe => 
        recipe.id === id 
          ? { ...recipe, isFavorite: !recipe.isFavorite } 
          : recipe
      )
    );
    
    // Find the recipe to get its current favorite status
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      toast({
        title: recipe.isFavorite ? "Removed from favorites" : "Added to favorites",
        description: recipe.isFavorite 
          ? `${recipe.title} has been removed from your favorites.` 
          : `${recipe.title} has been added to your favorites.`
      });
    }
  };

  // Add a note to a recipe
  const addNoteToRecipe = (recipeId: string) => {
    if (noteText.trim()) {
      setRecipes(prevRecipes => 
        prevRecipes.map(recipe => 
          recipe.id === recipeId 
            ? { ...recipe, notes: noteText } 
            : recipe
        )
      );
      
      const recipe = recipes.find(r => r.id === recipeId);
      if (recipe) {
        toast({
          title: "Note added",
          description: `Your note has been added to ${recipe.title}`,
        });
      }
      
      // Reset and close modal
      setNoteText("");
      setShowAddNoteModal(null);
    }
  };
  
  // Add recipe to a collection
  const addToCollection = (collectionId: string, recipeId: string) => {
    // Find the collection and the recipe
    const collection = collections.find(c => c.id === collectionId);
    const recipe = recipes.find(r => r.id === recipeId);
    
    if (collection && recipe) {
      // Check if the recipe is already in the collection
      if (collection.recipes.includes(recipeId)) {
        toast({
          title: "Already in collection",
          description: `${recipe.title} is already in ${collection.name}`,
        });
        setShowAddToCollectionModal(null);
        return;
      }
      
      // Add the recipe to the collection
      setCollections(prevCollections => 
        prevCollections.map(c => 
          c.id === collectionId 
            ? { ...c, recipes: [...c.recipes, recipeId] } 
            : c
        )
      );
      
      toast({
        title: "Added to collection",
        description: `${recipe.title} added to ${collection.name}`,
      });
      
      // Close the modal
      setShowAddToCollectionModal(null);
    }
  };
  
  // Create a new collection
  const createCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection: Collection = {
        id: `collection-${Date.now()}`,
        name: newCollectionName,
        description: newCollectionDesc,
        recipes: []
      };
      
      setCollections(prev => [...prev, newCollection]);
      
      toast({
        title: "Collection created",
        description: `${newCollectionName} has been created`,
      });
      
      // Reset the form fields
      setNewCollectionName("");
      setNewCollectionDesc("");
      setShowAddCollectionModal(false);
    }
  };
  
  // Add recipe to meal plan
  const addToMealPlan = (recipeId: string) => {
    if (mealPlanDate && mealPlanType) {
      // Here you would actually save this to your meal plan data structure
      // For demo purposes, we'll just show a toast
      const recipe = recipes.find(r => r.id === recipeId);
      
      if (recipe) {
        toast({
          title: "Added to meal plan",
          description: `${recipe.title} added to your ${mealPlanType} on ${mealPlanDate}`,
        });
        
        // Reset form and close modal
        setMealPlanDate('');
        setMealPlanType('');
        setMealPlanNote('');
        setShowAddToMealPlanModal(null);
      }
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    // Filter by tab
    if (activeTab === "all") return true;
    if (activeTab === "favorites") return recipe.isFavorite;
    if (activeTab.startsWith("collection-")) {
      const collectionId = activeTab.replace("collection-", "");
      return recipe.collections.includes(collectionId);
    }
    return true;
  }).filter(recipe => {
    // Filter by search query
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(query) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="max-w-4xl mx-auto pb-6 px-4 pt-4 bg-white">
      {/* DEBUG MESSAGE - REMOVE AFTER FIXING */}
      <div className="p-4 mb-4 bg-red-100 text-red-800 font-bold border-2 border-red-500 rounded-lg">
        DEBUG: If you can see this message, the component is rendering! Check browser console for errors.
      </div>
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-gray-800">Recipe Collection</h2>
          <Badge className="ml-2 bg-blue-100 text-blue-800 rounded-full">
            {recipes.length} recipes
          </Badge>
        </div>
        <Button 
          onClick={() => setShowAddCollectionModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
        >
          <Plus className="h-4 w-4 mr-1.5" /> New Collection
        </Button>
      </div>
      
      {/* Search & View Controls */}
      <Card className="backdrop-blur-lg bg-white/80 shadow-sm border border-gray-100 mb-4">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search recipes by name or tag..."
                className="pl-10 bg-white/50 rounded-full border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === "grid" ? "default" : "outline"} 
                size="icon" 
                className="rounded-full"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              
              <Button 
                variant={viewMode === "list" ? "default" : "outline"} 
                size="icon" 
                className="rounded-full"
                onClick={() => setViewMode("list")}
              >
                <BookOpen className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="backdrop-blur-lg bg-white/30 p-1 rounded-full border border-gray-100 mb-4">
          <TabsTrigger value="all" className="rounded-full">All Recipes</TabsTrigger>
          <TabsTrigger value="favorites" className="rounded-full">
            <Heart className="h-4 w-4 mr-1.5" />
            Favorites
          </TabsTrigger>
          {collections.slice(0, 3).map(collection => (
            <TabsTrigger key={collection.id} value={`collection-${collection.id}`} className="rounded-full hidden md:inline-flex">
              {collection.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-1">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onToggleFavorite={() => toggleFavorite(recipe.id)}
                    onAddNote={() => {
                      setNoteText(recipe.notes || "");
                      setShowAddNoteModal(recipe.id);
                    }}
                    onAddToMealPlan={() => {
                      setShowAddToMealPlanModal(recipe.id);
                      const today = new Date();
                      const formattedDate = today.toISOString().split('T')[0];
                      setMealPlanDate(formattedDate);
                      setMealPlanType('dinner');
                    }}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Utensils className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No recipes found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          ) : (
            <Card className="backdrop-blur-lg bg-white/80 shadow-sm border border-gray-100">
              <CardContent className="p-4 divide-y divide-gray-100">
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map(recipe => (
                    <div key={recipe.id} className="flex items-center gap-4 py-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-800 truncate">{recipe.title}</h3>
                          {recipe.isFavorite && (
                            <Heart className="h-4 w-4 text-red-500 ml-2" fill="currentColor" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{recipe.prepTime + recipe.cookTime} min</span>
                          <span>•</span>
                          <span>{recipe.calories} kcal</span>
                          <span>•</span>
                          <span>{recipe.servings} servings</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => toggleFavorite(recipe.id)}
                        >
                          <Heart className="h-4 w-4" fill={recipe.isFavorite ? "currentColor" : "none"} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => {
                            setNoteText(recipe.notes || "");
                            setShowAddNoteModal(recipe.id);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => {
                            setShowAddToMealPlanModal(recipe.id);
                            const today = new Date();
                            const formattedDate = today.toISOString().split('T')[0];
                            setMealPlanDate(formattedDate);
                            setMealPlanType('dinner');
                          }}
                        >
                          <CalendarDays className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Utensils className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No recipes found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-1">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onToggleFavorite={() => toggleFavorite(recipe.id)}
                    onAddNote={() => {
                      setNoteText(recipe.notes || "");
                      setShowAddNoteModal(recipe.id);
                    }}
                    onAddToMealPlan={() => {
                      setShowAddToMealPlanModal(recipe.id);
                      const today = new Date();
                      const formattedDate = today.toISOString().split('T')[0];
                      setMealPlanDate(formattedDate);
                      setMealPlanType('dinner');
                    }}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No favorites yet</h3>
                  <p className="text-gray-500 mb-4">Mark recipes as favorites to see them here</p>
                </div>
              )}
            </div>
          ) : (
            <Card className="backdrop-blur-lg bg-white/80 shadow-sm border border-gray-100">
              <CardContent className="p-4 divide-y divide-gray-100">
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map(recipe => (
                    <div key={recipe.id} className="flex items-center gap-4 py-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-800 truncate">{recipe.title}</h3>
                          <Heart className="h-4 w-4 text-red-500 ml-2" fill="currentColor" />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{recipe.prepTime + recipe.cookTime} min</span>
                          <span>•</span>
                          <span>{recipe.calories} kcal</span>
                          <span>•</span>
                          <span>{recipe.servings} servings</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => toggleFavorite(recipe.id)}
                        >
                          <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => {
                            setNoteText(recipe.notes || "");
                            setShowAddNoteModal(recipe.id);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => {
                            setShowAddToMealPlanModal(recipe.id);
                            const today = new Date();
                            const formattedDate = today.toISOString().split('T')[0];
                            setMealPlanDate(formattedDate);
                            setMealPlanType('dinner');
                          }}
                        >
                          <CalendarDays className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-pink-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No favorites yet</h3>
                    <p className="text-gray-500 mb-4">Mark recipes as favorites to see them here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {collections.map(collection => (
          <TabsContent key={collection.id} value={`collection-${collection.id}`} className="mt-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{collection.name}</h3>
              {collection.description && (
                <p className="text-gray-600 text-sm">{collection.description}</p>
              )}
            </div>
            
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map(recipe => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe} 
                      onToggleFavorite={() => toggleFavorite(recipe.id)}
                      onAddNote={() => {
                        setNoteText(recipe.notes || "");
                        setShowAddNoteModal(recipe.id);
                      }}
                      onAddToMealPlan={() => {
                        setShowAddToMealPlanModal(recipe.id);
                        const today = new Date();
                        const formattedDate = today.toISOString().split('T')[0];
                        setMealPlanDate(formattedDate);
                        setMealPlanType('dinner');
                      }}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FolderPlus className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No recipes in this collection</h3>
                    <p className="text-gray-500 mb-4">Add recipes to this collection to see them here</p>
                  </div>
                )}
              </div>
            ) : (
              <Card className="backdrop-blur-lg bg-white/80 shadow-sm border border-gray-100">
                <CardContent className="p-4 divide-y divide-gray-100">
                  {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                      <div key={recipe.id} className="flex items-center gap-4 py-3">
                        <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-800 truncate">{recipe.title}</h3>
                            {recipe.isFavorite && <Heart className="h-4 w-4 text-red-500 ml-2" fill="currentColor" />}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{recipe.prepTime + recipe.cookTime} min</span>
                            <span>•</span>
                            <span>{recipe.calories} kcal</span>
                            <span>•</span>
                            <span>{recipe.servings} servings</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => toggleFavorite(recipe.id)}
                          >
                            <Heart className={`h-4 w-4 ${recipe.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                              setNoteText(recipe.notes || "");
                              setShowAddNoteModal(recipe.id);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                              setShowAddToMealPlanModal(recipe.id);
                              const today = new Date();
                              const formattedDate = today.toISOString().split('T')[0];
                              setMealPlanDate(formattedDate);
                              setMealPlanType('dinner');
                            }}
                          >
                            <CalendarDays className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FolderPlus className="h-8 w-8 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-1">No recipes in this collection</h3>
                      <p className="text-gray-500 mb-4">Add recipes to this collection to see them here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Filters section */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilters ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <Card className="backdrop-blur-lg bg-white/80 border border-gray-100 shadow-sm mt-3">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-sm font-medium text-gray-700">
                  Difficulty
                </Label>
                <Select 
                  value={selectedDifficulty || ""} 
                  onValueChange={(value) => setSelectedDifficulty(value || null)}
                >
                  <SelectTrigger id="difficulty" className="w-full bg-white/50 border-gray-200">
                    <SelectValue placeholder="Any difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any difficulty</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cook-time" className="text-sm font-medium text-gray-700">
                  Cooking Time
                </Label>
                <Select 
                  value={selectedCookingTime || ""} 
                  onValueChange={(value) => setSelectedCookingTime(value || null)}
                >
                  <SelectTrigger id="cook-time" className="w-full bg-white/50 border-gray-200">
                    <SelectValue placeholder="Any duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any duration</SelectItem>
                    <SelectItem value="quick">Quick (&lt; 15 min)</SelectItem>
                    <SelectItem value="medium">Medium (15-30 min)</SelectItem>
                    <SelectItem value="long">Long (&gt; 30 min)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="food-type" className="text-sm font-medium text-gray-700">
                  Food Type
                </Label>
                <Select 
                  value={selectedFoodType || ""} 
                  onValueChange={(value) => setSelectedFoodType(value || null)}
                >
                  <SelectTrigger id="food-type" className="w-full bg-white/50 border-gray-200">
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any type</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="seafood">Seafood</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs bg-white/80"
                onClick={() => {
                  setSelectedDifficulty(null);
                  setSelectedCookingTime(null);
                  setSelectedFoodType(null);
                }}
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collection List (visible on mobile and smaller screens) */}
      <Card className="backdrop-blur-lg bg-white/80 shadow-sm border border-gray-100 md:hidden mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">All Collections</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-2">
            {collections.map(collection => (
              <Button
                key={collection.id}
                variant="outline"
                className="justify-start bg-white/70 hover:bg-white/90 border border-gray-100 rounded-lg h-auto py-2"
                onClick={() => setActiveTab(`collection-${collection.id}`)}
              >
                <div className="flex items-center w-full">
                  <BookMarked className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="flex-1 text-left">{collection.name}</span>
                  <Badge className="ml-auto bg-gray-100 text-gray-600 rounded-full">
                    {collection.recipes.length}
                  </Badge>
                  <ChevronRight className="h-4 w-4 ml-1 text-gray-400" />
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Add Note Modal */}
      <AnimatePresence>
        {showAddNoteModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddNoteModal(null)}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-lg w-full max-w-md rounded-xl shadow-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowAddNoteModal(null)}
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Add Personal Note</h3>
                  <p className="text-gray-600 text-sm">Keep track of your own ideas and modifications</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipe-note" className="text-gray-700">Your note</Label>
                    <Textarea
                      id="recipe-note"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add your personal notes, modifications, or thoughts about this recipe..."
                      className="w-full min-h-[120px] bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddNoteModal(null)}
                    className="bg-white/80"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => addNoteToRecipe(showAddNoteModal)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Save Note
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add to Collection Modal */}
      <AnimatePresence>
        {showAddToCollectionModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddToCollectionModal(null)}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-lg w-full max-w-md rounded-xl shadow-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowAddToCollectionModal(null)}
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Add to Collection</h3>
                  <p className="text-gray-600 text-sm">Choose a collection or create a new one</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700">Select Collection</Label>
                    <div className="grid gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                      {collections.map(collection => (
                        <Button
                          key={collection.id}
                          variant="outline"
                          className="justify-start bg-white/70 hover:bg-white/90 border border-gray-100 rounded-lg h-auto py-2"
                          onClick={() => addToCollection(collection.id, showAddToCollectionModal || '')}
                        >
                          <div className="flex items-center w-full">
                            <BookMarked className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="flex-1 text-left">{collection.name}</span>
                            <Badge className="ml-auto bg-gray-100 text-gray-600 rounded-full">
                              {collection.recipes.length}
                            </Badge>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start bg-white/70 hover:bg-white/90 border border-dashed border-gray-300 rounded-lg h-auto py-2"
                      onClick={() => {
                        setShowAddToCollectionModal(null);
                        setShowAddCollectionModal(true);
                      }}
                    >
                      <div className="flex items-center w-full">
                        <PlusCircle className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="flex-1 text-left">Create new collection</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Create Collection Modal */}
      <AnimatePresence>
        {showAddCollectionModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddCollectionModal(false)}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-lg w-full max-w-md rounded-xl shadow-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowAddCollectionModal(false)}
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Create New Collection</h3>
                  <p className="text-gray-600 text-sm">Organize your recipes into custom collections</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="collection-name" className="text-gray-700">Collection Name</Label>
                    <Input
                      id="collection-name"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                      placeholder="E.g., Weeknight Dinners, Holiday Recipes, etc."
                      className="w-full bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="collection-desc" className="text-gray-700">Description (Optional)</Label>
                    <Textarea
                      id="collection-desc"
                      value={newCollectionDesc}
                      onChange={(e) => setNewCollectionDesc(e.target.value)}
                      placeholder="A brief description of this collection..."
                      className="w-full min-h-[80px] bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddCollectionModal(false)}
                    className="bg-white/80"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={createCollection}
                    disabled={!newCollectionName.trim()}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Create Collection
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add to Meal Plan Modal */}
      <AnimatePresence>
        {showAddToMealPlanModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddToMealPlanModal(null)}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-lg w-full max-w-md rounded-xl shadow-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowAddToMealPlanModal(null)}
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Add to Meal Plan</h3>
                  <p className="text-gray-600 text-sm">Schedule this recipe for a future meal</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meal-date" className="text-gray-700">Date</Label>
                    <Input
                      id="meal-date"
                      type="date"
                      value={mealPlanDate}
                      onChange={(e) => setMealPlanDate(e.target.value)}
                      className="w-full bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meal-type" className="text-gray-700">Meal Type</Label>
                    <Select value={mealPlanType} onValueChange={setMealPlanType}>
                      <SelectTrigger className="w-full bg-white/50 border-gray-200">
                        <SelectValue placeholder="Select a meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meal-note" className="text-gray-700">Note (Optional)</Label>
                    <Textarea
                      id="meal-note"
                      value={mealPlanNote}
                      onChange={(e) => setMealPlanNote(e.target.value)}
                      placeholder="Any special notes for this meal..."
                      className="w-full min-h-[80px] bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddToMealPlanModal(null)}
                    className="bg-white/80"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => addToMealPlan(showAddToMealPlanModal || '')}
                    disabled={!mealPlanDate || !mealPlanType}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Add to Meal Plan
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: () => void;
  onAddNote: () => void;
  onAddToMealPlan: () => void;
}

function RecipeCard({ recipe, onToggleFavorite, onAddNote, onAddToMealPlan }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden backdrop-blur-lg bg-white/80 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <Button 
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90"
          onClick={onToggleFavorite}
        >
          <Heart className={`h-4 w-4 ${recipe.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
              {tag}
            </Badge>
          ))}
          {recipe.tags.length > 3 && (
            <Badge variant="outline" className="bg-gray-50 text-gray-500">
              +{recipe.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <h3 className="font-medium text-gray-800 text-lg mb-1 line-clamp-1">{recipe.title}</h3>
        
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1 text-gray-400" />
            <span>{recipe.servings}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{recipe.description}</p>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex justify-between">
        <div className="flex items-center gap-1.5">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onToggleFavorite}
          >
            <Heart className="h-4 w-4" fill={recipe.isFavorite ? "currentColor" : "none"} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onAddNote}
          >
            <Edit className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs h-8 bg-white"
          onClick={onAddToMealPlan}
        >
          <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
          Add to Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
