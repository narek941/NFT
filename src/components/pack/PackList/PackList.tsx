import { PackCard } from '@components/pack/PackCard';
import {
  AvailableButtonFilters,
  AvailableValues,
} from '@components/shared/AvailableButtonFilters';
import { FC, useEffect, useState } from 'react';
import { IPack } from 'src/common/models/pack';
import styles from './PackList.module.scss';

export interface IPackListProps {
  packs: IPack[];
  onCardClick: (pack: IPack) => void;
  onPackAction: (pack: IPack) => void;
}

export const PackList: FC<IPackListProps> = ({
  packs,
  onPackAction,
  onCardClick,
}) => {
  const [chosenPacks, setChosenPacks] = useState<IPack[]>(packs);

  useEffect(() => {
    setChosenPacks(packs);
  }, [packs]);

  const onFilterButtonClick = (value: AvailableValues) => {
    const newChosenPacks = packs.filter(filterPacks(value));
    setChosenPacks(newChosenPacks);
  };

  const isPackSold = (pack: IPack): boolean => pack.availableSupply === 0;

  const filterPacks = (value: AvailableValues) => (pack: IPack) => {
    if (value === AvailableValues.ALL) {
      return true;
    }
    const isSold = isPackSold(pack);
    return value === AvailableValues.SOLD_OUT ? isSold : !isSold;
  };

  return (
    <div className={styles.wrapper}>
      <AvailableButtonFilters onFilterButtonClick={onFilterButtonClick} />
      <div className={styles.list}>
        {chosenPacks.map((item) => (
          <PackCard
            key={item.id}
            item={item}
            onCardClick={onCardClick}
            onButtonClick={isPackSold(item) ? onCardClick : onPackAction}
          />
        ))}
      </div>
    </div>
  );
};
