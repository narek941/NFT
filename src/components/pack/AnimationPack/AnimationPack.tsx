import { FC } from 'react';
import styles from './AnimationPack.module.scss';

export const AnimationPack: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['text-content']}>Here will be animation</div>
    </div>
  );
};
