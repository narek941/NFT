import React, { FC } from 'react';
import styles from './CollectionCard.styles.module.scss';
import cn from 'classnames';
import { ExternalImage } from '@components/shared/ExternalImage';
import Badge from '@shared/Badge';

export interface ICollectionCardProps {
  item: ICollectionCardItem;
  onClick: (collection: ICollectionCardItem) => void;
  isLarge?: boolean;
  className?: string;
  isOwned?: boolean;
  showLike?: boolean;
}

export interface ICollectionCardItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  dropDate: Date;
  generative: boolean;
  rarities: string[];
  redeemable?: boolean;
  redeemOptions?: any;
  distribution: string;
  auctionEndDate?: any;
  traits?: any;
  published: boolean;
  publishedAt: Date;
  smartContractAddress: string;
  status: string;
}

export const CollectionCard: FC<ICollectionCardProps> = ({
  item,
  onClick,
  isLarge,
  className,
}: ICollectionCardProps) => {
  const imageClasses = cn(styles.image, { [styles['image--large']]: isLarge });
  const noImage = '/assets/img/collection-placeholder.svg';
  const isImgSrc = item.imageUrl ? item.imageUrl : noImage;

  return (
    <div
      className={cn(
        styles.wrapper,
        className,
        isLarge && [styles['wrapper--large']]
      )}
    >
      <div className={styles.card} onClick={() => onClick(item)}>
        <div className={styles.body}>
          <div className={styles.media}>
            <ExternalImage
              className={imageClasses}
              src={isImgSrc}
              alt={item.description}
              objectFit='cover'
              objectPosition='center top'
            />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{item.name}</div>
            <div className={styles.distribution}>
              Distribution type:{' '}
              <span className={styles['distribution-value']}>Fixed price</span>
            </div>
            <div className={styles.badges}>
              {item.generative && (
                <Badge
                  uppercase
                  rounded
                  color='secondary'
                  size={isLarge ? 'l' : 's'}
                  className={styles.sBadge}
                >
                  Generative
                </Badge>
              )}
              {item.status && (
                <Badge
                  uppercase
                  rounded
                  color='secondary'
                  size={isLarge ? 'l' : 's'}
                  className={styles.sBadge}
                >
                  {item.status}
                </Badge>
              )}
              {item.status === 'available' && (
                <Badge
                  uppercase
                  rounded
                  color='secondary'
                  size={isLarge ? 'l' : 'm'}
                  className={styles.sBadge}
                >
                  Available
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
