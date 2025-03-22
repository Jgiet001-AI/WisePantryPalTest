import { useState, useEffect } from 'react';
import { Bell, BellOff, Check, X, Settings, AlertTriangle, MessageSquare, Info } from 'lucide-react';
import { useNotifications, Notification, NotificationPreference } from './NotificationService';
import {
  Container,
  Text,
  Flex,
  colors,
  spacing,
  shadows,
  borderRadius,
  animation
} from '../ui/KitchenStoriesDesign';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'notifications' | 'preferences'>('notifications');
  const {
    notifications,
    preferences,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
    updatePreferences
  } = useNotifications();

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    // Handle action URL if present
    if (notification.actionUrl) {
      // In a real app, we would use router.push or similar
      window.location.href = notification.actionUrl;
    }
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'expiry':
        return <AlertTriangle size={18} color={colors.warning} />;
      case 'suggestion':
        return <MessageSquare size={18} color={colors.primary} />;
      case 'social':
        return <MessageSquare size={18} color={colors.secondary} />;
      case 'system':
      default:
        return <Info size={18} color={colors.info} />;
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Notification Bell */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          borderRadius: borderRadius.full,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isOpen ? 'rgba(240, 245, 255, 0.8)' : 'transparent',
          transition: `all ${animation.fast} ${animation.easing}`
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = 'rgba(240, 245, 255, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <Bell size={24} color={colors.textSecondary} />
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            backgroundColor: colors.primary,
            color: colors.white,
            borderRadius: borderRadius.full,
            fontSize: '12px',
            fontWeight: 600,
            minWidth: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </div>

      {/* Notification Panel */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '20px',
          width: '350px',
          maxHeight: '80vh',
          overflowY: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: borderRadius.lg,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          border: '1px solid rgba(230, 235, 245, 0.8)'
        }}>
          {/* Header */}
          <Flex 
            justify="space-between" 
            align="center"
            style={{ 
              padding: spacing.md,
              borderBottom: '1px solid rgba(230, 235, 245, 0.8)'
            }}
          >
            <Text variant="h3">
              {activeTab === 'notifications' ? 'Notifications' : 'Preferences'}
            </Text>
            <Flex gap={spacing.sm}>
              <div
                onClick={() => setActiveTab(activeTab === 'notifications' ? 'preferences' : 'notifications')}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: borderRadius.full,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(240, 245, 255, 0.8)',
                  cursor: 'pointer'
                }}
              >
                {activeTab === 'notifications' ? <Settings size={18} /> : <Bell size={18} />}
              </div>
              <div
                onClick={() => setIsOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: borderRadius.full,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(240, 245, 255, 0.8)',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </div>
            </Flex>
          </Flex>

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              {/* Actions */}
              {notifications.length > 0 && (
                <Flex 
                  justify="space-between" 
                  align="center"
                  style={{ 
                    padding: `${spacing.sm} ${spacing.md}`,
                    borderBottom: '1px solid rgba(230, 235, 245, 0.8)'
                  }}
                >
                  <Button
                    onClick={markAllAsRead}
                    variant="ghost"
                    size="sm"
                    style={{ fontSize: '12px' }}
                  >
                    Mark all as read
                  </Button>
                  <Button
                    onClick={clearAllNotifications}
                    variant="ghost"
                    size="sm"
                    style={{ fontSize: '12px' }}
                  >
                    Clear all
                  </Button>
                </Flex>
              )}

              {/* Notification List */}
              <div style={{ padding: spacing.sm }}>
                {notifications.length === 0 ? (
                  <div style={{ 
                    padding: spacing.xl,
                    textAlign: 'center',
                    color: colors.textSecondary
                  }}>
                    <BellOff size={32} style={{ margin: '0 auto', marginBottom: spacing.md, opacity: 0.5 }} />
                    <Text variant="body1">No notifications yet</Text>
                    <Text variant="caption" style={{ marginTop: spacing.sm }}>
                      We'll notify you about expiring items and other important updates
                    </Text>
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      style={{
                        padding: spacing.md,
                        marginBottom: spacing.sm,
                        backgroundColor: notification.read ? 'transparent' : 'rgba(240, 245, 255, 0.5)',
                        borderRadius: borderRadius.md,
                        cursor: 'pointer',
                        transition: `all ${animation.fast} ${animation.easing}`,
                        position: 'relative',
                        borderLeft: notification.read ? 'none' : `3px solid ${colors.primary}`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(240, 245, 255, 0.8)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = notification.read ? 'transparent' : 'rgba(240, 245, 255, 0.5)';
                      }}
                    >
                      <Flex align="start" gap={spacing.sm}>
                        <div style={{ marginTop: '2px' }}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <Text 
                            variant="body2" 
                            style={{ 
                              fontWeight: notification.read ? 400 : 600,
                              marginBottom: '2px'
                            }}
                          >
                            {notification.title}
                          </Text>
                          <Text variant="caption" style={{ color: colors.textSecondary }}>
                            {notification.message}
                          </Text>
                          <Text 
                            variant="caption" 
                            style={{ 
                              color: colors.textTertiary,
                              fontSize: '11px',
                              marginTop: '4px',
                              display: 'block'
                            }}
                          >
                            {formatTime(notification.timestamp)}
                          </Text>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(notification.id);
                          }}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: borderRadius.full,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0.5,
                            transition: `all ${animation.fast} ${animation.easing}`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = 1;
                            e.currentTarget.style.backgroundColor = 'rgba(240, 245, 255, 0.8)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = 0.5;
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <X size={14} />
                        </div>
                      </Flex>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div style={{ padding: spacing.md }}>
              <div style={{ marginBottom: spacing.lg }}>
                <Text variant="h4" style={{ marginBottom: spacing.sm }}>Expiry Alerts</Text>
                <Text variant="caption" style={{ color: colors.textSecondary, marginBottom: spacing.md, display: 'block' }}>
                  Get notified when items are about to expire
                </Text>
                
                <div style={{ marginBottom: spacing.md }}>
                  <Flex justify="space-between" align="center" style={{ marginBottom: spacing.xs }}>
                    <Text variant="body2">1 day before expiry</Text>
                    <Switch 
                      checked={preferences.expiryAlertDays.includes(1)}
                      onCheckedChange={(checked) => {
                        const newDays = checked 
                          ? [...preferences.expiryAlertDays, 1].sort((a, b) => a - b)
                          : preferences.expiryAlertDays.filter(d => d !== 1);
                        updatePreferences({ expiryAlertDays: newDays });
                      }}
                    />
                  </Flex>
                  <Flex justify="space-between" align="center" style={{ marginBottom: spacing.xs }}>
                    <Text variant="body2">3 days before expiry</Text>
                    <Switch 
                      checked={preferences.expiryAlertDays.includes(3)}
                      onCheckedChange={(checked) => {
                        const newDays = checked 
                          ? [...preferences.expiryAlertDays, 3].sort((a, b) => a - b)
                          : preferences.expiryAlertDays.filter(d => d !== 3);
                        updatePreferences({ expiryAlertDays: newDays });
                      }}
                    />
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Text variant="body2">7 days before expiry</Text>
                    <Switch 
                      checked={preferences.expiryAlertDays.includes(7)}
                      onCheckedChange={(checked) => {
                        const newDays = checked 
                          ? [...preferences.expiryAlertDays, 7].sort((a, b) => a - b)
                          : preferences.expiryAlertDays.filter(d => d !== 7);
                        updatePreferences({ expiryAlertDays: newDays });
                      }}
                    />
                  </Flex>
                </div>
              </div>

              <div style={{ marginBottom: spacing.lg }}>
                <Text variant="h4" style={{ marginBottom: spacing.sm }}>Digest & Reminders</Text>
                
                <Flex justify="space-between" align="center" style={{ marginBottom: spacing.md }}>
                  <div>
                    <Text variant="body2">Weekly Digest</Text>
                    <Text variant="caption" style={{ color: colors.textSecondary }}>
                      Summary of expiring items each week
                    </Text>
                  </div>
                  <Switch 
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(checked) => {
                      updatePreferences({ weeklyDigest: checked });
                    }}
                  />
                </Flex>
                
                <Flex justify="space-between" align="center">
                  <div>
                    <Text variant="body2">Daily Reminders</Text>
                    <Text variant="caption" style={{ color: colors.textSecondary }}>
                      Reminder for items expiring today
                    </Text>
                  </div>
                  <Switch 
                    checked={preferences.dailyReminders}
                    onCheckedChange={(checked) => {
                      updatePreferences({ dailyReminders: checked });
                    }}
                  />
                </Flex>
              </div>

              <div>
                <Flex justify="space-between" align="center" style={{ marginBottom: spacing.sm }}>
                  <Text variant="h4">Quiet Hours</Text>
                  <Switch 
                    checked={preferences.quietHours.enabled}
                    onCheckedChange={(checked) => {
                      updatePreferences({ 
                        quietHours: { 
                          ...preferences.quietHours, 
                          enabled: checked 
                        } 
                      });
                    }}
                  />
                </Flex>
                
                <Text 
                  variant="caption" 
                  style={{ 
                    color: colors.textSecondary, 
                    marginBottom: spacing.md,
                    display: 'block',
                    opacity: preferences.quietHours.enabled ? 1 : 0.5
                  }}
                >
                  Don't send notifications during these hours
                </Text>
                
                <Flex justify="space-between" align="center" style={{ opacity: preferences.quietHours.enabled ? 1 : 0.5 }}>
                  <div>
                    <Text variant="body2">From</Text>
                    <input 
                      type="time" 
                      value={preferences.quietHours.start}
                      onChange={(e) => {
                        updatePreferences({ 
                          quietHours: { 
                            ...preferences.quietHours, 
                            start: e.target.value 
                          } 
                        });
                      }}
                      disabled={!preferences.quietHours.enabled}
                      style={{
                        border: '1px solid rgba(230, 235, 245, 0.8)',
                        borderRadius: borderRadius.md,
                        padding: spacing.xs,
                        marginTop: spacing.xs
                      }}
                    />
                  </div>
                  <div>
                    <Text variant="body2">To</Text>
                    <input 
                      type="time" 
                      value={preferences.quietHours.end}
                      onChange={(e) => {
                        updatePreferences({ 
                          quietHours: { 
                            ...preferences.quietHours, 
                            end: e.target.value 
                          } 
                        });
                      }}
                      disabled={!preferences.quietHours.enabled}
                      style={{
                        border: '1px solid rgba(230, 235, 245, 0.8)',
                        borderRadius: borderRadius.md,
                        padding: spacing.xs,
                        marginTop: spacing.xs
                      }}
                    />
                  </div>
                </Flex>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
