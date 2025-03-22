import { ReactNode, CSSProperties } from 'react';

// Text component types
export type TextVariant = 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'caption' | 'button' | 'label';
export type TextAlign = 'left' | 'center' | 'right';

export interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  color?: string;
  align?: TextAlign;
  margin?: string;
  style?: CSSProperties;
  onClick?: (e: any) => void;
}

// Button component types
export interface ButtonProps {
  children: ReactNode;
  variant?: string;
  fullWidth?: boolean;
  onClick?: any;
  disabled?: boolean;
  icon?: any;
  size?: string;
  style?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

// Card component types
export interface CardProps {
  children: ReactNode;
  padding?: string;
  margin?: string;
  background?: string;
  borderRadiusSize?: string;
  shadow?: string;
  onClick?: any;
  style?: CSSProperties;
}

// Container component types
export interface ContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}

// Flex component types
export interface FlexProps {
  children: ReactNode;
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: string | number;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  style?: CSSProperties;
}
