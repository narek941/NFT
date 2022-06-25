import Container from '@components/shared/Container';
import React from 'react';
import styles from './MergeNFTsTabs.module.scss';

import IconClose from '/public/other/ic_close.svg';

import CarouselMergeNFT from '../CarouselMergeNFT';

import { nft } from 'src/__mocks__/nft';
import { Card } from '@components/Card';
import useMergeNFT from '../useMergeNFT';

const MergeNFTsTabs = ({
  collections,
  onOpenGetNFTCard,
  onClickMerge,
  onCloseTab,
}) => {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <div className={styles.close} onClick={onCloseTab}>
          <IconClose className={styles['icon-close']} />
        </div>
        <div className={styles.content}>
          <div className={styles['card-get']}>
            <Card
              className={styles.card}
              item={nft}
              // isNFTEntity
              onClick={onOpenGetNFTCard}
            />
          </div>
          <div className={styles.box}>
            <CarouselMergeNFT
              collections={collections}
              onClickMerge={onClickMerge}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MergeNFTsTabs;
