import React from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { Button } from '../ui/KitchenStoriesDesign';

const NotificationTest: React.FC = () => {
  const { addNotification, clearAllNotifications } = useNotifications();

  const addSampleNotifications = () => {
    // Add expiration notification
    addNotification({
      type: 'expiration',
      title: 'Food Expiring Soon',
      message: 'Your milk will expire in 2 days',
      priority: 'high',
      actionUrl: '/pantry'
    });

    // Add recipe recommendation
    addNotification({
      type: 'recipe',
      title: 'Recipe Suggestion',
      message: 'Try our Avocado Pasta recipe with your expiring avocados',
      priority: 'medium',
      actionUrl: '/recipes/2',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=580&q=80'
    });

    // Add shopping list notification
    addNotification({
      type: 'shopping',
      title: 'Shopping List Updated',
      message: 'Your roommate added 3 items to your shared shopping list',
      priority: 'medium',
      actionUrl: '/shopping-list'
    });

    // Add price alert
    addNotification({
      type: 'price',
      title: 'Price Drop Alert',
      message: 'Chicken breast is now 15% cheaper at Whole Foods',
      priority: 'low',
      actionUrl: '/price-comparison'
    });

    // Add social notification
    addNotification({
      type: 'social',
      title: 'New Comment',
      message: 'Sarah commented on your meal plan',
      priority: 'low',
      actionUrl: '/meal-planning'
    });
  };

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '10px' }}>
      <Button onClick={addSampleNotifications}>Add Sample Notifications</Button>
      <Button onClick={clearAllNotifications} variant="secondary">Clear All Notifications</Button>
    </div>
  );
};

export default NotificationTest;
