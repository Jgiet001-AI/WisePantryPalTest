import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Share2,
  Heart,
  MessageSquare,
  Bookmark,
  Send,
  Camera,
  Link,
  Copy,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: Date;
}

interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  user: User;
  likes: number;
  comments: Comment[];
  bookmarks: number;
  tags: string[];
  timestamp: Date;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface RecipeSharingProps {
  recipe?: Recipe;
  onShare?: (platform: string) => void;
  onComment?: (text: string) => void;
}

export default function RecipeSharing({
  recipe = {
    id: "1",
    title: "Spinach and Feta Stuffed Chicken Breast",
    image:
      "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=800&q=80",
    description:
      "A delicious and healthy dinner option that's perfect for meal prep. These stuffed chicken breasts are packed with flavor and protein!",
    user: {
      id: "1",
      name: "Jamie Oliver",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
      username: "jamieoliver",
    },
    likes: 243,
    comments: [
      {
        id: "1",
        user: {
          id: "2",
          name: "Sarah Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          username: "sarahj",
        },
        text: "Made this last night and it was amazing! My family loved it.",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
      {
        id: "2",
        user: {
          id: "3",
          name: "Mike Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
          username: "mikec",
        },
        text: "What can I substitute for feta if I'm dairy-free?",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      },
    ],
    bookmarks: 87,
    tags: ["Chicken", "High Protein", "Gluten-Free", "Meal Prep"],
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isLiked: false,
    isBookmarked: false,
  },
  onShare = () => {},
  onComment = () => {},
}: RecipeSharingProps) {
  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(recipe.isBookmarked);
  const [likesCount, setLikesCount] = useState(recipe.likes);
  const [bookmarksCount, setBookmarksCount] = useState(recipe.bookmarks);
  const [commentText, setCommentText] = useState("");
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      setBookmarksCount(bookmarksCount - 1);
    } else {
      setBookmarksCount(bookmarksCount + 1);
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleComment = () => {
    if (commentText.trim() === "") return;
    onComment(commentText);
    setCommentText("");
  };

  const handleShare = (platform: string) => {
    onShare(platform);
    setShowShareOptions(false);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-blue-600" />
          Recipe Sharing
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div>
          {/* Recipe header with user info */}
          <div className="p-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={recipe.user.avatar} alt={recipe.user.name} />
                <AvatarFallback>{recipe.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{recipe.user.name}</div>
                <div className="text-sm text-gray-500">
                  @{recipe.user.username}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              Follow
            </Button>
          </div>

          {/* Recipe image */}
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute bottom-3 right-3">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm border-white text-gray-800 hover:bg-white"
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Camera className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Recipe content */}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
            <p className="text-gray-700 mb-3">{recipe.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-gray-700 hover:text-red-500"}`}
                  onClick={handleLike}
                >
                  <Heart
                    className="h-5 w-5"
                    fill={isLiked ? "currentColor" : "none"}
                  />
                  <span>{likesCount}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-gray-700"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>{recipe.comments.length}</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 ${isBookmarked ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                  onClick={handleBookmark}
                >
                  <Bookmark
                    className="h-5 w-5"
                    fill={isBookmarked ? "currentColor" : "none"}
                  />
                  <span>{bookmarksCount}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-blue-600"
                  onClick={() => setShowShareOptions(!showShareOptions)}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Share options */}
            {showShareOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-4"
              >
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Share this recipe
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-2 border-blue-200"
                    onClick={() => handleShare("copy")}
                  >
                    <Copy className="h-5 w-5 text-gray-700" />
                    <span className="text-xs">Copy Link</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-2 border-blue-200"
                    onClick={() => handleShare("facebook")}
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span className="text-xs">Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-2 border-blue-200"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-2 border-blue-200"
                    onClick={() => handleShare("instagram")}
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span className="text-xs">Instagram</span>
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Comments */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Comments</h3>
              <div className="space-y-3 mb-4">
                {recipe.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={comment.user.avatar}
                        alt={comment.user.name}
                      />
                      <AvatarFallback>
                        {comment.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {comment.user.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            @{comment.user.username}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 ml-1">
                        <span>{formatTimeAgo(comment.timestamp)}</span>
                        <button className="hover:text-blue-600">Reply</button>
                        <button className="hover:text-red-500">Like</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add comment */}
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                    alt="Your Avatar"
                  />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-grow"
                    onKeyDown={(e) => e.key === "Enter" && handleComment()}
                  />
                  <Button
                    size="icon"
                    className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleComment}
                    disabled={commentText.trim() === ""}
                  >
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
