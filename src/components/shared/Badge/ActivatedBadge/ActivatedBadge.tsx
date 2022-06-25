import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './ActivatedBadge.module.scss';
import CheckActivated from 'public/other/check_activated.svg';

interface IActivatedBadge {
  children?: ReactNode;
  className?: string;
}

const ActivatedBadge = ({ children, className }: IActivatedBadge) => {
  const activatedBadgeClass: string = classNames(
    styles.activatedBadge,
    className
  );
  return (
    <span className={classNames(activatedBadgeClass)}>
      {children} <CheckActivated />
      Activated
    </span>
  );
};

export default ActivatedBadge;
