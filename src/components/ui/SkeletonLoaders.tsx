import React from 'react';
import { Skeleton } from './skeleton';
import { Flex, Grid, spacing, borderRadius } from './KitchenStoriesDesign';

// Recipe card skeleton loader
export const RecipeCardSkeleton: React.FC = () => {
  return (
    <div style={{ 
      padding: '0', 
      margin: spacing.sm,
      borderRadius: borderRadius.md,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      backgroundColor: 'white'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Skeleton variant="rectangular" height={160} />
        <div style={{ padding: spacing.md }}>
          <Skeleton variant="text" height={24} width="80%" style={{ marginBottom: spacing.sm }} />
          <Skeleton variant="text" height={16} width="60%" style={{ marginBottom: spacing.md }} />
          <Flex justify="space-between" align="center">
            <Skeleton variant="text" height={14} width="40%" />
            <Skeleton variant="circular" width={24} height={24} />
          </Flex>
        </div>
      </div>
    </div>
  );
};

// Recipe grid skeleton loader
export const RecipeGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <Grid columns={2} gap={spacing.md}>
      {Array.from({ length: count }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </Grid>
  );
};

// Shopping list item skeleton
export const ShoppingListItemSkeleton: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: spacing.sm,
      marginBottom: spacing.sm,
      borderRadius: borderRadius.sm,
      backgroundColor: 'white'
    }}>
      <Skeleton variant="circular" width={24} height={24} style={{ marginRight: spacing.sm }} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" height={16} width="70%" style={{ marginBottom: spacing.xs }} />
        <Skeleton variant="text" height={14} width="40%" />
      </div>
      <Skeleton variant="circular" width={32} height={32} />
    </div>
  );
};

// Shopping list skeleton
export const ShoppingListSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div>
      <Skeleton variant="text" height={32} width="50%" style={{ marginBottom: spacing.md }} />
      <div>
        {Array.from({ length: count }).map((_, index) => (
          <ShoppingListItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

// Profile skeleton
export const ProfileSkeleton: React.FC = () => {
  return (
    <div style={{ padding: spacing.md }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: spacing.xl 
      }}>
        <Skeleton variant="circular" width={80} height={80} style={{ marginRight: spacing.md }} />
        <div>
          <Skeleton variant="text" height={24} width={150} style={{ marginBottom: spacing.sm }} />
          <Skeleton variant="text" height={16} width={200} />
        </div>
      </div>
      
      <Skeleton variant="text" height={20} width="40%" style={{ marginBottom: spacing.md }} />
      <Skeleton variant="rectangular" height={60} style={{ marginBottom: spacing.md }} />
      <Skeleton variant="rectangular" height={60} style={{ marginBottom: spacing.md }} />
      <Skeleton variant="rectangular" height={60} style={{ marginBottom: spacing.md }} />
    </div>
  );
};

// Search results skeleton
export const SearchResultsSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <div style={{ padding: spacing.md }}>
      <Skeleton variant="rectangular" height={50} style={{ marginBottom: spacing.lg }} />
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} style={{ marginBottom: spacing.md }}>
          <Skeleton variant="text" height={18} width="80%" style={{ marginBottom: spacing.xs }} />
          <Skeleton variant="text" height={14} width="60%" />
        </div>
      ))}
    </div>
  );
};
