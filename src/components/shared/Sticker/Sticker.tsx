import React, { FC } from 'react';
import { IStickerProps } from '@type/general';
import classNames from 'classnames';
import styles from './Sticker.module.scss';

const Sticker: FC<IStickerProps> = ({ children, className }) => {
  const stickerClass: string = classNames(styles['sticker-wrapper'], className);
  return (
    <div className={stickerClass}>
      <div className={styles.sticker}>{children}</div>
    </div>
  );
};

export default Sticker;
