import { useState } from "react";
import { Share2, Users, Heart, MessageCircle, Plus, User, Clock, Check, Edit, Trash2, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for social features
const mockRecipes = [
  {
    id: 1,
    title: "Avocado Toast with Poached Eggs",
    image: "🥑",
    author: {
      name: "Jamie Oliver",
      avatar: "JO",
    },
    likes: 245,
    comments: 32,
    timeAgo: "2h",
    ingredients: ["2 slices bread", "1 avocado", "2 eggs", "Salt and pepper", "Red pepper flakes"],
    saved: true,
  },
  {
    id: 2,
    title: "Quick Vegetable Stir Fry",
    image: "🥦",
    author: {
      name: "Sarah Wilson",
      avatar: "SW",
    },
    likes: 187,
    comments: 24,
    timeAgo: "5h",
    ingredients: ["Broccoli", "Carrots", "Bell peppers", "Soy sauce", "Sesame oil"],
    saved: false,
  },
  {
    id: 3,
    title: "Healthy Smoothie Bowl",
    image: "🥝",
    author: {
      name: "Mark Green",
      avatar: "MG",
    },
    likes: 312,
    comments: 41,
    timeAgo: "1d",
    ingredients: ["Frozen banana", "Spinach", "Almond milk", "Chia seeds", "Berries"],
    saved: true,
  }
];

const mockShoppingLists = [
  {
    id: 1,
    title: "Weekly Groceries",
    createdBy: {
      name: "You",
      avatar: "YO",
    },
    collaborators: [
      { name: "Alex", avatar: "AL" },
      { name: "Jamie", avatar: "JA" },
    ],
    items: [
      { name: "Milk", checked: true },
      { name: "Eggs", checked: false },
      { name: "Bread", checked: false },
      { name: "Bananas", checked: true },
      { name: "Chicken breast", checked: false },
    ],
    lastUpdated: "1h ago",
  },
  {
    id: 2,
    title: "Party Supplies",
    createdBy: {
      name: "Alex",
      avatar: "AL",
    },
    collaborators: [
      { name: "You", avatar: "YO" },
      { name: "Taylor", avatar: "TA" },
      { name: "Morgan", avatar: "MO" },
    ],
    items: [
      { name: "Paper plates", checked: false },
      { name: "Napkins", checked: false },
      { name: "Soda", checked: true },
      { name: "Chips", checked: true },
      { name: "Ice", checked: false },
    ],
    lastUpdated: "3h ago",
  }
];

const mockChallenges = [
  {
    id: 1,
    title: "Zero Food Waste Week",
    description: "Use up all ingredients in your pantry before they expire",
    participants: 345,
    progress: 65,
    endDate: "5 days left",
    joined: true,
  },
  {
    id: 2,
    title: "Meatless Monday Challenge",
    description: "Try vegetarian recipes every Monday for a month",
    participants: 512,
    progress: 30,
    endDate: "3 weeks left",
    joined: false,
  },
  {
    id: 3,
    title: "Budget Grocery Month",
    description: "Reduce your grocery spending by 20% this month",
    participants: 278,
    progress: 80,
    endDate: "2 days left",
    joined: true,
  }
];

export default function SocialHub() {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [shoppingLists, setShoppingLists] = useState(mockShoppingLists);
  const [challenges, setChallenges] = useState(mockChallenges);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [selectedList, setSelectedList] = useState<any>(null);
  const [newItem, setNewItem] = useState("");

  // Toggle recipe saved state
  const toggleSaveRecipe = (recipeId: number) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === recipeId 
        ? { ...recipe, saved: !recipe.saved } 
        : recipe
    ));
    
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe({...selectedRecipe, saved: !selectedRecipe.saved});
    }
  };

  // Toggle shopping list item checked state
  const toggleItemChecked = (listId: number, itemName: string) => {
    setShoppingLists(shoppingLists.map(list => 
      list.id === listId 
        ? {
            ...list, 
            items: list.items.map(item => 
              item.name === itemName ? { ...item, checked: !item.checked } : item
            )
          } 
        : list
    ));
    
    if (selectedList && selectedList.id === listId) {
      setSelectedList({
        ...selectedList,
        items: selectedList.items.map((item: any) => 
          item.name === itemName ? { ...item, checked: !item.checked } : item
        )
      });
    }
  };

  // Add item to shopping list
  const addItemToList = (listId: number) => {
    if (!newItem.trim()) return;
    
    const updatedList = {
      ...selectedList,
      items: [...selectedList.items, { name: newItem, checked: false }]
    };
    
    setShoppingLists(shoppingLists.map(list => 
      list.id === listId ? updatedList : list
    ));
    
    setSelectedList(updatedList);
    setNewItem("");
  };

  // Toggle challenge joined state
  const toggleJoinChallenge = (challengeId: number) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, joined: !challenge.joined } 
        : challenge
    ));
  };

  return (
    <div className="container p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Social Hub
        </h2>
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          {mockShoppingLists[0].collaborators.length + 1} Connected
        </Badge>
      </div>

      <Tabs defaultValue="recipes" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-emerald-50 rounded-lg p-1">
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
          <TabsTrigger value="lists">Shopping Lists</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recipes" className="mt-4 space-y-4">
          {selectedRecipe ? (
            <div className="space-y-4">
              <Button 
                variant="ghost" 
                className="mb-2 text-emerald-600"
                onClick={() => setSelectedRecipe(null)}
              >
                ← Back to recipes
              </Button>
              
              <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm overflow-hidden">
                <div className="relative">
                  <div className="bg-emerald-500 h-20 w-full"></div>
                  <div className="absolute top-10 left-4 h-20 w-20 flex items-center justify-center text-6xl bg-white rounded-lg shadow">
                    {selectedRecipe.image}
                  </div>
                </div>
                
                <CardHeader className="pt-16">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{selectedRecipe.title}</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleSaveRecipe(selectedRecipe.id)}
                      className={selectedRecipe.saved 
                        ? "text-rose-500 border-rose-200 hover:bg-rose-50" 
                        : "text-gray-500 border-gray-200 hover:bg-gray-50"
                      }
                    >
                      <Heart className={`h-4 w-4 ${selectedRecipe.saved ? 'fill-rose-500' : ''}`} />
                      <span className="ml-1">{selectedRecipe.saved ? 'Saved' : 'Save'}</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-emerald-200 text-emerald-700 text-xs">
                        {selectedRecipe.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{selectedRecipe.author.name}</span>
                    <span className="text-xs text-gray-400 flex items-center ml-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedRecipe.timeAgo}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Ingredients</h4>
                    <ul className="space-y-1">
                      {selectedRecipe.ingredients.map((ingredient: string, i: number) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" className="flex-1 border-emerald-200 text-emerald-600">
                      See Full Recipe
                    </Button>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900">Comments ({selectedRecipe.comments})</h4>
                      <span className="text-sm text-emerald-600">See all</span>
                    </div>
                    
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <div className="flex gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-emerald-200 text-emerald-700">
                            YO
                          </AvatarFallback>
                        </Avatar>
                        <Input 
                          placeholder="Add a comment..." 
                          className="bg-white border-emerald-200"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <Input 
                  placeholder="Search recipes..." 
                  className="pr-8 border-emerald-200 focus:border-emerald-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="h-4 w-4" />
                </div>
              </div>
              
              {recipes.map(recipe => (
                <Card 
                  key={recipe.id}
                  className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="flex p-3">
                    <div className="h-16 w-16 flex items-center justify-center text-4xl bg-emerald-50 rounded-lg mr-3">
                      {recipe.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{recipe.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="bg-emerald-200 text-emerald-700 text-xs">
                            {recipe.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-500">{recipe.author.name}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Heart className="h-3 w-3 mr-1" /> {recipe.likes}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" /> {recipe.comments}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {recipe.timeAgo}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={`h-8 w-8 p-0 ${recipe.saved ? 'text-rose-500' : 'text-gray-400'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveRecipe(recipe.id);
                      }}
                    >
                      <Heart className={`h-5 w-5 ${recipe.saved ? 'fill-rose-500' : ''}`} />
                    </Button>
                  </div>
                </Card>
              ))}
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Share Your Recipe
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share a New Recipe</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Recipe Title</label>
                      <Input placeholder="E.g., Homemade Pizza" className="border-emerald-200" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Ingredients</label>
                      <textarea 
                        className="w-full border rounded-md p-2 min-h-[100px] border-emerald-200 focus:border-emerald-500 focus:ring-0"
                        placeholder="Add each ingredient on a new line"
                      ></textarea>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Instructions</label>
                      <textarea 
                        className="w-full border rounded-md p-2 min-h-[100px] border-emerald-200 focus:border-emerald-500 focus:ring-0"
                        placeholder="Describe how to prepare the recipe"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                      Share Recipe
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="lists" className="mt-4 space-y-4">
          {selectedList ? (
            <div className="space-y-4">
              <Button 
                variant="ghost" 
                className="mb-2 text-emerald-600"
                onClick={() => setSelectedList(null)}
              >
                ← Back to lists
              </Button>
              
              <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">{selectedList.title}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 text-emerald-500"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-gray-500">Shared with</span>
                    <div className="flex -space-x-2">
                      {selectedList.collaborators.map((collab: any, i: number) => (
                        <Avatar key={i} className="h-5 w-5 border border-white">
                          <AvatarFallback className="bg-emerald-200 text-emerald-700 text-xs">
                            {collab.avatar}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-5 w-5 p-0 ml-1 rounded-full text-emerald-500"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    {selectedList.items.map((item: any, i: number) => (
                      <div 
                        key={i}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-emerald-50"
                      >
                        <div 
                          className="flex items-center gap-3 flex-1"
                          onClick={() => toggleItemChecked(selectedList.id, item.name)}
                        >
                          <div className={`h-5 w-5 rounded border flex items-center justify-center cursor-pointer
                            ${item.checked 
                              ? 'bg-emerald-500 border-emerald-500' 
                              : 'border-gray-300'
                            }`}
                          >
                            {item.checked && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span className={`${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {item.name}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Input 
                      placeholder="Add new item..." 
                      className="flex-1 border-emerald-200 focus:border-emerald-500"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addItemToList(selectedList.id);
                      }}
                    />
                    <Button 
                      onClick={() => addItemToList(selectedList.id)}
                      className="bg-emerald-500 hover:bg-emerald-600"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
                    <span>Last updated: {selectedList.lastUpdated}</span>
                    <Button variant="ghost" size="sm" className="text-emerald-600 p-0 h-auto">
                      Export List
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-4">
              {shoppingLists.map(list => (
                <Card 
                  key={list.id}
                  className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedList(list)}
                >
                  <div className="p-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">{list.title}</h3>
                      <div className="flex -space-x-2">
                        <Avatar className="h-6 w-6 border border-white">
                          <AvatarFallback className="bg-emerald-200 text-emerald-700 text-xs">
                            {list.createdBy.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {list.collaborators.slice(0, 2).map((collab, i) => (
                          <Avatar key={i} className="h-6 w-6 border border-white">
                            <AvatarFallback className="bg-emerald-200 text-emerald-700 text-xs">
                              {collab.avatar}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {list.collaborators.length > 2 && (
                          <div className="h-6 w-6 rounded-full bg-emerald-100 border border-white flex items-center justify-center text-xs text-emerald-600">
                            +{list.collaborators.length - 2}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      {list.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className={`h-3 w-3 rounded-full ${item.checked ? 'bg-emerald-500' : 'border border-gray-300'}`}>
                            {item.checked && <Check className="h-2 w-2 text-white" />}
                          </div>
                          <span className={`${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {item.name}
                          </span>
                        </div>
                      ))}
                      {list.items.length > 3 && (
                        <div className="text-xs text-emerald-600">
                          +{list.items.length - 3} more items
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500">
                      Updated {list.lastUpdated}
                    </div>
                  </div>
                </Card>
              ))}
              
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                <Plus className="h-4 w-4 mr-2" />
                Create New List
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="challenges" className="mt-4 space-y-4">
          <div className="space-y-4">
            {challenges.map(challenge => (
              <Card 
                key={challenge.id}
                className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm overflow-hidden"
              >
                <div className="p-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{challenge.title}</h3>
                    <Badge 
                      className={challenge.joined 
                        ? "bg-emerald-100 text-emerald-800" 
                        : "bg-gray-100 text-gray-800"
                      }
                    >
                      {challenge.joined ? "Joined" : "Open"}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {challenge.description}
                  </p>
                  
                  <div className="mt-3">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-emerald-600">{challenge.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-emerald-500" />
                      <span className="text-xs text-gray-500">{challenge.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{challenge.endDate}</span>
                      <Button 
                        variant={challenge.joined ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleJoinChallenge(challenge.id)}
                        className={challenge.joined 
                          ? "border-emerald-200 text-emerald-600 hover:bg-emerald-50" 
                          : "bg-emerald-500 hover:bg-emerald-600"
                        }
                      >
                        {challenge.joined ? "Leave" : "Join"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Challenge
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Search = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
