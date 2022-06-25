import React, { FC } from 'react';

import styles from './BuySection.module.scss';
import { renderPrice } from 'src/common/utils/parse-utils';

export interface IPriceProps {
  price: string;
}

const Price: FC<IPriceProps> = ({ price }) => {
  return <div className={styles.price}>${renderPrice(price)}</div>;
};

export default Price;
