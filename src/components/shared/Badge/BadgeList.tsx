import React, { FC } from 'react';

import styles from './Badge.module.scss';
import { IBadge } from './types';
import classNames from 'classnames';

const BadgeList = ({ children, className, ...props }: IBadge) => {
  return (
    <div className={classNames(styles.sBadgeList, className)} {...props}>
      {children}
    </div>
  );
};

export default BadgeList;
