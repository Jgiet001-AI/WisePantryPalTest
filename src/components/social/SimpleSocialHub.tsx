import React, { useState } from "react";
import { Link } from "react-router-dom";

const SimpleSocialHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [liked, setLiked] = useState<Record<string, boolean>>({
    post1: true,
    post2: false
  });
  const [saved, setSaved] = useState<Record<string, boolean>>({
    post1: false,
    post2: false
  });

  const handleLike = (postId: string) => {
    setLiked(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleSave = (postId: string) => {
    setSaved(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-full pb-20 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-indigo-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 text-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Social Hub</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/search" className="rounded-full h-8 w-8 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </Link>
            <Link to="/notifications" className="rounded-full h-8 w-8 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </Link>
            <Link to="/profile" className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs flex items-center justify-center">
              ME
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full flex justify-between bg-transparent">
          <button 
            onClick={() => handleTabChange("feed")} 
            className={`flex-1 py-2 border-b-2 ${activeTab === "feed" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500"} flex items-center justify-center gap-1.5`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Feed
          </button>
          <button 
            onClick={() => handleTabChange("discover")} 
            className={`flex-1 py-2 border-b-2 ${activeTab === "discover" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500"} flex items-center justify-center gap-1.5`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            Discover
          </button>
          <button 
            onClick={() => handleTabChange("events")} 
            className={`flex-1 py-2 border-b-2 ${activeTab === "events" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500"} flex items-center justify-center gap-1.5`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Events
          </button>
          <button 
            onClick={() => handleTabChange("awards")} 
            className={`flex-1 py-2 border-b-2 ${activeTab === "awards" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500"} flex items-center justify-center gap-1.5`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            Awards
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Create Post */}
        <div className="bg-white/90 backdrop-blur-lg border border-indigo-50 shadow-sm rounded-xl overflow-hidden p-4 mb-4">
          <div className="flex items-center gap-3">
            <Link to="/profile" className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center">
              ME
            </Link>
            <Link to="/create-post" className="flex-1 bg-indigo-50/50 border border-transparent rounded-full px-4 py-2 h-10 text-gray-500 flex items-center">
              Share your food journey...
            </Link>
            <Link to="/create-photo-post" className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            </Link>
          </div>
        </div>

        {/* Post 1 */}
        <div className="bg-white/90 backdrop-blur-lg border border-indigo-50 shadow-sm rounded-xl overflow-hidden mb-4">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Link to="/user/jessica-chen" className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium">
                  JC
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-medium text-gray-900">Jessica Chen</h3>
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] px-1.5 py-0.5 rounded-sm">
                      Master Chef
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">2h ago</p>
                </div>
              </Link>
              <div className="relative">
                <button className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-3">
              Just organized my pantry using the inventory system - so satisfying to see everything in order! 👨‍🍳✨
            </p>

            <div className="flex gap-1.5 flex-wrap mb-3">
              <Link to="/tag/organization" className="bg-indigo-50/50 text-indigo-600 border border-indigo-100 text-xs px-2 py-0.5 rounded-full hover:bg-indigo-100 cursor-pointer">
                #organization
              </Link>
              <Link to="/tag/pantry" className="bg-indigo-50/50 text-indigo-600 border border-indigo-100 text-xs px-2 py-0.5 rounded-full hover:bg-indigo-100 cursor-pointer">
                #pantry
              </Link>
            </div>
          </div>

          <div className="border-t border-indigo-50 px-2 py-2 flex justify-between">
            <div className="flex gap-1">
              <button 
                onClick={() => handleLike("post1")} 
                className={`${liked["post1"] ? "text-red-500" : "text-gray-500 hover:text-red-500"} hover:bg-red-50 text-sm rounded-full px-3 py-1 flex items-center gap-1.5`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked["post1"] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span>42</span>
              </button>
              <Link to="/post/1/comments" className="text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 text-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>7</span>
              </Link>
            </div>
            <button 
              onClick={() => handleSave("post1")} 
              className={`${saved["post1"] ? "text-indigo-500" : "text-gray-500 hover:text-indigo-500"} hover:bg-indigo-50 text-sm rounded-full px-3 py-1 flex items-center gap-1.5`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={saved["post1"] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Post 2 */}
        <div className="bg-white/90 backdrop-blur-lg border border-indigo-50 shadow-sm rounded-xl overflow-hidden mb-4">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Link to="/user/marcus-johnson" className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-medium">
                  MJ
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-medium text-gray-900">Marcus Johnson</h3>
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] px-1.5 py-0.5 rounded-sm">
                      Home Cook
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">5h ago</p>
                </div>
              </Link>
              <button className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
            </div>

            <p className="text-sm text-gray-700 mb-3">
              Made this amazing pasta dish with ingredients suggested by the app! The meal suggestions feature is a game changer for using up what's in your pantry. 🍝
            </p>

            <div className="flex gap-1.5 flex-wrap mb-3">
              <Link to="/tag/mealplanning" className="bg-indigo-50/50 text-indigo-600 border border-indigo-100 text-xs px-2 py-0.5 rounded-full hover:bg-indigo-100 cursor-pointer">
                #mealplanning
              </Link>
              <Link to="/tag/cooking" className="bg-indigo-50/50 text-indigo-600 border border-indigo-100 text-xs px-2 py-0.5 rounded-full hover:bg-indigo-100 cursor-pointer">
                #cooking
              </Link>
            </div>

            <Link to="/post/2" className="-mx-4 aspect-video bg-indigo-50 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9" 
                alt="Pasta dish" 
                className="w-full h-full object-cover"
              />
            </Link>
          </div>

          <div className="border-t border-indigo-50 px-2 py-2 flex justify-between">
            <div className="flex gap-1">
              <button 
                onClick={() => handleLike("post2")} 
                className={`${liked["post2"] ? "text-red-500" : "text-gray-500 hover:text-red-500"} hover:bg-red-50 text-sm rounded-full px-3 py-1 flex items-center gap-1.5`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked["post2"] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span>128</span>
              </button>
              <Link to="/post/2/comments" className="text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 text-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>23</span>
              </Link>
            </div>
            <button 
              onClick={() => handleSave("post2")} 
              className={`${saved["post2"] ? "text-indigo-500" : "text-gray-500 hover:text-indigo-500"} hover:bg-indigo-50 text-sm rounded-full px-3 py-1 flex items-center gap-1.5`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={saved["post2"] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleSocialHub;
