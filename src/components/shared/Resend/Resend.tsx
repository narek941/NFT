import React, { FC, useState } from 'react';
import Button from '@components/shared/Button';
import ResendMinuteTimer from '@components/ResendMinuteTimer';

export interface IResend {
  onResendButtonClick: () => void;
}

export const Resend: FC<IResend> = ({ onResendButtonClick }) => {
  const [showTimer, setshowTimer] = useState<boolean>(false);

  const TWO_MIN_IN_MS = 2 * 60 * 1000;
  const dateTime = new Date().getTime() + TWO_MIN_IN_MS;

  const timerToggle = () => {
    setshowTimer(!showTimer);
  };

  return (
    <>
      {!showTimer ? (
        <Button
          size='s'
          color='blue'
          fillStyle
          fullWidth={false}
          onClick={onResendButtonClick}
        >
          Resend email
        </Button>
      ) : (
        <ResendMinuteTimer timerToggle={timerToggle} targetDate={dateTime} />
      )}
    </>
  );
};
