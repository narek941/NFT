import Button from '@components/shared/Button';
import React, { FC } from 'react';
import { IPacksSubScribe } from '@type/general';

import styles from './PacksSubscribe.module.scss';
import classNames from 'classnames';

import { ExternalImage } from '@components/shared/ExternalImage';

export const PackItemSubscribe: FC<IPacksSubScribe> = ({
  item,
  className,
  onCardClick,
  onButtonClick,
}) => {
  const cardClass: string = classNames(styles.card, className);

  const priceValue = +item.price;
  const price = priceValue.toFixed(2);

  return (
    <div className={cardClass} onClick={() => onCardClick(item)}>
      <div className={styles.header}>{item.name}</div>
      <div className={styles.media}>
        {item.imageUrl ? (
          <ExternalImage
            className={styles.image}
            src={item.imageUrl}
            alt={item.description}
            objectFit='contain'
            objectPosition='center center'
          />
        ) : (
          <div className={styles.placeholder}></div>
        )}
      </div>
      <div className={styles.price}>
        <span className={styles.value}>$ {price}</span>
      </div>
      <Button
        className={styles.button}
        size='s'
        color='blue'
        onClick={(e) => {
          e.stopPropagation();
          onButtonClick(item);
        }}
      >
        Buy now
      </Button>
      <div className={styles.body}>{item.description}</div>
    </div>
  );
};
