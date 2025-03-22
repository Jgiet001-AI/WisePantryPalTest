import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Check, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { 
  colors, 
  spacing, 
  shadows, 
  borderRadius, 
  animation 
} from '../ui/KitchenStoriesDesign';
import { useNotifications, Notification, NotificationType } from '../../contexts/NotificationContext';

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

// Get background color based on notification type
const getNotificationColor = (type: NotificationType, isRead: boolean) => {
  if (isRead) return 'rgba(245, 247, 250, 0.5)';
  
  switch (type) {
    case 'expiration':
      return 'rgba(255, 200, 200, 0.2)';
    case 'recipe':
      return 'rgba(200, 255, 200, 0.2)';
    case 'shopping':
      return 'rgba(200, 200, 255, 0.2)';
    case 'social':
      return 'rgba(255, 200, 255, 0.2)';
    case 'price':
      return 'rgba(255, 255, 200, 0.2)';
    case 'mealplan':
      return 'rgba(200, 255, 255, 0.2)';
    default:
      return 'rgba(240, 240, 240, 0.5)';
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

// Notification Bell Component
const NotificationBell: React.FC = () => {
  const navigate = useNavigate();
  const bellRef = useRef<HTMLDivElement>(null);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  // Update dropdown position when bell is clicked
  useEffect(() => {
    if (isOpen && bellRef.current) {
      const rect = bellRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 5,
        right: window.innerWidth - rect.right - window.scrollX
      });
    }
  }, [isOpen]);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    setIsOpen(false);
  };

  const handleViewAll = () => {
    navigate('/notifications');
    setIsOpen(false);
  };

  // Create portal for dropdown to ensure it's not constrained by parent containers
  const renderDropdown = () => {
    if (!isOpen) return null;
    
    return createPortal(
      <div 
        style={{
          position: 'fixed',
          top: `${dropdownPosition.top}px`,
          right: `${dropdownPosition.right}px`,
          width: '320px',
          maxHeight: '400px',
          backgroundColor: 'white',
          borderRadius: borderRadius.md,
          boxShadow: shadows.lg,
          zIndex: 9999,
          overflow: 'hidden',
          animation: `${animation.medium} ${animation.easing}`,
          transition: `all ${animation.medium} ${animation.easing}`,
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: spacing.sm,
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ margin: 0 }}>Notifications</h3>
          {unreadCount > 0 && (
            <div 
              onClick={markAllAsRead}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
                fontSize: '14px',
                color: colors.primary,
                cursor: 'pointer',
              }}
            >
              <Check size={16} />
              <span>Mark all as read</span>
            </div>
          )}
        </div>

        {/* Notification List */}
        <div style={{
          maxHeight: '300px',
          overflowY: 'auto',
        }}>
          {notifications.length === 0 ? (
            <div style={{
              padding: spacing.md,
              textAlign: 'center',
              color: colors.midGray,
            }}>
              No notifications
            </div>
          ) : (
            notifications.slice(0, 5).map(notification => (
              <div 
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                style={{
                  padding: spacing.sm,
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                  backgroundColor: getNotificationColor(notification.type, notification.isRead),
                  cursor: 'pointer',
                  position: 'relative',
                  transition: `background-color ${animation.medium} ${animation.easing}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.sm }}>
                  <div style={{ 
                    fontSize: '20px',
                    marginTop: '2px'
                  }}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontWeight: notification.isRead ? 'normal' : 'bold',
                      marginBottom: '4px',
                      color: colors.textPrimary
                    }}>
                      {notification.title}
                    </div>
                    <div style={{ 
                      fontSize: '14px',
                      color: colors.textSecondary,
                      marginBottom: '4px'
                    }}>
                      {notification.message}
                    </div>
                    <div style={{ 
                      fontSize: '12px',
                      color: colors.midGray
                    }}>
                      {formatTimestamp(notification.timestamp)}
                    </div>
                  </div>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    style={{
                      padding: '4px',
                      cursor: 'pointer',
                      color: colors.midGray,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <X size={16} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div 
          onClick={handleViewAll}
          style={{
            padding: spacing.sm,
            textAlign: 'center',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            color: colors.primary,
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.xs
          }}
        >
          <span>View All</span>
          <ChevronRight size={16} />
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div style={{ position: 'relative' }} ref={bellRef}>
      {/* Bell Icon */}
      <div 
        onClick={toggleNotifications}
        style={{
          position: 'relative',
          cursor: 'pointer',
          padding: spacing.xs,
        }}
      >
        <Bell size={24} color="white" />
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: colors.error,
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            fontSize: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </div>

      {/* Render dropdown through portal */}
      {renderDropdown()}
    </div>
  );
};

export default NotificationBell;
