import Modal from '@components/modal';
import Button from '@components/shared/Button';
import { ExternalImage } from '@components/shared/ExternalImage';
import Link from 'next/link';
import { FC, useState } from 'react';
import { IPack } from 'src/common/models/pack';
import styles from './BuyPack.module.scss';
import btnStyles from '@components/shared/Button/Button.module.scss';
import Placeholder from '/public/assets/img/img-placeholder.svg';

export interface IBuyPackProps {
  pack: IPack;
  onCardBuy: (pack: IPack) => void;
  onCryptoBuy: (pack: IPack) => void;
}

export const BuyPack: FC<IBuyPackProps> = ({
  pack,
  onCardBuy,
  onCryptoBuy,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.media}>
        {pack.imageUrl ? (
          <ExternalImage
            className={styles.image}
            src={pack.imageUrl}
            alt={pack.name}
            objectFit='cover'
            attachPreview
          />
        ) : (
          <Placeholder className={styles.noImage} width='93' height='93' />
        )}
      </div>
      <div className={styles.title}>{pack.name}</div>
      <div className={styles.collection}>
        <div>NFT from</div>
        <Link href={`/collection/${pack.collection.id}`}>
          {pack.collection.name}
        </Link>
      </div>
      <Button
        className={btnStyles['btn-buyPack']}
        size={'s'}
        color={'blue'}
        fillStyle={false}
        fullWidth={false}
        onClick={() => onCardBuy(pack)}
      >
        Buy with card
      </Button>
      <Button
        className={btnStyles['btn-buyPack']}
        size={'s'}
        color={'blue'}
        fillStyle={false}
        fullWidth={false}
        onClick={() => onCryptoBuy(pack)}
      >
        Buy with crypto
      </Button>
      <div className={styles.description}>{pack.description}</div>
    </div>
  );
};
