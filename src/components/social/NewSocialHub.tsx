import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageSquare,
  Share2,
  Users,
  Trophy,
  Bell,
  ThumbsUp,
  Camera,
  Filter,
  Search,
  ChevronRight,
  User,
  Settings,
  Plus,
  Bookmark,
  MoreHorizontal,
  Calendar,
  Award,
  Sparkles,
  Tag,
  UserPlus,
  ThumbsDown,
  Globe,
} from "lucide-react";

// Mock data for the Social Hub
const popularCommunities = [
  { id: 1, name: "Meal Preppers", members: 12480, posts: 342, active: true },
  { id: 2, name: "Zero Waste Kitchen", members: 8765, posts: 201 },
  { id: 3, name: "Budget Cooking", members: 15240, posts: 456 },
  { id: 4, name: "Plant Based", members: 7650, posts: 178 },
];

const feedPosts = [
  {
    id: 1,
    author: "Jessica Chen",
    authorAvatar: "JC",
    role: "Master Chef",
    timeAgo: "2h",
    content: "Just organized my pantry using the inventory system - so satisfying to see everything in order! 👨‍🍳✨",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    likes: 42,
    comments: 7,
    tags: ["organization", "pantry"],
    isLiked: true,
    isSaved: false,
  },
  {
    id: 2,
    author: "Marcus Johnson",
    authorAvatar: "MJ",
    role: "Food Enthusiast",
    timeAgo: "5h",
    content: "Made this amazing pasta dish with ingredients that were about to expire. Zero waste cooking at its finest! 🍝",
    image: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
    likes: 128,
    comments: 23,
    tags: ["zerowaste", "cooking"],
    isLiked: false,
    isSaved: true,
  },
  {
    id: 3,
    author: "Sophia Williams",
    authorAvatar: "SW",
    role: "Nutritionist",
    timeAgo: "1d",
    content: "Weekly meal prep done! This app has saved me so much time and reduced my food waste by 70%! 💚",
    likes: 89,
    comments: 12,
    tags: ["mealprep", "sustainability"],
    isLiked: false,
    isSaved: false,
  },
];

const awards = [
  {
    id: 1,
    title: "Waste Reducer",
    description: "Reduced food waste by 50%",
    icon: <Award className="h-6 w-6 text-amber-600" />,
    color: "bg-amber-100",
    level: "Gold",
  },
  {
    id: 2,
    title: "Inventory Master",
    description: "Tracked 100+ items",
    icon: <Trophy className="h-6 w-6 text-indigo-600" />,
    color: "bg-indigo-100",
    level: "Silver",
  },
  {
    id: 3,
    title: "Meal Planner",
    description: "Created 30+ meal plans",
    icon: <Calendar className="h-6 w-6 text-green-600" />,
    color: "bg-green-100",
    level: "Gold",
  },
  {
    id: 4,
    title: "App Explorer",
    description: "Used all app features",
    icon: <Sparkles className="h-6 w-6 text-purple-600" />,
    color: "bg-purple-100",
    level: "Bronze",
  },
];

const events = [
  {
    id: 1,
    title: "Zero Waste Challenge",
    date: "Apr 15 - 30",
    participants: 1245,
    status: "Active",
  },
  {
    id: 2,
    title: "Community Recipe Exchange",
    date: "May 5",
    participants: 324,
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Meal Prep Marathon",
    date: "May 20",
    participants: 785,
    status: "Upcoming",
  },
];

const NewSocialHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [feedFilter, setFeedFilter] = useState("all");

  // Mock functions
  const handleLike = (postId: number) => {
    console.log(`Liked post ${postId}`);
  };

  const handleSave = (postId: number) => {
    console.log(`Saved post ${postId}`);
  };

  const handleJoinCommunity = (communityId: number) => {
    console.log(`Joined community ${communityId}`);
  };

  const handleRegisterEvent = (eventId: number) => {
    console.log(`Registered for event ${eventId}`);
  };

  const getAwardBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "gold":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "silver":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "bronze":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full h-full pb-20 overflow-y-auto">
      {/* Social Hub Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-indigo-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">Social</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8 border border-indigo-100">
              <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs">
                ME
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Social Hub Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex justify-between bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="feed" 
              className="flex-1 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-gray-500 bg-transparent hover:bg-transparent"
            >
              <Users className="h-4 w-4 mr-1.5" />
              Feed
            </TabsTrigger>
            <TabsTrigger 
              value="discover" 
              className="flex-1 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-gray-500 bg-transparent hover:bg-transparent"
            >
              <Globe className="h-4 w-4 mr-1.5" />
              Discover
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="flex-1 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-gray-500 bg-transparent hover:bg-transparent"
            >
              <Calendar className="h-4 w-4 mr-1.5" />
              Events
            </TabsTrigger>
            <TabsTrigger 
              value="awards" 
              className="flex-1 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-gray-500 bg-transparent hover:bg-transparent"
            >
              <Trophy className="h-4 w-4 mr-1.5" />
              Awards
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* Feed Tab */}
        <TabsContent value="feed" className="mt-0 space-y-4">
          {/* Create Post */}
          <Card className="bg-white/90 backdrop-blur-lg border border-indigo-50 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-indigo-100">
                  <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    ME
                  </AvatarFallback>
                </Avatar>
                <Input 
                  placeholder="Share your food journey..."
                  className="flex-1 bg-indigo-50/50 border-transparent focus-visible:ring-indigo-400 h-10 rounded-full"
                />
                <Button size="icon" className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feed Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Button 
              variant="outline" 
              className={`h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap ${
                feedFilter === "all" 
                ? "bg-indigo-100 text-indigo-700 border-indigo-200" 
                : "bg-white/80 backdrop-blur-sm border-indigo-50 text-gray-700"
              }`}
              onClick={() => setFeedFilter("all")}
            >
              All Posts
            </Button>
            <Button 
              variant="outline" 
              className={`h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap ${
                feedFilter === "following" 
                ? "bg-indigo-100 text-indigo-700 border-indigo-200" 
                : "bg-white/80 backdrop-blur-sm border-indigo-50 text-gray-700"
              }`}
              onClick={() => setFeedFilter("following")}
            >
              Following
            </Button>
            <Button 
              variant="outline" 
              className={`h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap ${
                feedFilter === "trending" 
                ? "bg-indigo-100 text-indigo-700 border-indigo-200" 
                : "bg-white/80 backdrop-blur-sm border-indigo-50 text-gray-700"
              }`}
              onClick={() => setFeedFilter("trending")}
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Trending
            </Button>
            <Button 
              variant="outline" 
              className={`h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap ${
                feedFilter === "saved" 
                ? "bg-indigo-100 text-indigo-700 border-indigo-200" 
                : "bg-white/80 backdrop-blur-sm border-indigo-50 text-gray-700"
              }`}
              onClick={() => setFeedFilter("saved")}
            >
              <Bookmark className="h-3.5 w-3.5 mr-1.5" />
              Saved
            </Button>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {feedPosts.map((post) => (
              <Card key={post.id} className="bg-white/90 backdrop-blur-lg border border-indigo-50 shadow-sm rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-indigo-100">
                        <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                          {post.authorAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-medium text-gray-900">{post.author}</h3>
                          {post.role && (
                            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100 text-[10px] px-1.5 py-0 h-4 rounded-sm">
                              {post.role}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{post.timeAgo} ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-3">
                    <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap mt-2 mb-3">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-indigo-50/50 text-indigo-600 border-indigo-100 text-xs px-2 py-0.5 rounded-full hover:bg-indigo-100 cursor-pointer">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {/* Post Image */}
                    {post.image && (
                      <div className="mt-2 -mx-4 aspect-video bg-indigo-50 relative overflow-hidden">
                        <img 
                          src={post.image} 
                          alt="Post content" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="border-t border-indigo-50 px-2 py-2 flex justify-between">
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`text-sm rounded-full px-3 ${
                          post.isLiked 
                          ? "text-red-500 hover:bg-red-50" 
                          : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                        }`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`h-4 w-4 mr-1.5 ${post.isLiked ? "fill-red-500" : ""}`} />
                        <span>{post.likes}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 text-sm rounded-full px-3"
                      >
                        <MessageSquare className="h-4 w-4 mr-1.5" />
                        <span>{post.comments}</span>
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`text-sm rounded-full px-3 ${
                        post.isSaved 
                        ? "text-indigo-500 hover:bg-indigo-50" 
                        : "text-gray-500 hover:text-indigo-500 hover:bg-indigo-50"
                      }`}
                      onClick={() => handleSave(post.id)}
                    >
                      <Bookmark className={`h-4 w-4 mr-1.5 ${post.isSaved ? "fill-indigo-500" : ""}`} />
                      <span>Save</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Discover Tab */}
        <TabsContent value="discover" className="mt-0 space-y-4">
          <div className="mb-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Popular Communities</h2>
            <Button variant="ghost" className="text-indigo-600 text-sm p-0 h-auto hover:bg-transparent hover:underline">
              See All
            </Button>
          </div>

          <div className="space-y-3">
            {popularCommunities.map((community) => (
              <Card key={community.id} className="bg-white/90 backdrop-blur-lg border border-indigo-50 shadow-sm rounded-xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${community.active ? "bg-indigo-100" : "bg-gray-100"}`}>
                        <Users className={`h-6 w-6 ${community.active ? "text-indigo-600" : "text-gray-600"}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-medium text-gray-900">{community.name}</h3>
                          {community.active && (
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px] px-1.5 py-0 h-4">
                              Active
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{community.members.toLocaleString()} members • {community.posts} posts this week</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-9 rounded-full text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100"
                      onClick={() => handleJoinCommunity(community.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-1.5" />
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="w-full rounded-full mt-2 bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100">
            Explore More Communities
          </Button>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="mt-0 space-y-4">
          <div className="mb-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            <Button variant="outline" size="sm" className="h-8 rounded-full text-xs">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Create Event
            </Button>
          </div>

          <div className="space-y-3">
            {events.map((event) => (
              <Card key={event.id} className="bg-white/90 backdrop-blur-lg border border-indigo-50 shadow-sm rounded-xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div className="flex gap-3">
                      <div className="h-14 w-14 bg-indigo-100 rounded-lg flex flex-col items-center justify-center">
                        <Calendar className="h-5 w-5 text-indigo-600 mb-0.5" />
                        <span className="text-xs font-medium text-indigo-700">{event.date.split(" ")[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-xs text-gray-500 mb-1">{event.date}</p>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={`text-xs ${
                              event.status === "Active" 
                                ? "bg-green-100 text-green-700 border-green-200" 
                                : "bg-indigo-100 text-indigo-700 border-indigo-200"
                            }`}
                          >
                            {event.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{event.participants.toLocaleString()} participants</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="h-9 self-start rounded-full text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100"
                      onClick={() => handleRegisterEvent(event.id)}
                    >
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="w-full rounded-full mt-2 bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100">
            View All Events
          </Button>
        </TabsContent>

        {/* Awards Tab */}
        <TabsContent value="awards" className="mt-0 space-y-4">
          <div className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Your Achievements</h2>
              <Badge className="bg-white/20 text-white border-white/20">
                Level 12
              </Badge>
            </div>
            <p className="text-sm text-white/80 mb-3">Keep tracking your pantry to unlock more awards!</p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <div className="flex justify-between text-xs text-white/80 mt-1">
              <span>3,250 XP</span>
              <span>4,000 XP needed for next level</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {awards.map((award) => (
              <Card key={award.id} className="bg-white/90 backdrop-blur-lg border border-indigo-50 shadow-sm rounded-xl overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${award.color}`}>
                      {award.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{award.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{award.description}</p>
                    <Badge className={getAwardBadgeColor(award.level)}>
                      {award.level}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="w-full rounded-full mt-2 bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100">
            <Trophy className="h-4 w-4 mr-2" />
            View All Achievements
          </Button>
        </TabsContent>
      </div>
    </div>
  );
};

export default NewSocialHub;
