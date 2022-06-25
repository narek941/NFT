import React, { FC } from 'react';
import styles from './EmptyView.module.scss';

import Button from '../Button';

interface IEmptyView {
  text: string;
  emoji: string;
  btnUrl: string;
  btnText: string;
}

const EmptyView: FC<IEmptyView> = ({ emoji, text, btnUrl, btnText }) => (
  <div className={styles.content}>
    <div className={styles.content__emoji}>{emoji}</div>
    <div className={styles.content__text}>{text}</div>
    <Button
      size='m'
      color='blue'
      url={btnUrl}
      fullWidth={false}
      className={styles.content__button}
    >
      {btnText}
    </Button>
  </div>
);

export default EmptyView;
