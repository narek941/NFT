import { FC, useState } from 'react';
import cn from 'classnames';
import Button from '../Button';
import styles from './AvailableButtonFilters.module.scss';
import btnStyles from '@components/shared/Button/Button.module.scss';

export enum AvailableValues {
  ALL = 'All',
  AVAILABLE = 'Available',
  SOLD_OUT = 'Sold Out',
}

export interface IAvailableButtonFilters {
  onFilterButtonClick: (value: AvailableValues) => void;
}

export const AvailableButtonFilters: FC<IAvailableButtonFilters> = ({
  onFilterButtonClick,
}) => {
  const [activeValue, setActiveValue] = useState<AvailableValues>(
    AvailableValues.ALL
  );

  const getButtonClassName = (value: AvailableValues) =>
    cn(styles.button, {
      [btnStyles['btn-secondary-active']]: activeValue === value,
    });

  const handleButtonClick = (value: AvailableValues) => () => {
    setActiveValue(value);
    onFilterButtonClick(value);
  };

  return (
    <div className={styles.wrapper}>
      <Button
        size='s'
        color='secondary'
        className={getButtonClassName(AvailableValues.ALL)}
        onClick={handleButtonClick(AvailableValues.ALL)}
      >
        All
      </Button>
      <Button
        size='s'
        color='secondary'
        className={getButtonClassName(AvailableValues.AVAILABLE)}
        onClick={handleButtonClick(AvailableValues.AVAILABLE)}
      >
        Available
      </Button>
      <Button
        size='s'
        color='secondary'
        className={getButtonClassName(AvailableValues.SOLD_OUT)}
        onClick={handleButtonClick(AvailableValues.SOLD_OUT)}
      >
        Sold Out
      </Button>
    </div>
  );
};
