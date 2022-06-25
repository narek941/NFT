import React, { FC } from 'react';
import Button from '@components/shared/Button';
import styles from './NoItems.module.scss';
import { INoItemsProps } from '@type/general';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { filtersReset } from '@entities/filters/redux/actions';

const NoItems: FC<INoItemsProps> = ({
  children,
  isButton,
  className,
  callback,
}) => {
  const dispatch = useDispatch();

  const onClickBack = () => {
    if (callback) {
      callback();
      return;
    }
    dispatch(filtersReset());
  };

  return (
    <div className={classNames(styles.noItems, className)}>
      <div className={styles['noItems-text']}>{children}</div>
      {isButton && (
        <Button size='l' color='blue' onClick={onClickBack}>
          Go to all items
        </Button>
      )}
    </div>
  );
};

export default NoItems;
