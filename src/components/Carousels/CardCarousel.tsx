import ScrollingWrapper from '@shared/ScrollingWrapper';
import { FC, ReactElement } from 'react';
import styles from './CardCarousel.module.scss';

export const CardCarousel: FC = ({ children }) => {
  return (
    <div>
      <ScrollingWrapper
        color='light'
        size='m'
        className={styles['outer-wrapper']}
      >
        <div className={styles['inner-wrapper']}>{children}</div>
      </ScrollingWrapper>
    </div>
  );
};
