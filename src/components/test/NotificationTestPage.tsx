import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, borderRadius, shadows } from '../ui/KitchenStoriesDesign';
import NotificationTest from '../notifications/NotificationTest';

const NotificationTestPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: spacing.md }}>
      <h1>Notification System Test</h1>
      
      <div style={{ 
        backgroundColor: colors.white, 
        padding: spacing.md, 
        borderRadius: borderRadius.md,
        boxShadow: shadows.md,
        marginBottom: spacing.lg
      }}>
        <h2>Test Notifications</h2>
        <p>Click the button below to add sample notifications. Then click the notification bell in the header to see them.</p>
        <NotificationTest />
      </div>

      <div style={{ 
        backgroundColor: colors.white, 
        padding: spacing.md, 
        borderRadius: borderRadius.md,
        boxShadow: shadows.md
      }}>
        <h2>Notification Types</h2>
        <ul style={{ lineHeight: '1.6' }}>
          <li><strong>Expiration:</strong> Alerts about food items that are about to expire</li>
          <li><strong>Recipe:</strong> Suggestions for recipes based on your pantry items</li>
          <li><strong>Shopping:</strong> Updates to your shopping list</li>
          <li><strong>Price:</strong> Alerts about price drops for items on your shopping list</li>
          <li><strong>Social:</strong> Notifications about social interactions</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationTestPage;
