import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Card,
  Button,
  colors,
  spacing,
  shadows,
  borderRadius
} from '../ui/KitchenStoriesDesign';
import { ArrowLeft, Bell, ShoppingCart, Tag, Calendar, Utensils } from 'lucide-react';

export default function NotificationsScreen() {
  const navigate = useNavigate();

  // Sample notifications
  const notifications = [
    {
      id: 1,
      type: 'price',
      title: 'Price Drop Alert',
      message: 'Chicken breast is now 15% cheaper at Whole Foods',
      time: '10 minutes ago',
      icon: <Tag size={20} color={colors.accent1} />,
      action: () => navigate('/price-comparison')
    },
    {
      id: 2,
      type: 'shopping',
      title: 'Shopping List Updated',
      message: 'Your roommate added 3 items to your shared shopping list',
      time: '1 hour ago',
      icon: <ShoppingCart size={20} color={colors.primary} />,
      action: () => navigate('/shopping-list')
    },
    {
      id: 3,
      type: 'recipe',
      title: 'New Recipe Suggestion',
      message: 'Based on your pantry items: Try our Avocado Pasta recipe',
      time: '3 hours ago',
      icon: <Utensils size={20} color={colors.secondary} />,
      action: () => navigate('/recipe/2')
    },
    {
      id: 4,
      type: 'calendar',
      title: 'Meal Prep Reminder',
      message: 'Sunday meal prep scheduled for tomorrow',
      time: '5 hours ago',
      icon: <Calendar size={20} color={colors.primary} />,
      action: () => navigate('/smart-calendar')
    }
  ];

  return (
    <Container padding="0" background={colors.background}>
      {/* Header */}
      <div style={{ 
        padding: spacing.md,
        background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        borderBottomLeftRadius: borderRadius.lg,
        borderBottomRightRadius: borderRadius.lg,
        position: 'sticky',
        top: 0,
        zIndex: 9,
        boxShadow: shadows.md,
      }}>
        <Flex align="center">
          <Button 
            variant="text" 
            onClick={() => navigate(-1)}
            style={{ marginRight: spacing.sm, color: colors.white }}
            icon={<ArrowLeft size={24} />}
          >
            Back
          </Button>
          <Text variant="h2" style={{ color: colors.white, margin: 0, fontWeight: 'bold' }}>
            Notifications
          </Text>
        </Flex>
      </div>

      {/* Notifications list */}
      <div style={{ padding: spacing.md }}>
        <Flex align="center" style={{ marginBottom: spacing.md }}>
          <Bell size={20} color={colors.primary} style={{ marginRight: spacing.xs }} />
          <Text variant="body1" style={{ color: colors.textSecondary }}>
            Your recent notifications
          </Text>
        </Flex>
        
        {notifications.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            {notifications.map((notification) => (
              <Card 
                key={notification.id}
                padding={spacing.md}
                background={colors.white}
                shadow={shadows.sm}
                onClick={notification.action}
                margin="0"
              >
                <Flex align="flex-start">
                  <div style={{ 
                    marginRight: spacing.md,
                    backgroundColor: `${notification.type === 'price' ? colors.accent1 : notification.type === 'recipe' ? colors.secondary : colors.primary}10`,
                    padding: spacing.xs,
                    borderRadius: '50%'
                  }}>
                    {notification.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text variant="body1" style={{ fontWeight: 'bold', marginBottom: spacing.xs }}>
                      {notification.title}
                    </Text>
                    <Text variant="body2" style={{ color: colors.textSecondary, marginBottom: spacing.xs }}>
                      {notification.message}
                    </Text>
                    <Text variant="body2" style={{ color: colors.midGray, fontSize: '12px' }}>
                      {notification.time}
                    </Text>
                  </div>
                </Flex>
              </Card>
            ))}
          </div>
        ) : (
          <Flex direction="column" align="center" justify="center" style={{ marginTop: spacing.xl, padding: spacing.xl }}>
            <Bell size={48} color={colors.midGray} style={{ marginBottom: spacing.md }} />
            <Text variant="h3" style={{ marginBottom: spacing.sm }}>No notifications</Text>
            <Text variant="body1" style={{ color: colors.textSecondary, textAlign: 'center' }}>
              You're all caught up! We'll notify you when there are updates.
            </Text>
          </Flex>
        )}
      </div>
    </Container>
  );
}
