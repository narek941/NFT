import React, { FC } from 'react';
import useCountdown from '@hooks/useCountdown';
import { ShowCounter } from './ShowCounter';
import { ExpiredNotice } from './ExpiredNotice';
import Link from 'next/link';

import styles from './CountdownTimer.module.scss';
import { ICounter } from '@type/general';
import classNames from 'classnames';

const CountdownTimer: FC<ICounter> = ({ targetDate, className }) => {
  const countdownClass: string = classNames(
    styles['countdown-link'],
    className
  );
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return null;
  } else {
    return (
      <Link href={'/'}>
        <a target='_blank' rel='noopener noreferrer' className={countdownClass}>
          <div className={classNames(styles.header, 'h3 text-center')}>
            Time to next drop
          </div>

          <ShowCounter
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        </a>
      </Link>
    );
  }
};

export default CountdownTimer;
