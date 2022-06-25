import DateTimeDisplay from './DateTimeDisplay';
import styles from './CountdownTimer.module.scss';

export const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className={styles['show-counter']}>
      <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
      {/* <div className={styles['countdown-separator']}>:</div> */}
      <DateTimeDisplay value={hours} type={'Hours'} />
      {/* <div className={styles['countdown-separator']}>:</div> */}
      <DateTimeDisplay value={minutes} type={'Mins'} />
      {/* <div className={styles['countdown-separator']}>:</div> */}
      <DateTimeDisplay value={seconds} type={'Seconds'} />
    </div>
  );
};
