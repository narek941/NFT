/* global JSX*/

import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './ScrollingWrapper.module.scss';

interface IScrolling {
  children: ReactNode | string;
  size?: 's' | 'm' | 'l';
  color?: 'primary' | 'light';
  className?: string;
}

const ScrollingWrapper = ({
  children,
  color,
  size,
  className,
  ...props
}: IScrolling) => {
  const getScrollingClassName = (color?: string, size?: string): string => {
    const scrollingClassName: string = classNames(styles.scrolling, className, {
      [styles['scrolling-small']]: size === 's',
      [styles['scrolling-medium']]: size === 'm',
      [styles['scrolling-large']]: size === 'l',
      [styles['scrolling-light']]: color === 'light',

      [styles['scrolling-primary']]: color === 'primary',
    });
    return scrollingClassName;
  };

  const scrollingClassName: string = getScrollingClassName(color, size);
  return (
    <div className={scrollingClassName} {...props}>
      {children}
    </div>
  );
};

export default ScrollingWrapper;
