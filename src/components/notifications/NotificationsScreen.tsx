import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  colors,
  spacing,
  shadows,
  borderRadius
} from '../ui/KitchenStoriesDesign';
import { ArrowLeft, Bell, Check, Trash2, Settings, Filter } from 'lucide-react';
import { useNotifications, NotificationType } from '../../contexts/NotificationContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Get icon based on notification type
const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'expiration':
      return '🕒';
    case 'recipe':
      return '🍳';
    case 'shopping':
      return '🛒';
    case 'social':
      return '👋';
    case 'price':
      return '💰';
    case 'mealplan':
      return '📅';
    case 'system':
      return '⚙️';
    default:
      return '📣';
  }
};

// Format timestamp
const formatTimestamp = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    clearAllNotifications
  } = useNotifications();
  
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Filter notifications based on active filter
  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.isRead;
    return notification.type === activeFilter;
  });

  const handleNotificationClick = (id: string, actionUrl?: string) => {
    markAsRead(id);
    if (actionUrl) {
      navigate(actionUrl);
    }
  };

  // Get count of each notification type
  const getTypeCount = (type: string) => {
    return notifications.filter(n => 
      type === 'unread' ? !n.isRead : n.type === type
    ).length;
  };

  return (
    <Container
      padding={spacing.md}
      style={{
        maxWidth: '100%',
        height: '100vh',
        overflowY: 'auto',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,245,255,0.85))',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Header */}
      <Flex justify="space-between" align="center" style={{ marginBottom: spacing.md }}>
        <Flex align="center" gap={spacing.sm}>
          <div 
            onClick={() => navigate(-1)} 
            style={{ 
              cursor: 'pointer',
              padding: spacing.xs,
              borderRadius: borderRadius.full,
              backgroundColor: 'rgba(255,255,255,0.8)',
            }}
          >
            <ArrowLeft size={24} color={colors.textPrimary} />
          </div>
          <Text variant="h1" style={{ margin: 0 }}>Notifications</Text>
        </Flex>
        <Flex gap={spacing.sm}>
          <div 
            onClick={() => markAllAsRead()} 
            style={{ 
              cursor: 'pointer',
              padding: spacing.xs,
              borderRadius: borderRadius.full,
              backgroundColor: 'rgba(255,255,255,0.8)',
            }}
          >
            <Check size={24} color={colors.success} />
          </div>
          <div 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
            style={{ 
              cursor: 'pointer',
              padding: spacing.xs,
              borderRadius: borderRadius.full,
              backgroundColor: 'rgba(255,255,255,0.8)',
            }}
          >
            <Settings size={24} color={colors.textPrimary} />
          </div>
        </Flex>
      </Flex>

      {/* Settings Panel (conditionally rendered) */}
      {isSettingsOpen && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: borderRadius.lg,
          padding: spacing.md,
          marginBottom: spacing.md,
          boxShadow: shadows.md,
        }}>
          <Text variant="h3" style={{ marginBottom: spacing.sm }}>Notification Settings</Text>
          
          <div style={{ marginBottom: spacing.md }}>
            <Text variant="body1" style={{ fontWeight: 'bold', marginBottom: spacing.xs }}>
              Smart Expiry Notifications
            </Text>
            <Flex justify="space-between" align="center">
              <Text variant="body2">Notify me when items are about to expire</Text>
              <div style={{
                width: '50px',
                height: '26px',
                backgroundColor: colors.primary,
                borderRadius: '13px',
                position: 'relative',
                cursor: 'pointer',
              }}>
                <div style={{
                  position: 'absolute',
                  right: '4px',
                  top: '3px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease',
                }}/>
              </div>
            </Flex>
          </div>
          
          <div style={{ marginBottom: spacing.md }}>
            <Text variant="body1" style={{ fontWeight: 'bold', marginBottom: spacing.xs }}>
              Recipe Recommendations
            </Text>
            <Flex justify="space-between" align="center">
              <Text variant="body2">Suggest recipes based on expiring ingredients</Text>
              <div style={{
                width: '50px',
                height: '26px',
                backgroundColor: colors.primary,
                borderRadius: '13px',
                position: 'relative',
                cursor: 'pointer',
              }}>
                <div style={{
                  position: 'absolute',
                  right: '4px',
                  top: '3px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease',
                }}/>
              </div>
            </Flex>
          </div>
          
          <div style={{ marginBottom: spacing.md }}>
            <Text variant="body1" style={{ fontWeight: 'bold', marginBottom: spacing.xs }}>
              Price Drop Alerts
            </Text>
            <Flex justify="space-between" align="center">
              <Text variant="body2">Alert me about deals on items I track</Text>
              <div style={{
                width: '50px',
                height: '26px',
                backgroundColor: colors.primary,
                borderRadius: '13px',
                position: 'relative',
                cursor: 'pointer',
              }}>
                <div style={{
                  position: 'absolute',
                  right: '4px',
                  top: '3px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease',
                }}/>
              </div>
            </Flex>
          </div>
          
          <Button 
            onClick={() => clearAllNotifications()}
            style={{
              backgroundColor: colors.error,
              color: 'white',
              width: '100%',
            }}
          >
            Clear All Notifications
          </Button>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ overflowX: 'auto', marginBottom: spacing.md }}>
        <Flex gap={spacing.xs} style={{ minWidth: 'max-content' }}>
          <div 
            onClick={() => setActiveFilter('all')}
            style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              borderRadius: borderRadius.full,
              backgroundColor: activeFilter === 'all' ? colors.primary : 'white',
              color: activeFilter === 'all' ? 'white' : colors.textPrimary,
              cursor: 'pointer',
              fontSize: '14px',
              boxShadow: shadows.sm,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}
          >
            <Bell size={16} />
            <span>All ({notifications.length})</span>
          </div>
          
          <div 
            onClick={() => setActiveFilter('unread')}
            style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              borderRadius: borderRadius.full,
              backgroundColor: activeFilter === 'unread' ? colors.primary : 'white',
              color: activeFilter === 'unread' ? 'white' : colors.textPrimary,
              cursor: 'pointer',
              fontSize: '14px',
              boxShadow: shadows.sm,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}
          >
            <Filter size={16} />
            <span>Unread ({getTypeCount('unread')})</span>
          </div>
          
          <div 
            onClick={() => setActiveFilter('expiration')}
            style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              borderRadius: borderRadius.full,
              backgroundColor: activeFilter === 'expiration' ? colors.primary : 'white',
              color: activeFilter === 'expiration' ? 'white' : colors.textPrimary,
              cursor: 'pointer',
              fontSize: '14px',
              boxShadow: shadows.sm,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}
          >
            <span>🕒</span>
            <span>Expiry ({getTypeCount('expiration')})</span>
          </div>
          
          <div 
            onClick={() => setActiveFilter('recipe')}
            style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              borderRadius: borderRadius.full,
              backgroundColor: activeFilter === 'recipe' ? colors.primary : 'white',
              color: activeFilter === 'recipe' ? 'white' : colors.textPrimary,
              cursor: 'pointer',
              fontSize: '14px',
              boxShadow: shadows.sm,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}
          >
            <span>🍳</span>
            <span>Recipes ({getTypeCount('recipe')})</span>
          </div>
          
          <div 
            onClick={() => setActiveFilter('price')}
            style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              borderRadius: borderRadius.full,
              backgroundColor: activeFilter === 'price' ? colors.primary : 'white',
              color: activeFilter === 'price' ? 'white' : colors.textPrimary,
              cursor: 'pointer',
              fontSize: '14px',
              boxShadow: shadows.sm,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
            }}
          >
            <span>💰</span>
            <span>Deals ({getTypeCount('price')})</span>
          </div>
        </Flex>
      </div>

      {/* Notifications List */}
      <div style={{ marginBottom: spacing.xl }}>
        {filteredNotifications.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: `${spacing.xl} 0`,
            color: colors.textSecondary,
          }}>
            <Bell size={48} color={colors.midGray} style={{ margin: '0 auto', marginBottom: spacing.md }} />
            <Text variant="h3">No notifications</Text>
            <Text variant="body2">You're all caught up!</Text>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id, notification.actionUrl)}
              style={{
                backgroundColor: notification.isRead ? 'white' : 'rgba(240, 248, 255, 0.8)',
                padding: spacing.md,
                borderRadius: borderRadius.lg,
                marginBottom: spacing.sm,
                cursor: 'pointer',
                boxShadow: shadows.sm,
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              <Flex gap={spacing.md}>
                {/* Icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(240, 240, 240, 0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '24px',
                  flexShrink: 0,
                }}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <Flex justify="space-between" align="center" style={{ marginBottom: spacing.xs }}>
                    <Text 
                      variant="body1" 
                      style={{ 
                        fontWeight: notification.isRead ? 'normal' : 'bold',
                        margin: 0
                      }}
                    >
                      {notification.title}
                    </Text>
                    <Text 
                      variant="caption" 
                      style={{ 
                        color: colors.midGray,
                        fontSize: '12px',
                      }}
                    >
                      {formatTimestamp(notification.timestamp)}
                    </Text>
                  </Flex>
                  
                  <Text 
                    variant="body2" 
                    style={{ 
                      color: colors.textSecondary,
                      margin: 0
                    }}
                  >
                    {notification.message}
                  </Text>
                  
                  {/* Image preview if available */}
                  {notification.image && (
                    <div style={{
                      marginTop: spacing.sm,
                      width: '100%',
                      height: '120px',
                      borderRadius: borderRadius.md,
                      backgroundColor: '#f0f0f0',
                      backgroundImage: `url(${notification.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                  )}
                  
                  {/* Action button if available */}
                  {notification.actionUrl && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotificationClick(notification.id, notification.actionUrl);
                      }}
                      style={{
                        marginTop: spacing.sm,
                        backgroundColor: colors.primary,
                        color: 'white',
                        padding: `${spacing.xs} ${spacing.sm}`,
                        fontSize: '14px',
                      }}
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </Flex>
              
              {/* Delete button */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }}
                style={{
                  position: 'absolute',
                  top: spacing.sm,
                  right: spacing.sm,
                  padding: spacing.xs,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(240, 240, 240, 0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Trash2 size={16} color={colors.midGray} />
              </div>
            </div>
          ))
        )}
      </div>
    </Container>
  );
}
