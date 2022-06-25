import React, { ComponentType } from 'react';
import styles from './BuyWith.styles.module.scss';
import Button from '@shared/Button';
import { INFT } from '@type/nft';
import { NFTDetailViews } from '@components/nft/NFTDetail/NFTDetail';

interface IBuyWithProps {
  renderMedia: () => any;
  nft: INFT;
  setView: (view: NFTDetailViews) => void;
}

export const BuyWith: ComponentType<IBuyWithProps> = ({
  renderMedia,
  nft,
  setView,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.media}>{renderMedia()}</div>
      <div className={styles.title}>{nft.name}</div>
      <div className={styles.buyText}>Buy with</div>
      <div className={styles.action}>
        <Button
          size={'m'}
          color={'blue'}
          fillStyle={false}
          fullWidth={false}
          onClick={() => setView(NFTDetailViews.payment)}
        >
          Сard
        </Button>
        <Button
          size={'m'}
          color={'blue'}
          fillStyle={false}
          fullWidth={false}
          onClick={() => setView(NFTDetailViews.metamaskCheckout)}
        >
          Crypto
        </Button>
      </div>
      <div className={styles.footerText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </div>
    </div>
  );
};
