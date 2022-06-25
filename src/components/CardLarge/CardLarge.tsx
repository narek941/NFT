import Badge from '@components/shared/Badge';
import React, { FC } from 'react';
import { ExternalImage } from '@components/shared/ExternalImage';
import Placeholder from '../../../public/assets/img/img-placeholder.svg';

import styles from './CardLarge.module.scss';

import BlockButton from '@components/shared/BlockButton';
import Button from '@components/shared/Button';
import classNames from 'classnames';
import Sticker from '@components/shared/Sticker/Sticker';

export interface ICardItem {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  mediaUrl?: string;
}

export interface ICardProps {
  item: ICardItem;
  onClickCard: () => void;
  className?: string;
}

const CardLarge: FC<ICardProps> = ({
  item,
  className,
  onClickCard,
}: ICardProps) => {
  const cardClass: string = classNames(styles.card, className);
  const picUrl = item.imageUrl || item.mediaUrl;

  return (
    <div className={cardClass}>
      <div className={styles.media}>
        <Sticker className={styles.sticker}>💎 Advanced 💎</Sticker>
        {picUrl ? (
          <ExternalImage
            className={styles.image}
            src={picUrl}
            alt={item.name}
            responsive
            height='293'
            width='293'
          />
        ) : (
          <Placeholder className={styles.image} />
        )}
      </div>
      <div className={styles.title}>{item.name}</div>

      <div className={styles.badges}>
        <Badge
          uppercase
          rounded
          color='secondary'
          size='m'
          className={styles.sBadge}
        >
          Legendary
        </Badge>

        <Badge
          uppercase
          rounded
          color='light'
          size='m'
          className={styles.sBadge}
        >
          Experience
        </Badge>

        <Badge
          uppercase
          rounded
          color='dark'
          size='m'
          className={styles.sBadge}
        >
          Mergeable
        </Badge>
      </div>
      <BlockButton>
        <Button
          onClick={onClickCard}
          className={styles.button}
          size='l'
          color='blue'
        >
          Go to NFT
        </Button>
      </BlockButton>
    </div>
  );
};

export default CardLarge;
