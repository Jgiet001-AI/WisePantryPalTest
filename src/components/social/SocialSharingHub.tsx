import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Award, Users, Heart, MessageSquare, Trophy, Leaf, Camera, Calendar, PlusCircle, BarChart3 } from "lucide-react";

// Types
interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  date: string;
  level: "bronze" | "silver" | "gold";
}

interface CommunityPost {
  id: string;
  username: string;
  userAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  date: string;
  tags: string[];
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  duration: string;
  reward: string;
  status: "active" | "upcoming" | "completed";
}

export default function SocialSharingHub() {
  const [activeTab, setActiveTab] = useState<"achievements" | "community" | "challenges">("community");
  
  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: "1",
      icon: "",
      title: "Waste Warrior",
      description: "Reduced food waste by 20% in one month",
      date: "2025-02-15",
      level: "gold"
    },
    {
      id: "2",
      icon: "",
      title: "Plant-Based Pioneer",
      description: "Added 10 plant-based recipes to your collection",
      date: "2025-01-28",
      level: "silver"
    },
    {
      id: "3",
      icon: "",
      title: "Data Master",
      description: "Tracked your pantry for 30 consecutive days",
      date: "2025-03-10",
      level: "bronze"
    },
    {
      id: "4",
      icon: "",
      title: "Recipe Expert",
      description: "Created 5 original recipes",
      date: "2025-03-05",
      level: "silver"
    }
  ];
  
  // Mock community posts
  const communityPosts: CommunityPost[] = [
    {
      id: "1",
      username: "EcoChef",
      userAvatar: "EC",
      content: "Just made an amazing soup with leftover veggies that would have gone to waste! Check out my recipe in the comments.",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      likes: 24,
      comments: 7,
      date: "2025-03-18",
      tags: ["recipe", "zerowaste"]
    },
    {
      id: "2",
      username: "GreenGourmet",
      userAvatar: "GG",
      content: "Proud to say I've saved $120 this month by better meal planning and pantry management!",
      likes: 42,
      comments: 12,
      date: "2025-03-17",
      tags: ["savings", "mealplanning"]
    },
    {
      id: "3",
      username: "PantryNinja",
      userAvatar: "PN",
      content: "Weekly meal prep complete! This app has changed my life. Who else is doing Sunday prep?",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      likes: 18,
      comments: 5,
      date: "2025-03-16",
      tags: ["mealprep", "sunday"]
    }
  ];
  
  // Mock challenges data
  const challenges: Challenge[] = [
    {
      id: "1",
      title: "Zero Waste Week",
      description: "Challenge yourself to produce zero food waste for an entire week",
      participants: 156,
      duration: "7 days",
      reward: "Eco-friendly kitchen set",
      status: "active"
    },
    {
      id: "2",
      title: "Local Food Month",
      description: "Source 80% of your ingredients from local producers",
      participants: 89,
      duration: "30 days",
      reward: "Community garden donation",
      status: "upcoming"
    },
    {
      id: "3",
      title: "Plant-Based Challenge",
      description: "Try plant-based eating for two weeks",
      participants: 203,
      duration: "14 days",
      reward: "Sustainable cookbook",
      status: "upcoming"
    }
  ];
  
  const getLevelBadgeColor = (level: "bronze" | "silver" | "gold") => {
    switch (level) {
      case "gold":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "silver":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "bronze":
        return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };
  
  return (
    <div className="w-full h-full pb-16 overflow-y-auto">
      {/* Header with Tabs */}
      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white p-4 mb-4 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Share2 className="h-5 w-5 text-white/90" />
            <h2 className="text-xl font-bold">Social Hub</h2>
          </div>
          <Button variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30 text-white h-8 px-3 rounded-full text-xs">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            Find Friends
          </Button>
        </div>
        <p className="text-white/80 text-sm mb-3">Connect with other food enthusiasts and share your journey</p>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid grid-cols-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full">
            <TabsTrigger value="community" className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 text-white rounded-full transition-all duration-200">
              <Users className="h-4 w-4 mr-2" />
              <span>Feed</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 text-white rounded-full transition-all duration-200">
              <Award className="h-4 w-4 mr-2" />
              <span>Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 text-white rounded-full transition-all duration-200">
              <Trophy className="h-4 w-4 mr-2" />
              <span>Badges</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Community Tab */}
      <TabsContent value="community" className="mt-0 space-y-4 animate-in fade-in-50 duration-300">
        {/* New Post Input */}
        <Card className="backdrop-blur-lg bg-white/80 shadow-sm border border-indigo-100 mb-4 rounded-xl overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-indigo-100 shadow-sm">
                <AvatarFallback className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white">Y</AvatarFallback>
              </Avatar>
              <Input 
                placeholder="Share your latest pantry win..." 
                className="flex-1 bg-white/90 backdrop-blur-sm border-indigo-100 focus-visible:ring-indigo-500 h-10"
              />
              <Button size="icon" className="h-10 w-10 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Filter Pills */}
        <div className="mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-sm border-indigo-100 text-indigo-700 h-8 text-xs whitespace-nowrap rounded-full hover:bg-indigo-50 transition-colors duration-200">
              All Topics
            </Button>
            <Button variant="outline" className="bg-indigo-100/80 text-indigo-700 border-indigo-200 h-8 text-xs whitespace-nowrap rounded-full hover:bg-indigo-200/80 transition-colors duration-200">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mr-1.5 animate-pulse"></div>
              Active
            </Button>
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-sm border-indigo-100 text-indigo-700 h-8 text-xs whitespace-nowrap rounded-full hover:bg-indigo-50 transition-colors duration-200">
              Upcoming
            </Button>
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-sm border-indigo-100 text-indigo-700 h-8 text-xs whitespace-nowrap rounded-full hover:bg-indigo-50 transition-colors duration-200">
              Completed
            </Button>
          </div>
        </div>
        
        {/* Posts */}
        <div className="space-y-4">
          {communityPosts.map((post) => (
            <Card key={post.id} className="bg-white/80 backdrop-blur-lg shadow-sm border border-indigo-100 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-indigo-100">
                      <AvatarFallback className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white">{post.userAvatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.username}</h3>
                      <span className="text-xs text-indigo-600">
                        {new Date(post.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Content */}
                <div className="px-4 pb-3">
                  <p className="text-gray-700 leading-relaxed">{post.content}</p>
                </div>
                
                {/* Image */}
                {post.image && (
                  <div className="mb-3">
                    <img 
                      src={post.image} 
                      alt="Post" 
                      className="w-full h-auto max-h-[320px] object-cover hover:opacity-95 transition-opacity duration-200 cursor-pointer"
                    />
                  </div>
                )}
                
                {/* Tags */}
                <div className="px-4 pb-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100 rounded-full hover:bg-indigo-100 transition-colors duration-200 cursor-pointer">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Engagement */}
                <div className="border-t border-indigo-50 px-4 py-3 flex justify-between">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full px-3 transition-colors duration-200">
                    <Heart className="h-4 w-4 mr-1.5" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 rounded-full px-3 transition-colors duration-200">
                    <MessageSquare className="h-4 w-4 mr-1.5" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-violet-500 hover:bg-violet-50 rounded-full px-3 transition-colors duration-200">
                    <Share2 className="h-4 w-4 mr-1.5" />
                    <span>Share</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      {/* Challenges Tab */}
      <TabsContent value="challenges" className="mt-0 animate-in fade-in-50 duration-300">
        {/* Featured Challenge */}
        <Card className="backdrop-blur-lg bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-md border-none mb-4 rounded-xl overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Community Impact</h3>
                <p className="text-sm text-white/90">Together, our community has saved 1,230 kg of food from waste this month!</p>
                <div className="mt-2 w-full bg-white/20 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-white/80 mt-1">
                  <span>Goal: 1,500 kg</span>
                  <span>78% Complete</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Challenge Categories */}
        <div className="mb-4 overflow-x-auto -mx-2 px-2 scrollbar-hide">
          <div className="flex gap-2 pb-1">
            <Button variant="outline" className="bg-white/90 backdrop-blur-sm shadow-sm border-indigo-100 text-indigo-700 h-9 text-xs whitespace-nowrap rounded-full hover:bg-indigo-50 transition-colors duration-200">
              All Challenges
            </Button>
            <Button variant="outline" className="bg-indigo-100/80 text-indigo-700 border-indigo-200 h-9 text-xs whitespace-nowrap rounded-full hover:bg-indigo-200/80 transition-colors duration-200">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mr-1.5 animate-pulse"></div>
              Active
            </Button>
            <Button variant="outline" className="bg-white/90 backdrop-blur-sm shadow-sm border-indigo-100 text-indigo-700 h-9 text-xs whitespace-nowrap rounded-full hover:bg-indigo-50 transition-colors duration-200">
              Upcoming
            </Button>
            <Button variant="outline" className="bg-white/90 backdrop-blur-sm shadow-sm border-indigo-100 text-indigo-700 h-9 text-xs whitespace-nowrap rounded-full hover:bg-indigo-50 transition-colors duration-200">
              Completed
            </Button>
          </div>
        </div>
        
        {/* Challenge Cards */}
        <div className="grid grid-cols-1 gap-4">
          {challenges.map((challenge) => (
            <Card 
              key={challenge.id} 
              className={`backdrop-blur-lg shadow-sm border overflow-hidden rounded-xl transition-all duration-200 hover:shadow-md ${
                challenge.status === "active" 
                  ? "bg-indigo-50/80 border-indigo-200 ring-1 ring-indigo-100" 
                  : challenge.status === "upcoming" 
                  ? "bg-white/80 border-indigo-100" 
                  : "bg-gray-50/80 border-gray-200"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold ${
                    challenge.status === "active" ? "text-indigo-700" : "text-gray-800"
                  }`}>
                    {challenge.title}
                  </h3>
                  <Badge 
                    className={`${
                      challenge.status === "active" 
                        ? "bg-indigo-100 text-indigo-700 border-indigo-200" 
                        : challenge.status === "upcoming" 
                        ? "bg-violet-100 text-violet-700 border-violet-200" 
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    } rounded-full text-xs border px-2 py-0.5`}
                  >
                    {challenge.status === "active" && 
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1 animate-pulse"></div>
                    }
                    {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 flex items-center border border-indigo-50">
                    <Users className="h-3.5 w-3.5 text-indigo-500 mr-1.5" />
                    <span className="text-gray-800 font-medium">{challenge.participants} participants</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 flex items-center border border-indigo-50">
                    <Calendar className="h-3.5 w-3.5 text-indigo-500 mr-1.5" />
                    <span className="text-gray-800 font-medium">{challenge.duration}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
                    <Trophy className="h-3.5 w-3.5 text-amber-500" />
                    <span>Reward: {challenge.reward}</span>
                  </div>
                </div>
                
                {challenge.status === "active" ? (
                  <Button className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white rounded-full text-sm h-9 transition-all duration-200">
                    View Challenge Details
                  </Button>
                ) : challenge.status === "upcoming" ? (
                  <Button variant="outline" className="w-full border-indigo-200 bg-white/90 text-indigo-700 hover:bg-indigo-50 rounded-full text-sm h-9 transition-all duration-200">
                    Set Reminder
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full border-gray-200 bg-white/90 text-gray-700 hover:bg-gray-50 rounded-full text-sm h-9 transition-all duration-200">
                    View Results
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
          
          {/* Create Challenge Button */}
          <Button 
            className="bg-white/90 border border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 rounded-xl py-8 flex flex-col items-center gap-2 transition-all duration-200"
            variant="outline"
          >
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <PlusCircle className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="font-medium">Create Your Own Challenge</span>
            <span className="text-xs text-gray-500">Invite friends to join your sustainability goals</span>
          </Button>
        </div>
      </TabsContent>
      
      {/* Achievements Tab */}
      <TabsContent value="achievements" className="mt-0 space-y-4 animate-in fade-in-50 duration-300">
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="bg-white/80 backdrop-blur-lg border border-indigo-100 shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-3">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${
                    achievement.level === "gold" 
                      ? "bg-amber-100" 
                      : achievement.level === "silver" 
                        ? "bg-slate-100" 
                        : "bg-orange-100"
                  }`}>
                    {achievement.title.includes("Waste") ? (
                      <Leaf className="h-6 w-6 text-green-600" />
                    ) : achievement.title.includes("Plant") ? (
                      <Leaf className="h-6 w-6 text-indigo-600" />
                    ) : achievement.title.includes("Data") ? (
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    ) : (
                      <Trophy className="h-6 w-6 text-amber-600" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{achievement.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                  <Badge className={getLevelBadgeColor(achievement.level)}>
                    {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </div>
  );
}
