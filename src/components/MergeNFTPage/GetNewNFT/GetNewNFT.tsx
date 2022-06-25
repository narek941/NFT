import Button from '@components/shared/Button';
import { ICetNewNFT } from '@type/general';
import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './GetNewNFT.module.scss';

const GetNewNFT: FC<ICetNewNFT> = ({ className, onClickMerge }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.content}>
        You have
        <div className={styles['value-wrapper']}>
          <span className={styles['value-current']}>6</span>/
          <span className={styles['value-total']}>6</span>
        </div>
        to get new NFT!
      </div>
      <Button
        onClick={onClickMerge}
        className={styles.button}
        color='blue'
        size='l'
      >
        Merge now!
      </Button>
    </div>
  );
};

export default GetNewNFT;
