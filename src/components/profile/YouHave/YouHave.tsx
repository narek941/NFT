import Button from '@components/shared/Button';
import { FC } from 'react';
import styles from './YouHave.module.scss';

export interface IYouHaveProps {
  text: string;
  total: number;
  buttonText: string;
  className?: string;
  onButtonClick: () => void;
}

export const YouHave: FC<IYouHaveProps> = ({
  text,
  total,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        <div className={styles['total-wrapper']}>
          <div className={styles.text}>You have</div>
          <div className={styles.total}>{total}</div>
        </div>
        <div className={styles.text}>{text}</div>
      </div>
      <div className={styles.column}>
        <Button
          size={'s'}
          color={'blue'}
          className={styles.button}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
