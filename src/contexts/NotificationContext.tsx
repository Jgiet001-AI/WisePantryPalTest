import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Notification types
export type NotificationType = 
  | 'expiration' 
  | 'recipe' 
  | 'shopping' 
  | 'social' 
  | 'price' 
  | 'mealplan'
  | 'system';

// Notification priority levels
export type NotificationPriority = 'high' | 'medium' | 'low';

// Notification object structure
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: NotificationPriority;
  actionUrl?: string;
  image?: string;
  relatedItemId?: string;
}

// Context interface
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

// Create the context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider props
interface NotificationProviderProps {
  children: ReactNode;
}

// Sample mock notifications for testing
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'expiration',
    title: 'Items Expiring Soon',
    message: 'Milk and eggs will expire in 2 days. Consider using them soon!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: false,
    priority: 'high',
    actionUrl: '/pantry',
  },
  {
    id: '2',
    type: 'recipe',
    title: 'New Recipe Recommendation',
    message: 'Try this Spinach and Feta Omelette with your expiring eggs!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
    priority: 'medium',
    actionUrl: '/recipes/spinach-feta-omelette',
    image: '/images/recipes/omelette.jpg',
  },
  {
    id: '3',
    type: 'shopping',
    title: 'Shopping List Updated',
    message: 'Your weekly shopping list has been automatically updated based on your meal plan.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
    priority: 'medium',
    actionUrl: '/shopping-list',
  },
  {
    id: '4',
    type: 'price',
    title: 'Price Drop Alert',
    message: 'Organic chicken breast is on sale at Whole Foods (20% off)!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    isRead: true,
    priority: 'medium',
    actionUrl: '/price-comparison',
  },
  {
    id: '5',
    type: 'social',
    title: 'Recipe Shared With You',
    message: 'Alex shared their Homemade Pizza recipe with you!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    isRead: true,
    priority: 'low',
    actionUrl: '/recipes/shared',
    image: '/images/recipes/pizza.jpg',
  },
];

// Provider component
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Update unread count whenever notifications change
  useEffect(() => {
    const count = notifications.filter(notification => !notification.isRead).length;
    setUnreadCount(count);
    
    // You could also update browser tab notification here
    if (count > 0) {
      document.title = `(${count}) WisePantryPal`;
    } else {
      document.title = 'WisePantryPal';
    }
  }, [notifications]);

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Could trigger sound or browser notification here
    if (Notification.permission === 'granted' && notification.priority === 'high') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/logo.png',
      });
    }
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Request notification permissions on component mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
