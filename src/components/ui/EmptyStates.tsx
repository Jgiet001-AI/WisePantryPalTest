import React from 'react';
import { colors, spacing, borderRadius, Text } from './KitchenStoriesDesign';
import { ShoppingBag, Search, Book, Calendar, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'compact' | 'minimal';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  variant = 'default'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          padding: spacing.md,
          gap: spacing.sm,
          iconSize: 40
        };
      case 'minimal':
        return {
          padding: spacing.sm,
          gap: spacing.xs,
          iconSize: 24
        };
      case 'default':
      default:
        return {
          padding: spacing.xl,
          gap: spacing.md,
          iconSize: 64
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: styles.padding,
        backgroundColor: colors.background,
        borderRadius: borderRadius.md,
        gap: styles.gap,
        minHeight: variant === 'minimal' ? 'auto' : '200px'
      }}
    >
      {icon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: styles.iconSize,
            height: styles.iconSize,
            borderRadius: '50%',
            backgroundColor: `${colors.primary}15`,
            color: colors.primary,
            marginBottom: spacing.sm
          }}
        >
          {React.cloneElement(icon as React.ReactElement, { 
            size: styles.iconSize * 0.6,
            strokeWidth: 2
          })}
        </div>
      )}
      <Text variant={variant === 'minimal' ? 'h3' : 'h3'} color={colors.textPrimary}>
        {title}
      </Text>
      <Text variant="body1" color={colors.textSecondary} style={{ maxWidth: '300px' }}>
        {description}
      </Text>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          style={{ 
            marginTop: spacing.sm,
            padding: `${spacing.xs} ${spacing.md}`,
            backgroundColor: colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: borderRadius.sm,
            fontSize: variant === 'minimal' ? '14px' : '16px',
            cursor: 'pointer'
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

// Pre-configured empty states for common scenarios
export const EmptyShoppingList: React.FC<{ onAddItem?: () => void }> = ({ onAddItem }) => (
  <EmptyState
    title="Your shopping list is empty"
    description="Add items to your shopping list to keep track of what you need to buy."
    icon={<ShoppingBag />}
    actionLabel={onAddItem ? "Add First Item" : undefined}
    onAction={onAddItem}
  />
);

export const EmptySearchResults: React.FC = () => (
  <EmptyState
    title="No results found"
    description="Try adjusting your search terms or filters to find what you're looking for."
    icon={<Search />}
    variant="compact"
  />
);

export const EmptyRecipes: React.FC<{ onBrowse?: () => void }> = ({ onBrowse }) => (
  <EmptyState
    title="No recipes yet"
    description="Discover delicious recipes or add your own to get started."
    icon={<Book />}
    actionLabel={onBrowse ? "Browse Recipes" : undefined}
    onAction={onBrowse}
  />
);

export const EmptyMealPlan: React.FC<{ onPlan?: () => void }> = ({ onPlan }) => (
  <EmptyState
    title="Your meal plan is empty"
    description="Plan your meals for the week to make shopping and cooking easier."
    icon={<Calendar />}
    actionLabel={onPlan ? "Start Planning" : undefined}
    onAction={onPlan}
  />
);

export const EmptyNotifications: React.FC = () => (
  <EmptyState
    title="No notifications"
    description="You're all caught up! We'll notify you when there's something new."
    icon={<AlertCircle />}
    variant="compact"
  />
);
