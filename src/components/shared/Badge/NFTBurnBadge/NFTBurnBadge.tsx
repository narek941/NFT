import React, { ReactNode } from 'react';
import styles from './NFTBurnBadge.module.scss';
import Warn from 'public/other/warn.svg';

interface INFTBurnBadge {
  children?: ReactNode;
  className?: string;
}

const NFTBurnBadge = ({ children }: INFTBurnBadge) => {
  return (
    <span className={styles.burnBadge}>
      {children} <Warn className={styles.icon} />
      You can use this NFT one time only! Your NFT will be burned upon Redeem
      success.
    </span>
  );
};

export default NFTBurnBadge;
