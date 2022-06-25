import { FC } from 'react';
import { ICardMerge } from '@type/general';
import classNames from 'classnames';

import { ExternalImage } from '@components/shared/ExternalImage';
import Placeholder from '/public/assets/img/placeholder.svg';
import styles from './CardMerge.module.scss';

const CardMerge: FC<ICardMerge> = ({
  id,
  isActive,
  setActive,
  item,
  className,
}) => {
  const onCardClick = () => {
    setActive(id);
  };
  return (
    <div
      className={classNames([
        styles.card,
        className,
        isActive === item.id && styles.isActive,
      ])}
      onClick={onCardClick}
    >
      <div className={styles.media}>
        {item?.imageUrl ? (
          <ExternalImage
            width='140'
            height='140'
            src={item.imageUrl}
            alt={item.name}
          />
        ) : (
          <Placeholder
            className={styles['icon-placeholder']}
            width='140'
            height='140'
          />
        )}
      </div>
    </div>
  );
};

export default CardMerge;
