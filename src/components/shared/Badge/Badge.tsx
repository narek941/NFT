import React, { FC } from 'react';
import classNames from 'classnames';
import Close from 'public/field-icons/close.svg';
import styles from './Badge.module.scss';
import { IBadge } from './types';

const Badge = ({
  children,
  color,
  size,
  uppercase,
  rounded,
  iconClose,
  className,
  onCloseIconClick,
  ...props
}: IBadge) => {
  const getBadgeClassName = (color, size): string => {
    const badgeClass: string = classNames(styles.sBadge, className, {
      [styles['sBadge-small']]: size === 's',
      [styles['sBadge-medium']]: size === 'm',
      [styles['sBadge-primary']]: color === 'primary',
      [styles['sBadge-secondary']]: color === 'secondary',
      [styles['sBadge-light']]: color === 'light',
      [styles['sBadge-dark']]: color === 'dark',
      [styles['sBadge-white']]: color === 'white',
      [styles['uppercase']]: uppercase,
      [styles['rounded-pill']]: rounded,
      iconClose,
    });
    return badgeClass;
  };

  const badgeClassName: string = getBadgeClassName(color, size);
  return (
    <span className={badgeClassName} {...props}>
      {children}{' '}
      {iconClose && (
        <Close onClick={onCloseIconClick} className={styles['icon-close']} />
      )}
    </span>
  );
};

export default Badge;
