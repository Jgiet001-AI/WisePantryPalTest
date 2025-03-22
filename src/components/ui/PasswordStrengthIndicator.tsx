import React, { useMemo } from 'react';
import { colors, spacing } from './KitchenStoriesDesign';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface PasswordRequirement {
  label: string;
  met: boolean;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const requirements = useMemo<PasswordRequirement[]>(() => [
    {
      label: 'At least 8 characters',
      met: password.length >= 8,
    },
    {
      label: 'Contains uppercase letter',
      met: /[A-Z]/.test(password),
    },
    {
      label: 'Contains lowercase letter',
      met: /[a-z]/.test(password),
    },
    {
      label: 'Contains number',
      met: /[0-9]/.test(password),
    },
    {
      label: 'Contains special character',
      met: /[^A-Za-z0-9]/.test(password),
    },
  ], [password]);

  const strengthScore = useMemo(() => {
    if (!password) return 0;
    return requirements.filter(req => req.met).length;
  }, [requirements, password]);

  const strengthText = useMemo(() => {
    if (!password) return '';
    if (strengthScore <= 2) return 'Weak';
    if (strengthScore <= 4) return 'Medium';
    return 'Strong';
  }, [strengthScore, password]);

  const strengthColor = useMemo(() => {
    if (!password) return colors.darkGray;
    if (strengthScore <= 2) return colors.error;
    if (strengthScore <= 4) return colors.warning;
    return colors.success;
  }, [strengthScore, password]);

  if (!password) return null;

  return (
    <div style={{ marginTop: spacing.sm }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: spacing.xs }}>
        <div style={{ 
          flex: 1, 
          height: '4px', 
          backgroundColor: colors.lightGray,
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(strengthScore / 5) * 100}%`,
            height: '100%',
            backgroundColor: strengthColor,
            transition: 'width 0.3s ease, background-color 0.3s ease'
          }} />
        </div>
        <span style={{ 
          marginLeft: spacing.sm, 
          fontSize: '12px', 
          color: strengthColor,
          fontWeight: 500
        }}>
          {strengthText}
        </span>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: spacing.xs
      }}>
        {requirements.map((req, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '12px',
            color: req.met ? colors.darkGray : colors.lightGray
          }}>
            {req.met ? (
              <Check size={12} style={{ marginRight: '4px', color: colors.success }} />
            ) : (
              <X size={12} style={{ marginRight: '4px', color: colors.lightGray }} />
            )}
            {req.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
