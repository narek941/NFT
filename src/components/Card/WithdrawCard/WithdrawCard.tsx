import { FC } from 'react';
import { Card } from '@components/Card';

export const WithdrawCard: FC<{ item; onCardClick; isNFTEntity }> = ({
  item,
  onCardClick,
  isNFTEntity,
  ...props
}) => {
  return (
    <Card
      item={item}
      onClick={onCardClick}
      isNFTEntity={isNFTEntity}
      {...props}
    />
  );
};
