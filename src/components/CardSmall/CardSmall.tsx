import { FC } from 'react';
import styles from './CardSmall.module.scss';
import cn from 'classnames';
import { ExternalImage } from '@components/shared/ExternalImage';
import Placeholder from '/public/assets/img/placeholder.svg';

export interface ICardProps {
  item: ICardItem;
  onClick: (collection: ICardItem) => void;
  className?: string;
  isMedium?: boolean;
  imageHeight?: string;
  imageWidth?: string;
}

export interface ICardItem {
  id: number;
  name: string;
  price: string;
  imageUrl?: string;
  mediaUrl?: string;
  imageHeight?: string;
  imageWidth?: string;
}

export const CardSmall: FC<ICardProps> = ({
  item,
  onClick,
  isMedium,
  className,
  imageHeight,
  imageWidth,
}: ICardProps) => {
  return (
    <div
      className={cn([
        styles.card,
        isMedium && styles['card-medium'],
        className,
      ])}
      onClick={() => onClick(item)}
    >
      <div className={styles.contentWrapper}>
        <div className={styles['box-media']}>
          <div className={styles.media}>
            {item.imageUrl && (
              <ExternalImage
                className={styles.image}
                src={item.imageUrl}
                alt={item.name}
                height={imageHeight}
                width={imageWidth}
                responsive
              />
            )}
            {!item.imageUrl && (
              <Placeholder
                height={imageHeight}
                width={imageWidth}
                className={styles.image}
              />
            )}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{item.name}</div>
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.footer}>
        <div className={styles.coast}>#100</div>
        <div className={styles.coast}>{item.price}</div>
      </div>
    </div>
  );
};
