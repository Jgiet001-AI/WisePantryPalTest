import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, Text, Card, Button } from '../ui/KitchenStoriesDesign';
import DashboardGrid from './DashboardGrid';
import ActivityFeed from './ActivityFeed';
import TaskBoard from './TaskBoard';
import { UserProfile } from './UserProfile';

/**
 * Dashboard component that displays user's pantry status and activity
 */
const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      padding: spacing.md,
      backgroundColor: colors.background,
      minHeight: '100%'
    }}>
      <Text variant="h2" style={{ marginBottom: spacing.md }}>
        Dashboard
      </Text>
      
      <UserProfile />
      
      <Card padding={spacing.md} margin={`${spacing.md} 0`} shadow="md">
        <Text variant="h3" style={{ marginBottom: spacing.sm }}>
          Pantry Status
        </Text>
        <DashboardGrid />
      </Card>
      
      <Card padding={spacing.md} margin={`${spacing.md} 0`} shadow="md">
        <Text variant="h3" style={{ marginBottom: spacing.sm }}>
          Recent Activity
        </Text>
        <ActivityFeed />
      </Card>
      
      <Card padding={spacing.md} margin={`${spacing.md} 0`} shadow="md">
        <Text variant="h3" style={{ marginBottom: spacing.sm }}>
          Tasks
        </Text>
        <TaskBoard />
      </Card>
      
      <Button 
        variant="primary"
        onClick={() => navigate('/')}
        style={{ marginTop: spacing.lg }}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default Dashboard;
