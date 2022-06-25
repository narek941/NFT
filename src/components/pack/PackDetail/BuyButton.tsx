import React, { FC, SyntheticEvent } from 'react';

import WarningHint from '@components/shared/WarningHint';
import BuyOrSigninButton from '@components/shared/BuyOrSigninButton';
import { renderPrice } from 'src/common/utils/parse-utils';
import styles from './PackDetailInfo.module.scss';

export interface IBuyButtonProps {
  availableSupply: number;
  packsNft?: string;
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
  price: string;
  collectionId: number;
}

const BuyButton: FC<IBuyButtonProps> = ({
  availableSupply,
  packsNft,
  onClick,
  price,
  collectionId,
}) => {
  if (availableSupply === 0) return null;
  if (packsNft) return null;

  return (
    <div>
      <div className={styles.actions}>
        <BuyOrSigninButton onClick={onClick} />
        <div className={styles['actions-price']}>
          <div className={styles['actions-price-header']}>Price:</div>
          <div className={styles['actions-price-value']}>
            ${renderPrice(price + '')}
          </div>
        </div>
      </div>
      <WarningHint collectionId={collectionId} />
    </div>
  );
};

export default BuyButton;
