import { PackCard } from '@components/pack/PackCard';
import { FC } from 'react';
import { IPack } from 'src/common/models/pack';
import styles from './UserPackList.module.scss';

export interface IUserPackListProps {
  packs: IPack[];
  onCardClick: (pack: IPack) => void;
  onPackAction: (pack: IPack) => void;
}

export const UserPackList: FC<IUserPackListProps> = ({
  packs,
  onPackAction,
  onCardClick,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {packs.map((item) => (
          <PackCard
            key={item.id}
            item={item}
            onCardClick={onCardClick}
            onButtonClick={onPackAction}
          />
        ))}
      </div>
    </div>
  );
};
