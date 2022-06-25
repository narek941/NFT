import React from 'react';
import styles from './CountdownTimer.module.scss';

export const ExpiredNotice = () => {
  return (
    <div className={styles['expired-notice']}>
      <span>Expired!!!</span>
    </div>
  );
};
