import React, { FC } from 'react';
import styles from './CountdownTimer.module.scss';
import classNames from 'classnames';
import { IDateTime } from '@type/general';

const DateTimeDisplay: FC<IDateTime> = ({ value, type, isDanger }) => {
  return (
    <div
      className={classNames(
        styles['countdown-item'],
        isDanger && styles['countdown-danger']
      )}
    >
      <div className={styles['countdown-day']}>
        <div className={styles['countdown-value']}>{value}</div>
        <div className={styles['countdown-name']}>{type}</div>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
