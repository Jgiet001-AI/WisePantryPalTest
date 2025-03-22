import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { colors, spacing, borderRadius, shadows } from '../ui/KitchenStoriesDesign';
import NotificationBell from '../notifications/NotificationBell';

interface AppHeaderProps {
  title?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title = 'WisePantryPal' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div style={{ 
      padding: `${spacing.md} ${spacing.md} ${spacing.sm}`,
      background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      borderBottomLeftRadius: borderRadius.lg,
      borderBottomRightRadius: borderRadius.lg,
      position: 'sticky',
      top: 0,
      zIndex: 9,
      boxShadow: shadows.md,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md
      }}>
        <h2 style={{ color: colors.white, margin: 0, fontWeight: 'bold' }}>{title}</h2>
        <div style={{ display: 'flex', gap: spacing.sm }}>
          <div 
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              cursor: 'pointer'
            }}
          >
            <NotificationBell />
          </div>
          <div 
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              cursor: 'pointer'
            }}
            onClick={handleProfileClick}
          >
            <User size={24} color={colors.white} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
