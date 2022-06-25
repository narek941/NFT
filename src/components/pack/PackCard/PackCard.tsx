import { FC, SyntheticEvent } from 'react';
import styles from './PackCard.module.scss';
import Placeholder from '/public/assets/img/img-placeholder.svg';
import { ExternalImage } from '@components/shared/ExternalImage';
import { IPack } from 'src/common/models/pack';
import Link from 'next/link';
import Button from '@components/shared/Button';
import classNames from 'classnames';

export interface IPackCardProps {
  item: IPack | any;
  className?: string;
  onCardClick: (pack: IPack) => void;
  onButtonClick: (pack: IPack) => void;
}

export const PackCard: FC<IPackCardProps> = ({
  item,
  className,
  onCardClick,
  onButtonClick,
}: IPackCardProps) => {
  const PackCardClass: string = classNames(styles.wrapper, className);
  const priceValue = +item.price;
  const price = priceValue.toFixed(2);

  return (
    <div className={PackCardClass} onClick={() => onCardClick(item)}>
      <div className={styles.media}>
        {item.imageUrl ? (
          <ExternalImage
            className={styles.image}
            src={item.imageUrl}
            alt={item.description}
            objectFit='cover'
            height='325'
            width='277'
          />
        ) : (
          <Placeholder className={styles.icon} />
        )}
        {!item.id && (
          <Button
            className={styles.button}
            size={'s'}
            color={'blue'}
            onClick={(e) => {
              e.stopPropagation();
              onButtonClick(item);
            }}
          >
            {item.availableSupply === 0 ? 'See more' : 'Buy Now'}
          </Button>
        )}
      </div>
      <div className={styles.description}>
        <div className={styles.title}>{item.name}</div>
        {item.collection && (
          <div className={styles.collection}>
            <span>NFT from</span>{' '}
            <Link href={`/collection/${item.collection.id}`}>
              {item.collection.name}
            </Link>
          </div>
        )}
        {item.opened == false ? (
          <Button
            className={styles['btn-pack']}
            size={'s'}
            color='transparent'
            fillStyle
            onClick={(e) => {
              e.stopPropagation();
              onButtonClick(item);
            }}
          >
            Open Now
          </Button>
        ) : (
          <div className={styles.price}>
            {item.availableSupply ? `$${price}` : 'Sold Out'}
          </div>
        )}
      </div>
    </div>
  );
};
