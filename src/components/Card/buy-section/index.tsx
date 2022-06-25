import React, { FC } from 'react';

import styles from './BuySection.module.scss';
import Price from './Price';
import BuyButton from './BuyButton';

export interface IBuySectionProps {
  price: string;
  availableSupply: boolean;
  openSeaLink?: string;
  distribution?: string;
}

const BuySection: FC<IBuySectionProps> = ({
  price,
  availableSupply,
  openSeaLink,
  distribution,
}) => {
  return (
    <div className={styles.footer}>
      <Price price={price} />
      <BuyButton
        availableSupply={availableSupply}
        openSeaLink={openSeaLink}
        distribution={distribution}
      />
    </div>
  );
};

export default BuySection;
