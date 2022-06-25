import React, { ComponentType } from 'react';
import styles from './WithdrawList.module.scss';
import { INFT } from '@type/nft';
import { WithdrawCard } from '@components/withdraw/WithdrawCard';

interface IWithdrawListProps {
  nftList?: INFT[];
  onWithdrawSelect: (nft: INFT) => void;
}

export const WithdrawList: ComponentType<IWithdrawListProps> = ({
  nftList,
  onWithdrawSelect,
}) => {
  return (
    <>
      <div className={styles.list}>
        {nftList?.map((nft) => (
          <WithdrawCard
            key={nft.id}
            nft={nft}
            onWithdrawSelect={onWithdrawSelect}
          />
        ))}
      </div>
    </>
  );
};
