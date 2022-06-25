import { IChildren } from '@type/general';
import { ReactNode } from 'react';
export interface IBadge {
  children: ReactNode | string;
  size?: 's' | 'm' | 'l';
  color?: 'primary' | 'secondary' | 'light' | 'dark' | 'white';
  uppercase?: boolean;
  rounded?: boolean;
  iconClose?: boolean;
  className?: string;
  onCloseIconClick?: () => void;
}
