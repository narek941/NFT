import React, { FC } from 'react';
import { ILoadingWave } from '@type/general';
import styles from './LoadingWave.module.scss';

const LoadingWave: FC<ILoadingWave> = ({ dataPercent }) => {
  return (
    <div>
      <div className={styles.circle}>
        <div className={styles.circleWrapper}>
          <div className={styles.wave} data-percent={dataPercent}>
            <div className={styles.circleInner}>
              <div className={styles.number}>{dataPercent} %</div>
              Loading...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingWave;
