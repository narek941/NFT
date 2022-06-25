/* global JSX*/
import { SyntheticEvent } from 'react';
import { useRouter } from 'next/router';

import classNames from 'classnames';

import styles from './Button.module.scss';

interface IButton {
  children: JSX.Element | string;
  size?: 's' | 'm' | 'l';
  color?: 'blue' | 'dark' | 'secondary' | 'transparent' | 'auction';
  space?: 'm-0';
  fillStyle?: boolean;
  fullWidth?: boolean;
  transparent?: boolean;
  className?: string;
  url?: string;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  color,
  size,
  space,
  url,
  onClick,
  fillStyle,
  fullWidth,
  transparent,
  className,
  loading,
  ...props
}: IButton) {
  const router = useRouter();

  const getBtnClassName = (
    color?: string,
    size?: string,
    space?: string,
    fillStyle?: boolean,
    fullWidth?: boolean,
    loading?: boolean
  ): string => {
    const btnClass: string = classNames(styles.btn, className, {
      [styles['btn-small']]: size === 's',
      [styles['btn-medium']]: size === 'm',
      [styles['btn-large']]: size === 'l',
      [styles['m-0']]: space === 'm-0',
      [styles['btn-primary-outlined']]: fillStyle && color === 'blue',
      [styles['btn-transparent']]: fillStyle && color === 'transparent',
      [styles['btn-dark']]: color === 'dark',
      [styles['btn-auction']]: color === 'auction',
      [styles['btn-secondary']]: color === 'secondary',
      [styles['btn-primary']]: !fillStyle && color === 'blue',
      [styles['btn-fullWidth']]: fullWidth,
      [styles['btn-loading']]: loading,
    });
    return btnClass;
  };

  const btnClassName: string = getBtnClassName(
    color,
    size,
    space,
    fillStyle,
    fullWidth,
    loading
  );

  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (url) {
      return router.push(url);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button className={btnClassName} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
