import React, { FC } from 'react';
import { useRouter } from 'next/router';

import OpenSeaIcon from 'public/other/open-sea-icon.svg';

import styles from './BuySection.module.scss';

export interface IBuyButtonProps {
  availableSupply: boolean;
  openSeaLink?: string;
  distribution?: string;
}

const BuyButton: FC<IBuyButtonProps> = ({
  availableSupply,
  openSeaLink,
  distribution,
}) => {
  const router = useRouter();

  if (!availableSupply) return null;

  if (openSeaLink && router.pathname === '/collection/[id]') {
    return (
      <a
        className={styles.buy}
        href={openSeaLink}
        onClick={(e) => e.stopPropagation()}
        rel='noopener noreferrer'
        target='_blank'
      >
        <OpenSeaIcon className={styles.icon} />
        {distribution === 'PACKS' ? 'Buy in Packs' : 'Buy now'}
      </a>
    );
  }

  return (
    <div className={styles.buy}>
      {distribution === 'PACKS' ? 'Buy in Packs' : 'Buy now'}
    </div>
  );
};

export default BuyButton;
