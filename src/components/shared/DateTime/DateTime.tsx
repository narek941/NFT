import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import styles from './dateTime.module.scss';
interface IDateTime {
  children: ReactNode | string;
  dateTime?: string;
  className?: string;
}
const DateTime: FC<IDateTime> = ({ dateTime, children, className }) => {
  const getDateTimeClassName = (): string => {
    const dateTimeClass: string = classNames(styles.time, className);
    return dateTimeClass;
  };

  const dateTimeClassName: string = getDateTimeClassName();
  return (
    <time className={dateTimeClassName} dateTime={dateTime && dateTime}>
      {children}
    </time>
  );
};

export default DateTime;
