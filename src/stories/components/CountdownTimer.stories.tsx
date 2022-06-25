import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CountdownTimer from '@components/CountdownTimer';
import useCountdown from '@hooks/useCountdown';
import { ExpiredNotice } from '@components/CountdownTimer/ExpiredNotice';
import { ShowCounter } from '@components/CountdownTimer/ShowCounter';

export default {
  title: 'Components/CountdownTimer',
  component: CountdownTimer,
} as ComponentMeta<typeof CountdownTimer>;

const THREE_DAYS_IN_MS = 1 * 1 * 2 * 60 * 1000;
const NOW_IN_MS = new Date().getTime();

const targetDate = NOW_IN_MS + THREE_DAYS_IN_MS;

const Template: ComponentStory<typeof CountdownTimer> = () => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return (
      <div
        style={{
          margin: '0 auto',
          width: '100%',
          maxWidth: '525px',
          textAlign: 'center',
        }}
      >
        <ExpiredNotice />
      </div>
    );
  } else {
    return (
      <div
        style={{
          margin: '0 auto',
          width: '100%',
          maxWidth: '525px',
          textAlign: 'center',
        }}
      >
        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </div>
    );
  }
};

export const DefaultCountdownTimer = Template.bind({});
DefaultCountdownTimer.args = {};
