import React, { FC, useEffect, useState } from 'react';
import useCountdown from '@hooks/useCountdown';

import styles from './ResendMinuteTimer.module.scss';
import TickSmall from 'public/other/tick-small.svg';

import classNames from 'classnames';
import ModalSubtitle from '@components/shared/ModalSubtitle';
import { ICounter } from '@type/general';

export interface IMinuteTimer extends ICounter {
  timerToggle: () => void;
}

const ResendMinuteTimer: FC<IMinuteTimer> = ({
  className,
  timerToggle,
  targetDate,
}) => {
  const minuteTimerClass: string = classNames(styles.wrapper, className);

  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    timerToggle();
    return null;
  }

  return (
    <>
      <div className={minuteTimerClass}>
        <div className={styles.item}>
          {minutes < 10 ? `0${minutes}` : minutes}
        </div>
        <div className={styles.item}>:</div>
        <div className={styles.item}>
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </div>
      <div className={styles.message}>
        <ModalSubtitle text={'Email has been resent'} />
        <TickSmall />
      </div>
    </>
  );
};

export default ResendMinuteTimer;
