import React, { FC, useEffect, useState } from 'react';
import { IPackItem } from '@type/general';

import styles from './PacksSubscribe.module.scss';
import classNames from 'classnames';
import { PackItemSubscribe } from '@components/PacksSubscribe/PackItemSubscribe';

export interface IPackListProps {
  className?: string;
  packs: IPackItem[];
  onCardClick: (pack: IPackItem) => void;
  onBuyPack: (pack: IPackItem) => void;
}

const PacksListSubScribe: FC<IPackListProps> = ({
  packs,
  onBuyPack,
  onCardClick,
  className,
}) => {
  const [chosenPacks, setChosenPacks] = useState<IPackItem[]>(packs);

  useEffect(() => {
    setChosenPacks(packs);
  }, [packs]);

  const cardClass: string = classNames(styles['card-list'], className);

  return (
    <div className={cardClass}>
      {chosenPacks.map((item) => {
        return (
          <PackItemSubscribe
            item={item}
            key={item.id}
            onCardClick={onCardClick}
            onButtonClick={onBuyPack}
          />
        );
      })}
    </div>
  );
};

export default PacksListSubScribe;
