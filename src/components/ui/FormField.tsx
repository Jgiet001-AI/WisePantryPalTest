import React, { useState, useEffect } from 'react';
import { colors, spacing, borderRadius } from './KitchenStoriesDesign';
import { Check, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  icon?: React.ReactNode;
  isValid?: boolean;
  autoComplete?: string;
  required?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  icon,
  isValid,
  autoComplete,
  required = false,
  onBlur
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    if (value && !hasInteracted) {
      setHasInteracted(true);
    }
  }, [value, hasInteracted]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasInteracted(true);
    if (onBlur) {
      onBlur(e);
    }
  };

  const getBorderColor = () => {
    if (error) return colors.error;
    if (isValid && hasInteracted) return colors.success;
    if (isFocused) return colors.primary;
    return isDarkMode ? colors.border : colors.border;
  };

  const getBackgroundColor = () => {
    return isDarkMode ? 'var(--color-surface)' : colors.white;
  };

  return (
    <div style={{ marginBottom: spacing.md }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: spacing.xs
      }}>
        <label 
          htmlFor={name}
          style={{ 
            fontSize: '14px', 
            fontWeight: 500,
            color: isDarkMode ? 'var(--color-text-primary)' : colors.darkGray
          }}
        >
          {label}{required && <span style={{ color: colors.error }}> *</span>}
        </label>
      </div>
      
      <div style={{ 
        position: 'relative',
        border: `1px solid ${getBorderColor()}`,
        borderRadius: borderRadius.sm,
        padding: `${spacing.sm} ${spacing.md}`,
        paddingLeft: icon ? '40px' : spacing.md,
        backgroundColor: getBackgroundColor(),
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: isFocused ? `0 0 0 2px ${colors.primaryLight}` : 'none'
      }}>
        {icon && (
          <div style={{ 
            position: 'absolute',
            left: spacing.sm,
            top: '50%',
            transform: 'translateY(-50%)',
            color: error ? colors.error : (isFocused ? colors.primary : colors.darkGray)
          }}>
            {icon}
          </div>
        )}
        
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '16px',
            color: isDarkMode ? 'var(--color-text-primary)' : colors.darkGray
          }}
        />
        
        {isValid && hasInteracted && !error && (
          <div style={{ 
            position: 'absolute',
            right: spacing.sm,
            top: '50%',
            transform: 'translateY(-50%)',
            color: colors.success,
            animation: 'fadeIn 0.3s ease'
          }}>
            <Check size={16} />
          </div>
        )}
        
        {error && hasInteracted && (
          <div style={{ 
            position: 'absolute',
            right: spacing.sm,
            top: '50%',
            transform: 'translateY(-50%)',
            color: colors.error,
            animation: 'fadeIn 0.3s ease'
          }}>
            <AlertCircle size={16} />
          </div>
        )}
      </div>
      
      {error && hasInteracted && (
        <div style={{ 
          fontSize: '12px', 
          color: colors.error, 
          marginTop: spacing.xs,
          animation: 'slideDown 0.3s ease'
        }}>
          {error}
        </div>
      )}
      
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-5px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>
    </div>
  );
};

export default FormField;
