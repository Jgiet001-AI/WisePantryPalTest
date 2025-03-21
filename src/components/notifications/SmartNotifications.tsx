import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, Clock, AlertCircle, CheckCircle, Settings, 
  Calendar, ShoppingCart, ChefHat, Pizza, ShieldAlert,
  ArrowRight, X, Info, Filter, Bookmark, CheckCheck, Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  type: "expiry" | "meal" | "tip" | "shopping" | "system";
  title: string;
  message: string;
  date: string;
  priority: "high" | "medium" | "low";
  read: boolean;
  actionable: boolean;
  actionText?: string;
}

interface NotificationPreference {
  type: string;
  label: string;
  description: string;
  enabled: boolean;
  icon: JSX.Element;
}

export default function SmartNotifications() {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "settings">("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreference[]>([]);
  
  // Generate mock notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "expiry",
        title: "Items Expiring Soon",
        message: "Milk, spinach, and chicken breasts will expire in the next 2 days.",
        date: "Today",
        priority: "high",
        read: false,
        actionable: true,
        actionText: "View Items"
      },
      {
        id: "2",
        type: "meal",
        title: "Meal Plan Reminder",
        message: "Don't forget to prepare Vegetable Stir Fry for dinner tonight.",
        date: "Today",
        priority: "medium",
        read: false,
        actionable: true,
        actionText: "View Recipe"
      },
      {
        id: "3",
        type: "tip",
        title: "Reduce Food Waste Tip",
        message: "Freeze your herbs in olive oil ice cubes to preserve them longer.",
        date: "Yesterday",
        priority: "low",
        read: true,
        actionable: false
      },
      {
        id: "4",
        type: "shopping",
        title: "Shopping List Updated",
        message: "2 new items were added to your shopping list based on your meal plan.",
        date: "Yesterday",
        priority: "medium",
        read: true,
        actionable: true,
        actionText: "View List"
      },
      {
        id: "5",
        type: "system",
        title: "New Waste Analytics Report",
        message: "Your monthly waste reduction report is now available. You saved $23.50 this month!",
        date: "2 days ago",
        priority: "medium",
        read: true,
        actionable: true,
        actionText: "View Report"
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);
  
  // Generate notification preferences
  useEffect(() => {
    const mockPreferences: NotificationPreference[] = [
      {
        type: "expiry",
        label: "Expiry Alerts",
        description: "Get notified when items are about to expire",
        enabled: true,
        icon: <AlertCircle className="h-5 w-5 text-amber-500" />
      },
      {
        type: "meal",
        label: "Meal Reminders",
        description: "Reminders for meal prep and upcoming planned meals",
        enabled: true,
        icon: <ChefHat className="h-5 w-5 text-blue-500" />
      },
      {
        type: "shopping",
        label: "Shopping Updates",
        description: "Get notified about shopping list changes and suggestions",
        enabled: true,
        icon: <ShoppingCart className="h-5 w-5 text-emerald-500" />
      },
      {
        type: "tip",
        label: "Tips & Recommendations",
        description: "Receive tips on reducing waste and improving food storage",
        enabled: true,
        icon: <Info className="h-5 w-5 text-purple-500" />
      },
      {
        type: "system",
        label: "System Notifications",
        description: "Updates about app features and analytics reports",
        enabled: true,
        icon: <Bell className="h-5 w-5 text-gray-500" />
      }
    ];
    
    setPreferences(mockPreferences);
  }, []);
  
  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Toggle notification preferences
  const togglePreference = (type: string) => {
    setPreferences(prevPreferences => 
      prevPreferences.map(preference => 
        preference.type === type ? { ...preference, enabled: !preference.enabled } : preference
      )
    );
  };
  
  // Get filtered notifications based on active tab and selected type
  const getFilteredNotifications = () => {
    let filtered = notifications;
    
    // First filter by read/unread
    if (activeTab === "unread") {
      filtered = filtered.filter(notification => !notification.read);
    }
    
    // Then filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter(notification => notification.type === selectedType);
    }
    
    return filtered;
  };
  
  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "expiry":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "meal":
        return <ChefHat className="h-5 w-5 text-blue-500" />;
      case "shopping":
        return <ShoppingCart className="h-5 w-5 text-emerald-500" />;
      case "tip":
        return <Info className="h-5 w-5 text-purple-500" />;
      case "system":
        return <Bell className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get background color based on notification type
  const getNotificationBgColor = (type: string, read: boolean) => {
    if (read) return "bg-white/90";
    
    switch (type) {
      case "expiry":
        return "bg-amber-50/70";
      case "meal":
        return "bg-blue-50/70";
      case "shopping":
        return "bg-emerald-50/70";
      case "tip":
        return "bg-purple-50/70";
      case "system":
        return "bg-gray-50/70";
      default:
        return "bg-white/90";
    }
  };
  
  // Get border color based on notification type
  const getNotificationBorderColor = (type: string, read: boolean) => {
    if (read) return "border-gray-100";
    
    switch (type) {
      case "expiry":
        return "border-amber-100";
      case "meal":
        return "border-blue-100";
      case "shopping":
        return "border-emerald-100";
      case "tip":
        return "border-purple-100";
      case "system":
        return "border-gray-200";
      default:
        return "border-gray-100";
    }
  };
  
  // Count unread notifications
  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };
  
  return (
    <div className="max-w-4xl mx-auto pb-6">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
          {getUnreadCount() > 0 && (
            <Badge className="bg-red-500 text-white">{getUnreadCount()}</Badge>
          )}
        </div>
        <div className="flex items-center">
          <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-full flex overflow-hidden">
            <Button 
              variant="ghost" 
              onClick={() => setActiveTab("all")}
              className={`rounded-full px-4 ${activeTab === "all" ? "bg-emerald-500 text-white" : "text-gray-600"}`}
            >
              <Bell className="h-4 w-4 mr-2" />
              All
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setActiveTab("unread")}
              className={`rounded-full px-4 ${activeTab === "unread" ? "bg-emerald-500 text-white" : "text-gray-600"}`}
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Unread
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setActiveTab("settings")}
              className={`rounded-full px-4 ${activeTab === "settings" ? "bg-emerald-500 text-white" : "text-gray-600"}`}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>
      
      {(activeTab === "all" || activeTab === "unread") && (
        <>
          {/* Category Filters */}
          <div className="mb-4 overflow-x-auto -mx-2 px-2 scrollbar-hide">
            <div className="flex gap-2 pb-1">
              <Button 
                variant="outline" 
                onClick={() => setSelectedType("all")}
                className={`whitespace-nowrap rounded-full ${
                  selectedType === "all" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                    : "bg-white/80 backdrop-blur-lg border-gray-100"
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                All Types
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setSelectedType("expiry")}
                className={`whitespace-nowrap rounded-full ${
                  selectedType === "expiry" 
                    ? "bg-amber-50 text-amber-700 border-amber-200" 
                    : "bg-white/80 backdrop-blur-lg border-gray-100"
                }`}
              >
                <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                Expiry
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setSelectedType("meal")}
                className={`whitespace-nowrap rounded-full ${
                  selectedType === "meal" 
                    ? "bg-blue-50 text-blue-700 border-blue-200" 
                    : "bg-white/80 backdrop-blur-lg border-gray-100"
                }`}
              >
                <ChefHat className="h-4 w-4 mr-2 text-blue-500" />
                Meals
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setSelectedType("shopping")}
                className={`whitespace-nowrap rounded-full ${
                  selectedType === "shopping" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                    : "bg-white/80 backdrop-blur-lg border-gray-100"
                }`}
              >
                <ShoppingCart className="h-4 w-4 mr-2 text-emerald-500" />
                Shopping
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setSelectedType("tip")}
                className={`whitespace-nowrap rounded-full ${
                  selectedType === "tip" 
                    ? "bg-purple-50 text-purple-700 border-purple-200" 
                    : "bg-white/80 backdrop-blur-lg border-gray-100"
                }`}
              >
                <Info className="h-4 w-4 mr-2 text-purple-500" />
                Tips
              </Button>
            </div>
          </div>
          
          {/* Actions Row */}
          {getFilteredNotifications().length > 0 && (
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                {getFilteredNotifications().length} {getFilteredNotifications().length === 1 ? 'notification' : 'notifications'}
              </span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 rounded-full text-gray-600"
                  onClick={markAllAsRead}
                >
                  <CheckCheck className="h-3.5 w-3.5 mr-1.5" />
                  Mark all as read
                </Button>
              </div>
            </div>
          )}
          
          {/* Notifications List */}
          <AnimatePresence mode="popLayout">
            {getFilteredNotifications().length > 0 ? (
              <div className="space-y-3">
                {getFilteredNotifications().map(notification => (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className={`backdrop-blur-lg overflow-hidden shadow-sm ${
                      getNotificationBgColor(notification.type, notification.read)
                    } border ${
                      getNotificationBorderColor(notification.type, notification.read)
                    }`}>
                      <CardContent className="p-0">
                        {/* Priority Indicator Bar */}
                        {notification.priority === "high" && (
                          <div className="h-1 w-full bg-red-500"></div>
                        )}
                        {notification.priority === "medium" && (
                          <div className="h-1 w-full bg-amber-400"></div>
                        )}
                        
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex flex-1">
                              <div className="flex-shrink-0 mr-3 pt-0.5">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <div className="flex items-center gap-2">
                                    <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                      {notification.title}
                                    </h3>
                                    {!notification.read && (
                                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    )}
                                    {notification.priority === "high" && (
                                      <Badge className="bg-red-100 text-red-800 text-xs rounded-full">High</Badge>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-500 ml-2">{notification.date}</span>
                                </div>
                                <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                                  {notification.message}
                                </p>
                                
                                <div className="mt-3 flex items-center justify-between">
                                  {notification.actionable ? (
                                    <Button variant="outline" size="sm" className="h-8 rounded-full">
                                      {notification.actionText}
                                      <ArrowRight className="h-3 w-3 ml-1" />
                                    </Button>
                                  ) : <div></div>}
                                  
                                  <div className="flex items-center gap-1">
                                    {!notification.read && (
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 w-8 p-0 rounded-full" 
                                        onClick={() => markAsRead(notification.id)}
                                      >
                                        <CheckCheck className="h-4 w-4 text-emerald-500" />
                                      </Button>
                                    )}
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0 rounded-full" 
                                      onClick={() => deleteNotification(notification.id)}
                                    >
                                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="backdrop-blur-lg bg-white/80 shadow-sm border border-gray-100">
                <CardContent className="py-12 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-gray-800 font-medium text-lg mb-1">All caught up!</h3>
                  <p className="text-gray-500 text-sm max-w-md text-center">
                    {activeTab === "unread" 
                      ? "You have no unread notifications. Check 'All' to see your notification history." 
                      : "You don't have any notifications yet."}
                  </p>
                </CardContent>
              </Card>
            )}
          </AnimatePresence>
        </>
      )}
      
      {activeTab === "settings" && (
        <Card className="backdrop-blur-lg bg-white/80 shadow-sm border border-gray-100">
          {/* Settings Header */}
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Notification Preferences</CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Notification Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preferences.map(preference => (
                  <Card key={preference.type} className="border border-gray-100 bg-white/70">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="mt-0.5">
                            {preference.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{preference.label}</h3>
                            <p className="text-sm text-gray-500">{preference.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={preference.enabled}
                          onCheckedChange={() => togglePreference(preference.type)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Advanced Settings */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-medium mb-4">Advanced Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-gray-100 bg-white/70">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notification Timing</p>
                          <p className="text-xs text-gray-500">When to send expiry notifications</p>
                        </div>
                        <Button variant="outline" className="text-xs h-8 rounded-full">
                          3 days before
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-100 bg-white/70">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Quiet Hours</p>
                          <p className="text-xs text-gray-500">No notifications during these hours</p>
                        </div>
                        <Button variant="outline" className="text-xs h-8 rounded-full">
                          <Clock className="h-3 w-3 mr-1" />
                          10 PM - 7 AM
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-100 bg-white/70">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Daily Digest</p>
                          <p className="text-xs text-gray-500">Send a daily summary instead of individual alerts</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Permission Alert */}
              <Card className="backdrop-blur-lg bg-amber-50/80 border border-amber-100">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <ShieldAlert className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-amber-800">Permission Required</h3>
                      <p className="text-xs text-amber-700 mt-1">
                        To receive notifications, please ensure you've enabled them in your device settings.
                      </p>
                      <Button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white h-8 text-xs rounded-full">
                        Enable Notifications
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Smart Suggestions Card */}
      {(activeTab === "all" || activeTab === "unread") && getFilteredNotifications().length > 0 && (
        <div className="mt-6">
          <Card className="backdrop-blur-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md border-none">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Smart Notification Insights</h3>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 flex items-center min-w-[250px] bg-white/10 rounded-lg p-3">
                  <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <Pizza className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      Based on your habits, we notice you cook most often on Sundays.
                    </p>
                    <Button variant="link" className="text-sm h-auto p-0 text-white font-medium hover:text-white/80">
                      Set a weekly prep reminder
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center min-w-[250px] bg-white/10 rounded-lg p-3">
                  <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      You respond best to expiry notifications 3 days in advance.
                    </p>
                    <Button variant="link" className="text-sm h-auto p-0 text-white font-medium hover:text-white/80">
                      Adjust timings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
