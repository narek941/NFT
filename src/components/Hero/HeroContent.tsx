import React from 'react';
import DateTime from '@components/shared/DateTime';
import styles from './Hero.module.scss';
import CountdownTimer from '@components/CountdownTimer';

const HeroContent = () => {
  const THREE_DAYS_IN_MS = 1 * 1 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTime = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div className={styles.content}>
      <CountdownTimer className={styles.timeWrapper} targetDate={dateTime} />
    </div>
  );
};

export default HeroContent;
