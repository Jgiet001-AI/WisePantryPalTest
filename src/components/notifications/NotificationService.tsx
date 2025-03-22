import { useState, useEffect } from 'react';
import { PantryItem } from '@/types/pantry';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type NotificationPreference = {
  expiryAlertDays: number[];  // Days before expiry to send alerts [3, 5, 7]
  weeklyDigest: boolean;      // Send weekly digest of expiring items
  dailyReminders: boolean;    // Daily reminders for items expiring that day
  quietHours: {
    enabled: boolean;
    start: string;  // Format: "HH:MM" (24-hour)
    end: string;    // Format: "HH:MM" (24-hour)
  };
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'expiry' | 'suggestion' | 'system' | 'social';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  itemId?: string;
};

const defaultPreferences: NotificationPreference = {
  expiryAlertDays: [1, 3, 7],
  weeklyDigest: true,
  dailyReminders: true,
  quietHours: {
    enabled: true,
    start: "22:00",
    end: "08:00"
  }
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('pantry-notifications', []);
  const [preferences, setPreferences] = useLocalStorage<NotificationPreference>('notification-preferences', defaultPreferences);
  
  // Check for expiring items and create notifications
  const checkExpiringItems = (pantryItems: PantryItem[]) => {
    const currentDate = new Date();
    const newNotifications: Notification[] = [];
    
    pantryItems.forEach(item => {
      const daysUntilExpiry = Math.ceil((item.expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Check if we should notify based on preferences
      if (preferences.expiryAlertDays.includes(daysUntilExpiry)) {
        const notification: Notification = {
          id: `expiry-${item.id}-${daysUntilExpiry}`,
          title: `${item.name} Expiring Soon`,
          message: daysUntilExpiry === 1 
            ? `${item.name} expires tomorrow!` 
            : `${item.name} expires in ${daysUntilExpiry} days.`,
          type: 'expiry',
          timestamp: new Date(),
          read: false,
          itemId: item.id
        };
        
        // Only add if we don't already have this notification
        if (!notifications.some(n => n.id === notification.id)) {
          newNotifications.push(notification);
        }
      }
    });
    
    if (newNotifications.length > 0) {
      setNotifications([...notifications, ...newNotifications]);
      // In a real app, we would also trigger system notifications here
    }
  };
  
  // Mark notification as read
  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Clear a notification
  const clearNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };
  
  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  // Update notification preferences
  const updatePreferences = (newPreferences: Partial<NotificationPreference>) => {
    setPreferences({ ...preferences, ...newPreferences });
  };
  
  // Generate weekly digest
  const generateWeeklyDigest = (pantryItems: PantryItem[]) => {
    if (!preferences.weeklyDigest) return;
    
    const currentDate = new Date();
    const expiringThisWeek = pantryItems.filter(item => {
      const daysUntilExpiry = Math.ceil((item.expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
    });
    
    if (expiringThisWeek.length > 0) {
      const digestNotification: Notification = {
        id: `weekly-digest-${new Date().toISOString().split('T')[0]}`,
        title: "Weekly Pantry Digest",
        message: `You have ${expiringThisWeek.length} items expiring this week.`,
        type: 'system',
        timestamp: new Date(),
        read: false,
        actionUrl: '/pantry'
      };
      
      // Only add if we don't already have this week's digest
      if (!notifications.some(n => n.id === digestNotification.id)) {
        setNotifications([...notifications, digestNotification]);
      }
    }
  };
  
  return {
    notifications,
    preferences,
    checkExpiringItems,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
    updatePreferences,
    generateWeeklyDigest
  };
};
